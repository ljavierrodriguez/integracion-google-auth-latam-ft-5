import os
import datetime
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask_cors import CORS
from dotenv import load_dotenv
from google.oauth2 import id_token
from google.auth.transport import requests

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

jwt = JWTManager(app)
CORS(app)

CLIENT_ID = os.getenv('GOOGLE_ID')

@app.route('/')
def main():
    return jsonify({ "message": "API Running Successfully"}), 200

@app.route('/api/auth/google', methods=['POST'])
def google_login():
    
    token = request.json.get('token')

    try:
        info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        user_id = info["sub"]
        name = info["name"]
        email = info["email"]
        avatar = info["picture"]

        expires = datetime.timedelta(hours=1)
        access_token = create_access_token(identity=email, expires_delta=expires)

        return jsonify({
            "access_token": access_token,
            "user_id": user_id,
            "name": name,
            "email": email,
            "avatar": avatar
        }), 200

    except Exception as e:
        return jsonify({ "error": str(e) }), 400

@app.route('/api/auth/login', methods=['POST'])
def users_login():
    pass

if __name__ == '__main__':
    app.run()