import React, { useState } from "react";
import { image } from "../../Constant/image";
import "../../styles/authStyle.css";
import InputComponent from "../../Components/InputComponent";
import { loginInput } from "../../Constant/string";
import { Box } from "@mui/material";
import bellIcon from "../../assets/images/svg/bell-icon.svg";
import instance from "../../utils/Axios";

const LeftComponent = () => {
  const [search, setSearch] = useState<any>("");

  //set inputs values in inputData state on change the text of it.
  const handleChange = (field: any, value: any) => {
    console.log("handleChange", field, value);
    setSearch(value);
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
      {loginInput.map((elm: any) => {
        return (
          <div
            style={{
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #28c9c9",
            }}
          >
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
            <p className="left_component_user_discrirtion">10.38PM</p>
          </div>
        );
      })}
    </div>
  );
};

export default LeftComponent;
