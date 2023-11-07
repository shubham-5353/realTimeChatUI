import React, { useState } from "react";
import { image } from "../../Constant/image";
import "../../styles/authStyle.css";
import InputComponent from "../../Components/InputComponent";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import instance from "../../utils/Axios";
import ButtonComponent from "../../Components/ButtonComponent";

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

const MiddleComponent = () => {
  const [message, setMessage] = useState<any>("");
  const [file, setFile] = useState<any>();

  console.log("file ----- ", file);
  //set inputs values in inputData state on change the text of it.
  const handleChange = (field: any, value: any) => {
    setMessage(value);
  };

  const handleSendMsg = () => {};

  return (
    <div className="middle_container">
      <div className="left_component_header">
        <div
          style={{
            display: "flex",
          }}
        >
          <img className="profile_img" src={image.loginSide} />
          <Box>
            <p className="left_component_user_name">Name</p>
            <p className="left_component_user_discrirtion">discription</p>
          </Box>
        </div>
      </div>
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
      <div className="friends_self_msg_container">
        <p className="friends_msg">Hello</p>
        <p className="friends_msg self_msg">Hello</p>
      </div>

      <div className="middle_input_msg">
        <Button style={{ minWidth: 0, fontSize: "25px" }} component="label">
          +
          <VisuallyHiddenInput
            onChange={(e) => {
              console.log("file upload", e.target.files);
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
    </div>
  );
};

export default MiddleComponent;
