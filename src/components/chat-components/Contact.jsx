import React, { useEffect, useState } from 'react';
import "./Contact-Style.css";

const Contact = ({ responseInfo }) => {
    return (
        <div className="contact__container contact__container--selected">
            <img className="contact__profilepic" src="https://i.imgur.com/JCXGx2c.png" alt="" />
            <div>
                <span>WorKn Frontend</span>
                <span className="contact__status--online">En Línea</span>
            </div>
            {/* <h1>{responseInfo.lastMessage.message}</h1> */}
        </div>
    );
}

export default Contact;
