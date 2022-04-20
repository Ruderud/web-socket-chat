import React, { useEffect, useRef, useState } from "react";
import RenderChatList from "./RenderChatList";
import "./style.css";

import io from "socket.io-client";

export interface Chat {
  createAt: number;
  text: string;
  UID: string;
}

const generateDummyChats = (count: number): Array<Chat> => {
  const MY_UID = "me";

  const list: Array<Chat> = [...Array(count)].map((ele, idx) => {
    const timeStamp = Date.now();
    return {
      createAt: timeStamp,
      text: `i'm initial dummy chat #${
        String(timeStamp)[Math.floor(Math.random() * 10)]
      }`,
      UID: Math.floor(Math.random() * 10) % 2 === 0 ? "unknown" : MY_UID,
    };
  });

  return list;
};

const INITIAL_DUMMY_CHATS_CNT = 30;

export default function Chats(): JSX.Element {
  const [chatList, setChatList] = useState<Array<Chat>>(
    generateDummyChats(INITIAL_DUMMY_CHATS_CNT)
  );
  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleMessageInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNowMessage(evt.target.value);
  };

  const sendMessageByEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (!nowMessage) return;
    if (isComposing) return;
    if (evt.key === "Enter") {
      setChatList([
        ...chatList,
        {
          UID: "me",
          createAt: Date.now(),
          text: nowMessage,
        },
      ]);
      setNowMessage("");
    }
  };

  const sendMessageByClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!nowMessage) return;

    if (evt.type === "click") {
      setChatList([
        ...chatList,
        {
          UID: "me",
          createAt: Date.now(),
          text: nowMessage,
        },
      ]);
      setNowMessage("");
    }
  };

  // const socet

  // useEffect(,[])

  return (
    <div className="chatContainer">
      <RenderChatList chatList={chatList} />
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
        <button
          onClick={() => {
            const socket = io("ws://localhost:81/chats", {
              transports: ["websocket"],
            });
            console.log(socket);

            socket.on("connect", () => {
              console.log("connected", socket);
              socket.emit("chats", { message: nowMessage });
            });
          }}
        >
          socketConnect
        </button>
      </div>
    </div>
  );
}
