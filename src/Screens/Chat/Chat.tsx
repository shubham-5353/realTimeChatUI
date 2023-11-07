import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../../styles/authStyle.css";
import LeftComponent from "./LeftComponent";
import MiddleComponent from "./MiddleComponent";
import { AxiosError } from "axios";
import instance from "../../utils/Axios";
const Chat = () => {
  const [messageList, setMessageList] = useState<any>([]);
  const [receiverDetails, setReceiverDetails] = useState<any>({});
  useEffect(() => {
    setSocket();
  }, []);
  const setSocket = () => {
    var socket = io("http://localhost:3000", {
      query: { userId: localStorage.getItem("loggedInUserId") },
      autoConnect: true,
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("connect_error", (err) => {
      console.log(err);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected Socket!");
    });
    socket.on(`message_${localStorage.getItem("loggedInUserId")}`, (data) => {
      setMessageList((prev: any) => [...prev, data.data]);
    });
    socket.on(`userTypingStart`, (data) => {});
    socket.on(`userTypingEnd`, (data) => {});
  };
  const getMessageList = async (userId: number) => {
    const response: any = await instance
      .get(`messages/list?userId=${userId}`)
      .catch((err: AxiosError | any) => {
        console.log("error in api ", err.response.data.message);
      });
    console.log("response", response.data);
    if (response?.data.success) {
      // store auth token and navigate to chat page
      console.log("User list", response?.data);
      setMessageList(response?.data.data);
    }
  };

  return (
    <div className="chat_container">
      <LeftComponent
        getMessageList={getMessageList}
        setReceiverDetails={setReceiverDetails}
      />
      <MiddleComponent
        messageList={messageList}
        receiverDetails={receiverDetails}
      />
    </div>
  );
};

export default Chat;
