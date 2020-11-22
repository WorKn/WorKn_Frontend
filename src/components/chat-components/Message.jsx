import React from 'react'

const Message = ({ message, createdAt, isMyMessage }) => {
    return (
        <li className={`chat__message ${isMyMessage ? "chat__message--me" : ""}`}>{message}<span className="message__time">{createdAt?.slice(11, 16)}</span></li>
    );
}

export default Message
