import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createChat } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";
import { getMyChats } from "../../utils/apiRequests";


// import { getTesting } from "../utils/apiRequests";

import "./ChatPage-Style.css";

import socketIOClient from "socket.io-client";
import interactionContext from "../../utils/interactionContext";
import Contact from "../../components/chat-components/Contact";
const HOST = "http://127.0.0.1:3000";
const socket = socketIOClient(HOST);

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const { state } = useStateMachine(updateAction);
  const [messages, setMessages] = useState([]);
  // const [username, setUsername] = useState([]);
  const { register, handleSubmit, watch, reset } = useForm({});

  // prompt("Hola nene");

  const submit = (data) => {
    createChat(message.current, state.userInformation.interactionId).then(
      (res) => {
        if (res.data !== undefined) {
          console.log(res);
          if (res.data.status === "success") {
            socket.emit("join_chat", res.data.data.chat.id);
            socket.emit("chat_message", res.data.data.chat.id, message.current);
          }
        }
      }
    );
    // console.log(data);
    // socket.emit("chat_message", message.current);
    // console.log("Message: ", message);
    // console.log("Messagesssss:", messages);
    // getTesting().then((res) => {
    //   console.log(res);
    // });
    // message.current = reset();
  };

  // useEffect(() => {
  //   const username = prompt("Ingrese su nombre de usuario: ");
  //   socket.emit("username", username);
  //   // setUsername(username);
  // }, []);

  useEffect(() => {
    socket.on("chat_message", (data) => {
      console.log("New message: ", data);
      setMessages([...messages, data]);
    });
  }, [submit]);

  // useEffect(() => {
  //   console.log("Joining to chat. Room Id: ", state.userInformation.email);
  //   socket.emit("join_chat", state.userInformation.email);
  // }, []);

  useEffect(() => {
    socket.on("is_online", (data) => {
      setMessages([...messages, data]);
    });
  }, [submit]);

  useEffect(() => {
    getMyChats().then((res) => {
      setChats(res.data.data.chats)
      console.log(res);
    });
  }, []);

  //   const addItem = () => {
  //     setMessages([...messages, "Hola Jay"]);
  //   };

  const message = useRef({});
  message.current = watch("message_input", "");

  //   const submit = (data) => {
  //     socket.emit("testEvent", message.current);
  //     console.log(message);
  //     // message.current = reset();
  //   };

  return (
    <div className="chatpage">
      <Header />
      <Banner image={"qSOKi8h.png"} />
      <div className="chatpage__inner">
        {/* <h1>CHAT</h1> */}
        <div className="chat__box">
          <div className="chat__boxleft">
            {chats.map((response) =>
              response ? (
                <Contact
                  key={response._id}
                  responseInfo={response}
                ></Contact>
              ) : null
            )}
          </div>
          <div className="chat__boxright">
            <ul className="chat__messagecontainer">
              {messages.map((el) => (
                <li className="chat__message">{el}<span className="message__time">6:17 p.m.</span></li>
              ))}
            </ul>
            <div className="chat__barcontainer">
              <form
                className="chat__form"
                action={HOST}
                method="POST"
                id="chatForm"
                onSubmit={handleSubmit(submit)}
              >
                <div className="chat__barbutton">
                  <input
                    className="chat__bar"
                    name="message_input"
                    autocomplete="off"
                    ref={register}
                    autofocus="on"
                    placeholder="type your message here..."
                  />
                  <button className="chat__button"><i className="fa fa-paper-plane"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ChatPage;
