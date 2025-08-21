import React from 'react'

const Dashboard = () => {

    const current_user = JSON.parse(sessionStorage.getItem('current_user'))


  return (
    <div>
        <p>Bienvenido, { current_user.name ?? "anonimous" }</p>
        <img src={ current_user.avatar ?? "https://picsum.photos/id/345/100/100"} alt="" width={100} height={100} />
    </div>
  )
}

export default Dashboard