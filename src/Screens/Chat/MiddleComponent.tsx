import React, { useEffect, useRef, useState } from "react";
import { image } from "../../Constant/image";
import "../../styles/authStyle.css";
import InputComponent from "../../Components/InputComponent";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import instance from "../../utils/Axios";
import ButtonComponent from "../../Components/ButtonComponent";
import { AxiosError } from "axios";
import { IMAGE_BASE_URL } from "../../Constant/constant";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  background: "red",
});

const MiddleComponent = ({
  receiverDetails,
  messageList,
  socket,
  typingUser,
}: any) => {
  const [message, setMessage] = useState<any>("");
  const [file, setFile] = useState<any>();
  const [attachmentUrl, setAttachmentUrl] = useState<any>("");
  const messagesEndRef = useRef<any>(null);
  const [loggedInUserId, setloggedInUserId] = useState<any>();
  let clearTimerRef: any = useRef();
  //set inputs values in inputData state on change the text of it.
  useEffect(() => {
    setloggedInUserId(localStorage.getItem("loggedInUserId"));
  }, []);
  const handleChange = (field: any, value: any) => {
    setMessage(value);
    socket.emit("userTypingStart", {
      userId: parseInt(loggedInUserId),
      receiverUserId: receiverDetails.id,
    });
    clearTimeout(clearTimerRef.current);
    clearTimerRef.current = setTimeout(() => {
      socket.emit("userTypingEnd", {
        userId: parseInt(loggedInUserId),
        receiverUserId: receiverDetails.id,
      });
    }, 2000);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);
  const handleSendMsg = async () => {
    if (message.trim() === "") {
      return;
    }
    const payload = {
      message,
      userId: receiverDetails.id,
      attachmentUrl: attachmentUrl,
    };
    const response: any = await instance
      .post(`messages/send`, payload)
      .catch((err: AxiosError | any) => {
        console.log("error in api ", err.response.data);
        if (err.response.status === 401) {
          localStorage.clear();
          window.location.href = "/";
        }
      });
    if (response?.data.success) {
      setMessage("");
      setFile("");
    }
  };
  const uploadFile = async (file: any) => {
    var data = new FormData();
    data.append("imageData", file);
    const response: any = await instance
      .post(`messages/uploadAttchments`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err: AxiosError | any) => {
        console.log("error in api ", err.response.data.message);
        if (err.response.status === 401) {
          localStorage.clear();
          window.location.href = "/";
        }
      });
    if (response?.data.success) {
      // store auth token and navigate to chat page
      setAttachmentUrl(response?.data.url);
    }
  };
  return (
    <div className="middle_container">
      {receiverDetails && (
        <div className="left_component_header">
          <div
            style={{
              display: "flex",
            }}
          >
            <img className="profile_img" src={image.loginSide} />
            <Box>
              <p className="middle_component_user_name">
                {receiverDetails.name}
              </p>
              {typingUser ? (
                <p className="middle_component_user_discrirtion">Typing....</p>
              ) : null}
            </Box>
          </div>
        </div>
      )}
      {file && (
        <div
          style={{
            border: "1px solid #28c9c9",
            padding: 20,
            height: "250px",
            width: "250",
            position: "absolute",
            left: "50%",
            bottom: "100px",
            transform: "translate(-50%, 0%)",
          }}
        >
          <img width={200} height={200} src={URL.createObjectURL(file)} />
          <div style={{ position: "absolute", top: "-25px", right: "-35px" }}>
            <ButtonComponent
              // backgroundColor="red"
              variant="contained"
              onHandleClick={() => {
                setFile("");
              }}
              label="x"
            />
          </div>
        </div>
      )}
      {receiverDetails && (
        <div className="friends_self_msg_container">
          {messageList?.map((data: any, index: number) => {
            return (
              <div
                className={`${
                  data.senderUserId === parseInt(loggedInUserId)
                    ? "self_msg"
                    : ""
                }`}
                key={index}
              >
                <div>
                  {data.attachmentUrl && data.attachmentUrl !== "" ? (
                    <img
                      width={200}
                      height={200}
                      src={`${IMAGE_BASE_URL}${data.attachmentUrl}`}
                    />
                  ) : null}
                  <p key={index} className="friends_msg">
                    {data.message}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}

      {receiverDetails && (
        <div className="middle_input_msg">
          <Button style={{ minWidth: 0, fontSize: "25px" }} component="label">
            +
            <VisuallyHiddenInput
              onChange={(e: any) => {
                uploadFile(e.target.files[0]);
                if (e.target.files) {
                  URL.createObjectURL(e.target.files[0]);
                  setFile(e.target.files[0] ?? "");
                }
              }}
              type="file"
            />
          </Button>
          <div style={{ width: "100%", marginRight: "10px" }}>
            <InputComponent
              field="search"
              type="textArea"
              value={message}
              placeholder="Type a message"
              onHandleChange={handleChange}
            />
          </div>
          <ButtonComponent
            backgroundColor="#28c9c9"
            variant="contained"
            onHandleClick={handleSendMsg}
            label=">"
          />
        </div>
      )}
      {!receiverDetails && (
        <div
          className="friends_self_msg_container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "13%",
          }}
        >
          <h3>Please select user to start chat.</h3>
        </div>
      )}
    </div>
  );
};

export default MiddleComponent;
