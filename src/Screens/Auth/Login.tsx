import React, { useCallback, useEffect, useState } from "react";
import { image } from "../../Constant/image";
import "../../styles/authStyle.css";
import InputComponent from "../../Components/InputComponent";
import { loginInput } from "../../Constant/string";
import ButtonComponent from "../../Components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Toaster from "../../Components/Toaster";
import instance from "../../utils/Axios";
import { AxiosError } from "axios";

const Login = () => {
  const [inputData, setInputData] = useState<any>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<any>({});

  const navigate = useNavigate();

  //set inputs values in inputData state on change the text of it.
  const handleChange = useCallback(
    (field: any, value: any) => {
      setInputData((prev: object) => ({ ...prev, [field]: value }));
      setError((prev: object) => ({ ...prev, [field]: "" }));
    },
    [inputData]
  );

  //   check validations here for input fields
  const validation = () => {
    let updateError = { ...error };
    let isValid = true;

    for (let key in inputData) {
      if (!inputData[key]) {
        updateError[key] = `please enter ${key}`;
        isValid = false;
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputData.email)
      ) {
        isValid = false;
        updateError.email = "please enter a valid email";
      }
      if (inputData.password.length < 6) {
        isValid = false;
        updateError.password = "please enter a valid password";
      }
    }
    setError(updateError);
    return isValid;
  };

  const handleLogin = async () => {
    if (validation()) {
      const payload = {
        email: inputData.email,
        password: inputData.password,
      };
      const response: any = await instance
        .post(`user/login`, payload)
        .catch((err: AxiosError | any) => {
          console.log("error in api ", err.response.data.message);
        });
      console.log("response", response.data);
      if (response?.data.success) {
        // store auth token and navigate to chat page
        localStorage.setItem("authToken", response.data.authToken);
        navigate("/chat");
      }
    }
  };

  const handleToasterClose = () => {
    setError((prev: any) => ({ ...prev, toaster: null }));
  };

  return (
    <>
      {error?.toaster && (
        <Toaster
          onHandleClose={handleToasterClose}
          severity="error"
          message={error.toaster}
        />
      )}
      <div className="login_container">
        <img className="login_side_image" src={image.loginSide} />
        <div className="login_input_container">
          <h3 className="login_page_heading">User Login </h3>
          <Box>
            {loginInput.map((elm: any) => {
              return (
                <div style={{ marginTop: "20px" }}>
                  <InputComponent
                    type={elm.inputType}
                    label={elm.label}
                    field={elm.value}
                    icon={elm.icon}
                    iconStyle={elm.iconStyle}
                    value={inputData[elm.value] ?? ""}
                    placeholder={elm.placeholder}
                    onHandleChange={handleChange}
                    error={error[elm.value]}
                  />
                </div>
              );
            })}
            <div className="forget_password_container">
              <a href="/">Not a member? Sign Up</a>
            </div>
            <ButtonComponent
              color=""
              backgroundColor="#1445A2"
              variant="contained"
              onHandleClick={handleLogin}
              label="Login"
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login;
