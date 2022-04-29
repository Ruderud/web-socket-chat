import React, { useEffect, useRef, useState } from "react";
import RenderChatList from "./RenderChatList";
import "./style.css";

import { Socket } from "socket.io-client";
import { socketInstance } from "../../api/socketInstance";

export interface Chat {
  createAt: number;
  text: string;
  UID: string;
}

export default function Chats(): JSX.Element {
  const [chatList, setChatList] = useState<Array<Chat>>([]);
  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const socketRef = useRef<Socket>();

  const [randomUID, setUID] = useState<string>(
    String(Math.floor(Math.random() * 1000000))
  );

  const handleMessageInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(evt.target.value);
  };

  const sendMessageByEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (evt.key === "Enter") {
      const time = Date.now();
      const chat: Chat = {
        UID: randomUID,
        createAt: time,
        text: nowMessage,
      };
      socketRef.current?.emit("chatToServer", chat);
      setNowMessage("");
    }
  };

  const sendMessageByClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (evt.type === "click") {
      const time = Date.now();
      const chat: Chat = {
        UID: randomUID,
        createAt: time,
        text: nowMessage,
      };
      socketRef.current?.emit("chatToServer", chat);
      setNowMessage("");
    }
  };

  useEffect(() => {
    if (!socketRef.current) {
      //create webSocket
      socketRef.current = socketInstance();
    }
    if (socketRef.current) {
      //connect receive chat point
      socketRef.current.on("chatToClient", (res: Chat) => {
        setChatList([...chatList, res]);
      });
    }
    return () => {
      //after receive chat, off chat point
      socketRef.current!.off("chatToClient");
    };
  }, [chatList]);

  return (
    <div className="chatContainer">
      <RenderChatList chatList={chatList} myUID={randomUID} />
      <div className="userInfoContainer">MyUID: {randomUID}</div>
      <div className="chatWriteContainer">
        <input
          className="chatInput"
          type="text"
          value={nowMessage}
          onChange={handleMessageInput}
          onKeyDownCapture={sendMessageByEnter}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button className="chatSendBtn" onClick={sendMessageByClick}>
          send
        </button>
      </div>
    </div>
  );
}
