import React, { useCallback, useState } from "react";
import { image } from "../../Constant/image";
import "../../styles/authStyle.css";
import InputComponent from "../../Components/InputComponent";
import { signUpInput } from "../../Constant/string";
import ButtonComponent from "../../Components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Toaster from "../../Components/Toaster";
import SelectComponent from "../../Components/SelectComponent";
import instance from "../../utils/Axios";
import { AxiosError } from "axios";

const SignUp = () => {
  const [inputData, setInputData] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    gender: "",
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
        updateError[key] = `please fill ${key}`;
        isValid = false;
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputData.email)
      ) {
        isValid = false;
        updateError.email = "please enter a valid email";
      }
      if (!/^\d{10}$/.test(inputData.number)) {
        isValid = false;
        updateError.number = "please enter a valid Mobile number";
      }
      if (inputData.password.length < 6) {
        isValid = false;
        updateError.password = "please enter a valid password";
      }
      if (inputData.password !== inputData.confirmPassword) {
        isValid = false;
        updateError.confirmPassword = "should same as password";
      }
    }
    setError(updateError);
    return isValid;
  };

  const handleSignUp = async () => {
    if (validation()) {
      const payload = {
        name: inputData.name,
        email: inputData.email,
        password: inputData.password,
        mobileNumber: inputData.number,
        gender: inputData.gender,
      };
      const response: any = await instance
        .post(`user/signup`, payload)
        .catch((err: AxiosError | any) => {
          console.log("error in api ", err.response.data.message);
        });
      if (response?.data.success) {
        // store auth token and navigate to chat page
        navigate("/login");
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
          <h3 className="login_page_heading">Sign Up</h3>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {signUpInput.map((elm: any) => {
              return (
                <Box style={{ marginTop: "20px", width: "48%" }}>
                  {elm.type === 1 ? (
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
                  ) : (
                    <>
                      <SelectComponent
                        onHandleChange={handleChange}
                        value={inputData[elm.value]}
                        label={elm.label}
                        placeholder={elm.placeholder}
                        field={elm.value}
                        list={elm?.list}
                      />
                      {error.gender && (
                        <p className="error-msg">{error.gender}</p>
                      )}
                    </>
                  )}
                </Box>
              );
            })}
          </Box>
          <div className="forget_password_container">
            <div>
              <ButtonComponent
                color=""
                backgroundColor="#1445A2"
                variant="contained"
                onHandleClick={handleSignUp}
                label="Sign Up"
              />
            </div>
            <a href="/login">Already a member? Log in</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
