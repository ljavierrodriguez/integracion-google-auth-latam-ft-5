import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router'

const GoogleLoginButton = () => {
    
    const navigate = useNavigate()

    const GOOGLE_ID = import.meta.env.VITE_GOOGLE_ID

    const handleSuccess = async(responseGoogle) => {
        console.log(responseGoogle)
        try {

            const response = await fetch('http://127.0.0.1:5000/api/auth/google', {
                method: 'POST',
                body: JSON.stringify({ token: responseGoogle.credential }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            console.log(data)

            if(data.access_token){
                sessionStorage.setItem('current_user', JSON.stringify(data))    
                navigate('/dashboard')
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <GoogleOAuthProvider clientId={GOOGLE_ID}>
            <GoogleLogin onSuccess={handleSuccess} />
        </GoogleOAuthProvider>
    )
}

export default GoogleLoginButton