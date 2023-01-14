import React, {useState} from "react";
import MessagesBox from "./components/MessagesBox";
import NewMessage from "./components/NewMessage/NewMessage";
import UsersList from "./components/UsersList";
import styles from './Chat.module.scss'
const Chat = ({socket}) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])
    console.log(users)
    socket.on('users-list', (users) => {
        setUsers(users)
    })

    socket.on("user-connected", (user) => {
        console.log(user)
        const exist = users.find(u => u.userId === user.userId)
        if (!exist) {
            const list = users;
            list.push(user)
            setUsers(list)
        }
    })
    return (
        <div className={styles.container}>
            <UsersList socket={socket} users={users} setSelectedUser={setSelectedUser}/>
            {selectedUser && 
                <div className={styles.messages}>
                    <MessagesBox socket={socket} selectedUser={selectedUser} />
                    <NewMessage socket={socket} selectedUser={selectedUser} />
                </div> 
            }
            
       </div>
    )
}
export default Chat