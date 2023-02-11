import { useState } from "react"
import {Link} from "react-router-dom"
import styles from './Login.module.scss'

const Login = ({socket}) => {
    const [data, setData] = useState({
        username: '',
        password: '',
        roomname: ''
    })

      const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setData(prevState => ({...prevState, [name]: value}))
      }

      const onClickHandler = () => {
        const {username, password, roomname} = data
        socket.emit('join', {username, password, roomname})
      }
        
    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h1>Welcome to the chat!</h1>
                <div className={styles.inputContainer}>
                    <div className={styles.label}>Username</div>
                    <input name="username" placeholder="username" value={data.username} onChange={onChangeHandler}/>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.label}>Password</div>
                    <input name="password" type="password" placeholder="password" value={data.password} onChange={onChangeHandler}/>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.label}>Room Name</div>
                    <input name="roomname" placeholder="Type roomname" value={data.roomname} onChange={onChangeHandler}/>
                </div>
                <Link to={`/chat/${data.roomname}/${data.username}`}>
                    <button onClick={onClickHandler}>Enter</button>
                </Link>
            </div>
        </div>
    )
}

export default Login