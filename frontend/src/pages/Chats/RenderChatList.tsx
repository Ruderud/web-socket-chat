import { useEffect, useRef } from "react";
import { Chat } from "./index";

interface RenderChatListProps {
  chatList: Array<Chat>;
  myUID: string;
}
export default function RenderChatList({
  chatList,
  myUID,
}: RenderChatListProps): JSX.Element {
  const chatListEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatListEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatList]);

  return (
    <div className="chatListBox">
      {chatList.map((chat, idx) => {
        return (
          <div
            key={chat.createAt + idx}
            className={chat.UID !== myUID ? "otherChat" : "myChat"}
          >
            {(chat.UID !== "me" ? chat.UID + " : " : "") + chat.text}
          </div>
        );
      })}
      <div ref={chatListEndRef} />
    </div>
  );
}
