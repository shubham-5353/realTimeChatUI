import { image } from "./image";

// ------------------------------ Login Page----------------------------------
export const loginInput = [
  {
    label: "Email ID",
    placeholder: "robert@salaryday.in",
    value: "email",
    type: 1,
    inputType: "email",
    icon: image.emailIcon,
    iconStyle: {
      width: "25px",
      height: "18px",
      position: "absolute",
      top: "34px",
      left: "8px",
    },
  },

  {
    label: "Password",
    placeholder: "************",
    value: "password",
    inputType: "password",
    type: 1,
    icon: image.passwordIcon,
    iconStyle: {
      width: "25px",
      height: "16px",
      position: "absolute",
      top: "32px",
      left: "8px",
    },
  },
];

// ------------------------------ Sign up Page----------------------------------
export const signUpInput = [
  {
    label: "Name",
    placeholder: "User Name",
    value: "name",
    type: 1,
    inputType: "text",
    icon: image.loginUserIcon,
    iconStyle: {
      width: "25px",
      height: "25px",
      position: "absolute",
      top: "30px",
      left: "8px",
    },
  },

  {
    label: "Email ID",
    placeholder: "robert@salaryday.in",
    value: "email",
    type: 1,
    inputType: "email",
    icon: image.emailIcon,
    iconStyle: {
      width: "25px",
      height: "18px",
      position: "absolute",
      top: "34px",
      left: "8px",
    },
  },
  {
    label: "Mobile Number",
    placeholder: "Mobile Number",
    value: "number",
    inputType: "number",
    type: 1,
    icon: image.loginUserIcon,
    iconStyle: {
      width: "25px",
      height: "25px",
      position: "absolute",
      top: "30px",
      left: "8px",
    },
  },
  {
    label: "Gender",
    placeholder: "Gender",
    value: "gender",
    type: 2,
    icon: image.loginUserIcon,
    iconStyle: {
      width: "25px",
      height: "25px",
      position: "absolute",
      top: "30px",
      left: "8px",
    },
    list: [
      { label: "Male", value: 1 },
      { label: "Female", value: 2 },
      { label: "Other", value: 3 },
    ],
  },
  {
    label: "Password",
    placeholder: "************",
    value: "password",
    inputType: "password",
    type: 1,
    icon: image.passwordIcon,
    iconStyle: {
      width: "25px",
      height: "16px",
      position: "absolute",
      top: "32px",
      left: "8px",
    },
  },
  {
    label: "Confirm Password",
    placeholder: "************",
    value: "confirmPassword",
    inputType: "password",
    type: 1,
    icon: image.passwordIcon,
    iconStyle: {
      width: "25px",
      height: "16px",
      position: "absolute",
      top: "32px",
      left: "8px",
    },
  },
];
