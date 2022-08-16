import React, { useContext, useEffect, useRef } from "react";
import Conversation from "../Conversation/Conversation";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import NavBar from "../../NavBar/NavBar";
import AuthContext from "../../context/AuthProvider";
import "./Messenger.css";
import axios from "../../../api/axios";
import { useState } from "react";
import { io } from "socket.io-client";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function Messenger() {
  const { userId } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useLocalStorage("messages", []);
  const [newMessage, setNewMessage] = useState("");
  // const socket = useRef(io("ws://localhost:8900"));
  const scrollRef = useRef();

  // useEffect(() => {
  //   socket?.on("welcome", (message) => {
  //     console.log(message);
  //   });
  // }, [socket]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    getConversations();
  }, [userId]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const conversationId = currentChat?._id;
        const res = await axios.get("/messages/" + conversationId);

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    try {
      const response = await axios.post("/messages", message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log("err: ", err);
    }
  };
  return (
    <>
      <NavBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for Friends" className="chatMenuInput" />

            {conversations.map((convo, id) => {
              return (
                <div key={id} onClick={() => setCurrentChat(convo)}>
                  <Conversation conversation={convo} userId={userId} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef}>
                        <Message message={m} own={m?.sender === userId} />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Write something"
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>{" "}
              </>
            ) : (
              <span className="noConvoText">
                Open A Conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
