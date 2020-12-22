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
  closeChat
} from "../../utils/apiRequests";
import ScrollToBottom from "react-scroll-to-bottom";
import "./ChatPage-Style.css";
import socketIOClient from "socket.io-client";
import Contact from "../../components/chat-components/Contact";
import Message from "../../components/chat-components/Message";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { getMe } from "../../utils/apiRequests";
import { store } from "react-notifications-component";

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
        console.log(res)
        if (res.data !== undefined && res.data.status === "success") {
          socket.emit("chat_message", currentChat._id, res.data.data.message);
        } else {
          store.addNotification({
            title: "Ha ocurrido un error",
            message: "Este chat ya no existe, por favor revise desde su pantalla de resumen.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 10000,
              onScreen: true,
            },
          });
        }
      });
    } else {
      createChat(data.message_input, interactionId).then((res) => {
        console.log(res)
        if (res.data !== undefined && res.data.status === "success") {
          setCurrentChat(res.data.data.chat);
          socket.emit(
            "chat_message",
            res.data.data.chat.id,
            res.data.data.lastMessage
          );
        } else {
          store.addNotification({
            title: "Ha ocurrido un error",
            message: "Esta oferta ha sido eliminida. Por favor revise desde su pestaña de resumen.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 10000,
              onScreen: true,
            },
          });
        }
      });
    }
    data.message_input = reset();
  };

  const emmitTyping = () => {
    socket.emit("chat_typing", currentChat._id);
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

  const triggerChatClose = () => {
    closeChat(currentChat._id).then((res) => {
    });
  }

  useEffect(() => {
    getMyChats().then((res) => {
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

  useEffect(() => {
    getMe().then((res) => {
      if (res.data !== undefined) {
        action(res.data.data.data);
      }
    });
  }, [action]);

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
            <div className="chat__boxrightheader" >
              <div className="chat__userwrapper">
                <span className="chat__headertext" onClick={redirectToUser}>
                  {currentChat?.user?.name}{' '}
                  {currentChat?.user?.lastname}
                </span>
                {currentChat?.user?.organization &&
                  currentChat?.user?.organization !== "undefined" ? (
                    <span className="chat__headerlighttext">
                      Miembro de <span onClick={redirectToOrg} className="chat__link">{currentChat?.user?.organization?.name}</span>
                    </span>
                  ) : (
                    ""
                  )}
              </div>
              {typeof currentChat._id && currentChat._id !== undefined ? (
                <div className="chat__usercontrol">
                  <i className="fa fa-cog config__dropdown">
                    <div className="chat__dropdowncontent">
                      <a href="https://www.google.com/" className="chat__action">
                        Ir al perfil del usuario
                        <i className="fa fa-user"></i>
                      </a>
                      <span href="https://www.google.com/" className="chat__action" onClick={triggerChatClose}>
                        Terminar chat
                        <i className="fa fa-trash-o"></i>
                      </span>
                    </div>
                  </i>
                </div>
              ) : (
                  null
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
