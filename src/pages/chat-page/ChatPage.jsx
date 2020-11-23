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
import "./ChatPage-Style.css";
import socketIOClient from "socket.io-client";
import Contact from "../../components/chat-components/Contact";
import Message from "../../components/chat-components/Message";

const HOST = "http://127.0.0.1:3000";
const socket = socketIOClient(HOST);
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatExists, setChatExists] = useState(false);
  const [currentChat, setCurrentChat] = useState({});
  const [chatUpdateFlag, setChatUpdateFlag] = useState(false);
  const { state } = useStateMachine(updateAction);
  const { register, handleSubmit, reset } = useForm({});
  const submit = (data) => {
    setChatUpdateFlag(!chatUpdateFlag);
    if (chatExists) {
      createMessage(data.message_input, currentChat._id).then((res) => {
        socket.emit("join_chat", currentChat._id);
        socket.emit("chat_message", currentChat._id, res.data.data.message);
        data.message_input = reset();
      });
    } else {
      createChat(data.message_input, state.userInformation.chatPivot.interactionId).then(
        (res) => {
          if (res.data !== undefined) {
            if (res.data.status === "success") {
              socket.emit("join_chat", res.data.data.chat.id);
              socket.emit("chat_message", res.data.data.chat.id, res.data.data.lastMessage);
              data.message_input = reset();
              setCurrentChat(res.data.data.chat);
            }
          }
        }
      );
    }
  };

  useEffect(() => {
    getMyChats().then((res) => {
      let myChats = res.data.data.chats;
      console.log(res);
      const found = myChats.find(chat => chat.user.id == state.userInformation.chatPivot.userInfo.id);
      if (found) {
        setChatExists(true);
        setCurrentChat(found);
        getChatMessages(found._id).then((res) => {
          socket.emit("join_chat", found._id);
          setMessages(res.data?.data.chat?.messages)
        });
      } else {
        const chatPreview = {
          user: state.userInformation.chatPivot.userInfo
        }
        myChats.push(chatPreview);
      }
      console.log(myChats);
      setChats(myChats);
    });
  }, []);

  useEffect(() => {
    socket.on("chat_message", (data) => {
      console.log("New message");
      setMessages([...messages, data]);
    });
  }, [chatUpdateFlag]);

  useEffect(() => {
    getChatMessages(currentChat._id).then((res) => {
      socket.emit("join_chat", currentChat._id);
      setMessages(res.data?.data.chat?.messages)
    });
  }, [currentChat]);

  useEffect(() => {
    socket.on("is_online", (data) => {
      setMessages([...messages, data]);
    });
  }, [submit]);

  return (
    <div className="chatpage">
      <Header />
      <Banner image={"qSOKi8h.png"} />
      <div className="chatpage__inner">
        <div className="chat__box">
          <div className="chat__boxleft">
            {chats.map((chat) =>
              chat ? (
                <Contact
                  isCurrentChat={chat._id === currentChat._id}
                  onClick={() => {
                    console.log("Clicked Chat " + chat._id);
                    setCurrentChat(chat);
                    console.log(chat);
                  }}
                  key={chat._id}
                  responseInfo={chat}
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
    </div >
  );
};
export default ChatPage;
