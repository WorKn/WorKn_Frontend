import React from 'react';
import "./Contact-Style.css";

const Contact = ({ responseInfo }) => {
    return (
        <div className="contact__container contact__container--selected">
            <img className="contact__profilepic" src={responseInfo.user?.profilePicture} alt="" />
            <div className="contact__info">
                <span>{responseInfo.user?.name} {responseInfo.user?.lastname}</span>
                <span className="contact__status--online">En Línea</span>
            </div>
            {/* <h1>{responseInfo.lastMessage.message}</h1> */}
        </div>
    );
}

export default Contact;
