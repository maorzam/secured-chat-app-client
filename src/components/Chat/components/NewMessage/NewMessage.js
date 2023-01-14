import React, {useState} from "react";
import styles from './NewMessage.module.scss'
const NewMessage = ({socket, selectedUser}) => {
    const [value, setValue] = useState('');

    const onSend = (e) => {
      e.preventDefault();
      socket.emit('message', {content: value, to: selectedUser.userId});
      setValue('');
    };

    return (
    <div className={styles.container}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <button onClick={onSend}>Send</button>
    </div>
    )
}

export default NewMessage