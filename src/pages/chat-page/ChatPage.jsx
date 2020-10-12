import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createChat } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

// import { getTesting } from "../utils/apiRequests";

import "./ChatPage-Style.css";

import socketIOClient from "socket.io-client";
import interactionContext from "../../utils/interactionContext";
const HOST = "http://127.0.0.1:3000";
const socket = socketIOClient(HOST);

const ChatPage = () => {
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
        }
      }
    );
    socket.emit("chat_message", message.current);
    console.log("Message: ", message);
    console.log("Messagesssss:", messages);
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
      setMessages([...messages, data]);
    });
  }, [submit]);

  useEffect(() => {
    socket.on("is_online", (data) => {
      setMessages([...messages, data]);
    });
  }, [submit]);

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
    <div className="main-div">
      <h1>CHAT</h1>
      {messages.map((el) => (
        <span>{el}</span>
      ))}
      <form
        action={HOST}
        method="POST"
        id="chatForm"
        onSubmit={handleSubmit(submit)}
      >
        <input
          name="message_input"
          autocomplete="off"
          ref={register}
          autofocus="on"
          placeholder="type your message here..."
        />
        <button>Send</button>
      </form>
    </div>
  );
};
export default ChatPage;
