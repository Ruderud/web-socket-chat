import React, { useEffect, useRef, useState } from "react";
import RenderChatList from "./RenderChatList";
import "./style.css";

import { io, Socket } from "socket.io-client";
import { socketInstance } from "../../api/socketInstance";

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
  const [chatList, setChatList] = useState<Array<Chat>>([]);
  const chatListRef = useRef(chatList);
  const [nowMessage, setNowMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);
  // const [socket, setSocket] = useState<Socket>();

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
      socketRef.current?.emit("reciveChat", {
        UID: randomUID,
        createAt: time,
        text: nowMessage,
      });
      console.log("now send message");

      setNowMessage("");
    }
  };

  const sendMessageByClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!nowMessage) return;

    if (evt.type === "click") {
      const time = Date.now();
      socketRef.current?.emit("reciveChat", {
        UID: randomUID,
        createAt: time,
        text: nowMessage,
      });

      setNowMessage("");
    }
  };

  const socketDisconnect = (socket: Socket) => {
    if (!socket.connected) return;

    socket.on("disconnect", () => {
      console.log("webSocket disconnect");
    });
  };

  const setChatListRef = useRef(setChatList);

  const socketRef = useRef<Socket>();
  const [s, setS] = useState<any>();

  const socketConnection = () => {
    // const connectedSocket = socketInstance();
    // setSocket(connectedSocket);
    socketRef.current = socketInstance();
    setS(socketRef.current);

    socketRef.current.on("sendChat", (res: Chat) => {
      console.log("recived Chats:", res);

      console.log(chatList);
      setChatList([...chatList, res]);
    });
    if (!socketRef.current?.connected) return;

    return socketDisconnect(socketRef.current);
  };

  useEffect(socketConnection, []);

  useEffect(() => {
    socketRef.current!.on("sendChat", (res: Chat) => {
      console.log("recived Chats:", res);

      console.log(chatList);
      setChatList([...chatList, res]);
    });
  }, [chatList]);

  return (
    <div className="chatContainer">
      <RenderChatList chatList={chatList} myUID={randomUID} />
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
      <div>MyUID: {randomUID}</div>
    </div>
  );
}
