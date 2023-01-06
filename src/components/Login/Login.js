import { useEffect } from "react"
const Login = ({socket}) => {
      useEffect(() => {
        socket.on('users-list', (users) => {
            console.log(users)
          })
      }, [])
        
    return (
        <div>
            <div>Welcome! </div>
            <input placeholder="username"/>
            <input placeholder="password"/>
        </div>
    )
}

export default Login