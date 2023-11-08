import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "../../styles/authStyle.css";
import LeftComponent from "./LeftComponent";
import MiddleComponent from "./MiddleComponent";
import { AxiosError } from "axios";
import instance from "../../utils/Axios";
const Chat = () => {
  const [messageList, setMessageList] = useState<any>([]);
  const [receiverDetails, setReceiverDetails] = useState<any>(null);
  const [typingUser, settypingUser] = useState<any>(false);
  const [loggedInUserId, setloggedInUserId] = useState<any>(0);
  const socketRef = useRef<any>(null);
  useEffect(() => {
    setloggedInUserId(localStorage.getItem("loggedInUserId"));
    setSocket();
  }, []);
  const setSocket = () => {
    socketRef.current = io("http://localhost:3000", {
      query: { userId: localStorage.getItem("loggedInUserId") },
      autoConnect: true,
      transports: ["websocket"],
    });
    socketRef.current.on("connect", () => {
      console.log("socket connected");
    });

    socketRef.current.on("connect_error", (err: any) => {
      console.log(err);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected Socket!");
    });
    socketRef.current.on(
      `message_${localStorage.getItem("loggedInUserId")}`,
      (data: any) => {
        setMessageList((prev: any) => [...prev, data.data]);
      }
    );
    socketRef.current.on(
      `userTypingStart_${parseInt(
        localStorage.getItem("loggedInUserId") || ""
      )}`,
      (data: any) => {
        if (receiverDetails && receiverDetails?.id === data.userId) {
          settypingUser(true);
        }
      }
    );
    socketRef.current.on(
      `userTypingEnd_${parseInt(localStorage.getItem("loggedInUserId") || "")}`,
      (data: any) => {
        if (receiverDetails && receiverDetails?.id === data.userId) {
          settypingUser(false);
        }
      }
    );
  };
  const getMessageList = async (userId: number) => {
    const response: any = await instance
      .get(`messages/list?userId=${userId}`)
      .catch((err: AxiosError | any) => {
        console.log("error in api ", err.response.data.message);
        if (err.response.status === 401) {
          localStorage.clear();
          window.location.href = "/";
        }
      });
    if (response?.data.success) {
      // store auth token and navigate to chat page
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
        socket={socketRef.current}
        typingUser={typingUser}
      />
    </div>
  );
};

export default Chat;
