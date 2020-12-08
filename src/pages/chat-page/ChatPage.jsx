import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createChat } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";
import {
  getMyChats,
  getChatMessages,
  createMessage,
} from "../../utils/apiRequests";
import ScrollToBottom from "react-scroll-to-bottom";
import "./ChatPage-Style.css";
import socketIOClient from "socket.io-client";
import Contact from "../../components/chat-components/Contact";
import Message from "../../components/chat-components/Message";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const HOST = process.env.REACT_APP_STAGING_HOST;
const socket = socketIOClient(HOST);
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const { state, action } = useStateMachine(updateAction);
  const [messages, setMessages] = useState([]);
  const [chatExists, setChatExists] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [interactionId, setInteractionId] = useState("");
  const [typing, setTyping] = useState("escribiendo");
  const [currentChat, setCurrentChat] = useState({});
  const { register, handleSubmit, reset } = useForm({});
  const submit = (data) => {
    if (!data.message_input) return null;
    if (chatExists) {
      createMessage(data.message_input, currentChat._id).then((res) => {
        socket.emit("chat_message", currentChat._id, res.data.data.message);
      });
    } else {
      createChat(data.message_input, interactionId).then((res) => {
        console.log(res);
        console.log(interactionId);
        if (res.data !== undefined && res.data.status === "success") {
          setCurrentChat(res.data.data.chat);
          socket.emit(
            "chat_message",
            res.data.data.chat.id,
            res.data.data.lastMessage
          );
        }
      });
    }
    data.message_input = reset();
  };

  const emmitTyping = () => {
    socket.emit("chat_typing", currentChat._id);
    console.log(currentChat);
  };

  const showTyping = () => {
    setIsTyping(true);
    const dot = ".";
    setTimeout(() => {
      setTyping(typing.concat(dot));
      setTimeout(() => {
        setTyping(typing.concat(dot).concat(dot));
        setTimeout(() => {
          setTyping(typing.concat(dot).concat(dot).concat(dot));
          setTimeout(() => {
            setIsTyping(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const redirectToOrg = () => {
    window.open(`/organizations/${currentChat?.user?.organization?._id}`, "_blank")
  }

  const redirectToUser = () => {
    window.open(`/users/${currentChat?.user?.id}`, "_blank")
  }

  useEffect(() => {
    getMyChats().then((res) => {
      console.log(res)
      let myChats = res.data.data.chats;
      if (state.userInformation.chatPivot) {
        const found = myChats.find(
          (chat) => chat.user.id === state.userInformation.chatPivot.userInfo.id
        );
        if (found) {
          setChatExists(true);
          setCurrentChat(found);
          getChatMessages(found._id).then((res) => {
            setMessages(res.data.data.chat.messages);
          });
        } else {
          setInteractionId(state.userInformation.chatPivot.interactionId);
          const chatPreview = {
            user: state.userInformation.chatPivot.userInfo,
          };
          myChats.push(chatPreview);
        }
        action({ chatPivot: undefined });
      }
      setChats(myChats);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("chat_message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("chat_typing", () => {
      showTyping();
    });

    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   socket.on("is_online", (data) => {
  //     setMessages([...messages, data]);
  //   });
  // }, [submit]);

  useEffect(() => {
    if (currentChat._id) {
      getChatMessages(currentChat._id).then((res) => {
        let messages = res.data.data.chat.messages;
        socket.emit("join_chat", currentChat._id);
        setMessages(messages);
      });
    }
  }, [currentChat]);

  return (
    <div className="chatpage">
      <Header />
      <Banner image={"qSOKi8h.png"} />
      <div className="chatpage__inner">
        <div className="chat__box">
          <div className="chat__boxleft">
            <div className="chat__boxleftheader">
              <span className="chat__header">Contactos</span>
              <i className="fa fa-pencil-square-o chat__headericon tooltip">
                <span className="tooltiptext">
                  Para iniciar un nuevo chat debes hacerlo mediante un Match a
                  través de la página de Resumen
                </span>
              </i>
            </div>
            <SimpleBar>
              <div className="chat__contactcontainer">
                {chats.map((chat) =>
                  chat ? (
                    <Contact
                      isCurrentChat={chat._id === currentChat._id}
                      onClick={() => {
                        setChatExists(true);
                        setCurrentChat(chat);
                      }}
                      key={chat._id}
                      responseInfo={chat}
                    ></Contact>
                  ) : null
                )}
              </div>
            </SimpleBar>
          </div>
          <div className="chat__boxright">
            <div className="chat__boxrightheader" onClick={redirectToUser}>
              <div className="chat__userwrapper">
                <span className="chat__headertext">
                  {currentChat?.user?.name}
                </span>
                <span className="chat__headertext">
                  {currentChat?.user?.lastname}
                </span>
              </div>
              {currentChat?.user?.organization &&
                currentChat?.user?.organization !== "undefined" ? (
                  <span className="chat__headerlighttext">
                    Miembro de <span onClick={redirectToOrg} className="chat__link">{currentChat?.user?.organization?.name}</span>
                  </span>
                ) : (
                  ""
                )}
            </div>
            <ScrollToBottom mode="bottom" className="chat__messagecontainer">
              <ul className="chat__messagecontainer">
                {messages?.map((el) => (
                  <Message
                    message={el.message}
                    createdAt={el.createdAt}
                    isMyMessage={
                      el.sender === state.userInformation._id ? true : false
                    }
                  ></Message>
                ))}
                {isTyping ? (
                  <span className="chat__typing">{typing}</span>
                ) : undefined}
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
                    onChange={emmitTyping}
                  />
                  <button className="chat__button">
                    <i className="fa fa-paper-plane"></i>
                  </button>
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
