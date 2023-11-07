import React from "react";
import "../../styles/authStyle.css";
import LeftComponent from "./LeftComponent";
import MiddleComponent from "./MiddleComponent";

const Chat = () => {
  return (
    <div className="chat_container">
      <LeftComponent />
      <MiddleComponent />
    </div>
  );
};

export default Chat;
