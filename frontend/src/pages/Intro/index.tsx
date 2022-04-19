import { useState } from "react";
import { useNavigate } from "react-router";

export default function Intro(): JSX.Element {
  const navigate = useNavigate();

  const [nickName, setNickName] = useState<string>();

  const handleInputNickName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setNickName(value);
  };

  const generateRandomNickName = () => {
    setNickName(String(Math.floor(Math.random() * 1000000)));
  };

  const enterChatRoom = () => {
    const chatRoomID = "q1w2e3r4";
    navigate(`/chats:id=${chatRoomID}`);
  };

  return (
    <>
      <div>
        <label htmlFor="nickName"></label>
        <input
          type="text"
          name="nickName"
          value={nickName}
          onChange={handleInputNickName}
        />
        <button onClick={generateRandomNickName}>자동닉네임생성</button>
        <button onClick={enterChatRoom}>입장하기</button>
      </div>
    </>
  );
}
