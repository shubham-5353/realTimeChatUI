import React, { useEffect, useState } from "react";
import { image } from "../../Constant/image";
import "../../styles/authStyle.css";
import InputComponent from "../../Components/InputComponent";
import { loginInput } from "../../Constant/string";
import { Box } from "@mui/material";
import bellIcon from "../../assets/images/svg/bell-icon.svg";
import instance from "../../utils/Axios";
import { AxiosError } from "axios";

const LeftComponent = ({ getMessageList, setReceiverDetails }: any) => {
  const [search, setSearch] = useState<any>("");
  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    getUserList();
  }, []);
  const getUserList = async () => {
    const response: any = await instance
      .get(`user/list`)
      .catch((err: AxiosError | any) => {
        console.log("error in api ", err.response.data.message);
      });
    if (response?.data.success) {
      // store auth token and navigate to chat page
      console.log("User list", response?.data);
      setUserList(response?.data.data);
    }
  };
  //set inputs values in inputData state on change the text of it.
  const handleChange = async (field: any, value: any) => {
    console.log("handleChange", field, value);
    setSearch(value);
    if (value.trim() === "") {
      return;
    }
    const response: any = await instance
      .get(`user/list?search=${value}`)
      .catch((err: AxiosError | any) => {
        console.log("error in api ", err.response.data.message);
      });
    console.log("response", response.data);
    if (response?.data.success) {
      // store auth token and navigate to chat page
      console.log("User list", response?.data);
      setUserList(response?.data.data);
    }
  };

  return (
    <div className="side_container">
      <div className="left_component_header">
        <img className="profile_img" src={image.loginSide} />
        <img className="bell_icon" src={bellIcon} />
      </div>
      <div style={{ padding: "0px 10px", marginBottom: "20px" }}>
        <InputComponent
          field="search"
          icon={image.searchBlue}
          iconStyle={{
            width: "25px",
            height: "16px",
            position: "absolute",
            top: "13px",
            left: "8px",
          }}
          value={search ?? ""}
          placeholder="search or start new chat"
          onHandleChange={handleChange}
        />
      </div>
      {userList.map((elm: any, index: number) => {
        return (
          <div
            style={{
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #28c9c9",
            }}
            key={index}
            onClick={() => {
              setReceiverDetails(elm);
              getMessageList(elm.id);
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <img className="profile_img" src={image.loginSide} />
              <Box>
                <p className="left_component_user_name">{elm.name} </p>
                <p className="left_component_user_discrirtion">
                  {elm.mobileNumber}
                </p>
              </Box>
            </div>
            <p className="left_component_user_discrirtion">10.38PM</p>
          </div>
        );
      })}
    </div>
  );
};

export default LeftComponent;
