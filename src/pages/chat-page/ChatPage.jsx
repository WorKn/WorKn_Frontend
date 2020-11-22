import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createChat } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";
import { getMyChats, getChatMessages, createMessage } from "../../utils/apiRequests";


// import { getTesting } from "../utils/apiRequests";

import "./ChatPage-Style.css";

import socketIOClient from "socket.io-client";
import interactionContext from "../../utils/interactionContext";
import Contact from "../../components/chat-components/Contact";
import Message from "../../components/chat-components/Message";
const HOST = "http://127.0.0.1:3000";
const socket = socketIOClient(HOST);

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const { state } = useStateMachine(updateAction);
  const [messages, setMessages] = useState([]);
  const [chatExists, setChatExists] = useState(false);
  const [currentChat, setCurrentChat] = useState({});
  const [chatUpdateFlag, setChatUpdateFlag] = useState(false);
  // const [username, setUsername] = useState([]);
  const { register, handleSubmit, watch, reset } = useForm({});
  // prompt("Hola nene");
  const submit = (data) => {
    setChatUpdateFlag(!chatUpdateFlag);
    if (chatExists) {
      createMessage(data.message_input, currentChat._id).then((res) => {
        socket.emit("join_chat", currentChat._id);
        socket.emit("chat_message", currentChat._id, res.data.data.message);
        // console.log(res);
        data.message_input = reset();
      });
      // socket.emit("chat_message", res.data.data.chat.id, res.data.data.lastMessage);
    } else {
      createChat(data.message_input, state.userInformation.chatPivot.interactionId).then(
        (res) => {
          if (res.data !== undefined) {
            // console.log(res);
            if (res.data.status === "success") {
              socket.emit("join_chat", res.data.data.chat.id);
              socket.emit("chat_message", res.data.data.chat.id, res.data.data.lastMessage);
              data.message_input = reset();
            }
          }
        }
      );
    }
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
      console.log("New message");
      setMessages([...messages, data]);
    });
  }, [chatUpdateFlag]);

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
      let myChats = res.data.data.chats;
      // console.log(chats);
      const found = myChats.find(chat => chat.user.id == state.userInformation.chatPivot.userInfo.id);
      if (found) {
        setChatExists(true);
        setCurrentChat(found);
        // console.log(found);
        getChatMessages(found._id).then((res) => {
          socket.emit("join_chat", found._id);
          // console.log(res);
          // console.log(res.data.data.chat.messages);
          setMessages(res.data?.data.chat?.messages)
          // action(res.data.c)
        });
      } else {
        const chatPreview = {
          user: state.userInformation.chatPivot.userInfo
        }
        myChats.push(chatPreview);
        // createChat(message.current, state.userInformation.chatPivot.interactionId).then(
        //   (res) => {
        //     if (res.data !== undefined) {

        //     }
        //   }
        // );
      }
      // console.log(myChats);
      setChats(myChats);
    });
  }, []);

  //   const addItem = () => {
  //     setMessages([...messages, "Hola Jay"]);
  //   };

  // const message = useRef({});
  // message.current = watch("message_input", "");

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
              {messages?.map((el) => (
                <Message message={el.message} createdAt={el.createdAt} isMyMessage={el.sender === state.userInformation._id ? true : false} ></Message>
              ))}
            </ul>

            <div className="chat__barcontainer">
              <form
                className="chat__form"
                action={HOST}
                method="POST"
                id="chatForm"
                name="chatForm"
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
