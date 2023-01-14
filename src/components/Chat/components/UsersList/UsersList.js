import React, { useState } from "react";
import styles from "./UsersList.module.scss"
const UsersList = ({ socket, users, setSelectedUser }) => {
    const userName = socket.auth.username
    console.log({userName})
    

    return (
        <div className={styles.container}>
            <div>{`Hello ${userName}`}</div>
            <div className={styles.title}>Active users:</div>
            {users && users.filter(user => user.username !== userName).map((user, index) => (
                <div key={index} className={styles.userBox} onClick={() => setSelectedUser(user)}>
                    {user.username}
                    <span className={styles.online}></span>
                </div>
            ))}
        </div>
    )
}

export default UsersList;