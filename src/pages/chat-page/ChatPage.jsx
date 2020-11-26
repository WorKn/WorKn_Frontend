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
import ScrollToBottom from "react-scroll-to-bottom";
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
  const { register, handleSubmit, watch, reset } = useForm({});
  const submit = (data) => {
    console.log(data.message_input);
    console.log("data: " + data[1]);
    if (chatExists) {
      createMessage(data.message_input, currentChat._id).then((res) => {
        socket.emit("join_chat", currentChat._id); //borrar
        socket.emit("chat_message", currentChat._id, res.data.data.message);
        console.log(res);
      });
    } else {
      createChat(data.message_input, state.userInformation.chatPivot.interactionId).then(
        (res) => {
          if (res.data !== undefined && res.data.status === "success") {
            console.log(res);
            setCurrentChat(res.data.data.chat);
            socket.emit("join_chat", res.data.data.chat.id); // borrar
            socket.emit("chat_message", res.data.data.chat.id, res.data.data.lastMessage);
          }
        }
      );
    }
    data.message_input = reset();
  };

  useEffect(() => {
    getMyChats().then((res) => {
      let myChats = res.data.data.chats;
      const found = myChats.find(chat => chat.user.id == state.userInformation.chatPivot.userInfo.id);
      if (found) {
        setChatExists(true);
        setCurrentChat(found);
        console.log(found);
        getChatMessages(found._id).then((res) => {
          socket.emit("join_chat", found._id); //borrar
          console.log(res);
          console.log(res.data.data.chat.messages);
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
      console.log("New message: ");
      setMessages([...messages, data]);
    });
  }, [messages]); //Review update flag


  // useEffect(() => {
  //   socket.on("is_online", (data) => {
  //     setMessages([...messages, data]);
  //   });
  // }, [submit]);

  useEffect(() => {
    if (currentChat._id) {
      getChatMessages(currentChat._id).then((res) => {
        console.log(res)
        let temporary = res.data.data.chat.messages;
        socket.emit("join_chat", currentChat._id);
        setMessages(temporary)
        console.log(res)
      });
    }
  }, [currentChat]);

  return (
    <div className="chatpage">
      <Header />
      <Banner image={"qSOKi8h.png"} />
      <div className="chatpage__inner">
        {/* <h1>CHAT</h1> */}
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
            <ScrollToBottom mode="bottom" className="chat__messagecontainer">
              <ul className="chat__messagecontainer">
                {messages?.map((el) => (
                  <Message message={el.message} createdAt={el.createdAt} isMyMessage={el.sender === state.userInformation._id ? true : false} ></Message>
                ))}
              </ul>
            </ScrollToBottom>
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
