import { useState } from "react"
import io from 'socket.io-client';

import styles from './Login.module.scss'
const Login = ({setSocket}) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

      const onChangeHandler = (e) => {
          const {name, value} = e.target;
          if (name === 'username') {
              setUserName(value)
          }
          if (name === 'password') {
            setPassword(value)
        }
      }

      const onClickHandler = () => {
        const newSocket = io(`http://${window.location.hostname}:5000`, {
            auth: {
                username,
                password
            }
        });
        setSocket(newSocket);
        return () => newSocket.close();
      }
        
    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h1>Welcome to the chat!</h1>
                <div className={styles.inputContainer}>
                    <div className={styles.label}>Username</div>
                    <input name="username" placeholder="username" value={username} onChange={onChangeHandler}/>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.label}>Password</div>
                    <input name="password" type="password" placeholder="password" value={password} onChange={onChangeHandler}/>
                </div>
                <button onClick={onClickHandler}>Enter</button>
            </div>
        </div>
    )
}

export default Login