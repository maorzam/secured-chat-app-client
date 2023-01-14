import React, { useEffect, useState } from "react";

const MessagesBox = ({ socket, selectedUser }) => {
    console.log({id: socket.id})
    console.log(selectedUser)
    const [messages, setMessages] = useState([])
    console.log(messages)
    socket.on("message", (res) => {
        const newList = messages
        messages.push(res)
        setMessages(newList)
    })

    useEffect(() => {
        const list = selectedUser.messages.filter(message => message.receiver === socket.id || message.sender === socket.id)
        setMessages(list)
    }, [])
    return (
        messages.length ? messages.map(message => (
            <div>{message.content}</div>
        )) : <div></div>
    )
}

export default MessagesBox;