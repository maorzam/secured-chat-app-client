
import React, { useState, useEffect, useRef } from "react";
import { encryptData, decryptData } from "./utils.js";
import { useParams } from "react-router-dom";
import moment from "moment"
import styles from './Chat.module.scss'

const Chat = ({ socket }) => {
    const {username, roomname} = useParams()
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
            const decryptedMessage = decryptData(data.text, data.username);
            let temp = messages;
            temp.push({
                timestamp: data.timestamp,
                userId: data.userId,
                username: data.username,
                text: decryptedMessage,
            });
            setMessages([...temp]);
        });
    }, [socket, messages])

  const sendData = () => {
    if (text.length > 0) {
      const encryptedMessage = encryptData(text);
      socket.emit("chat", encryptedMessage);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.username}>
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
        </h2>
      </div>
      <div className={styles.messages}>
        {messages.map((message) => (
            <div className={`${styles.message} ${message.username === username && styles.right}`}>
                {(message.text.startsWith('Welcome') || message.text.startsWith(username) || message.text.startsWith(message.username)) ? (
                    <div className={styles.center}>{message.text}</div>
                ) : (
                    <>
                        <b>{message.username} : </b>
                        <div>{message.text}</div>
                        <div className={styles.date}>{moment(message.timestamp).format('LT')}</div>
                    </>
                )}
            </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.sendMessage}>
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
