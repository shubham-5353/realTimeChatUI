import { Button } from "@mui/material";
import React, { memo } from "react";

const ButtonComponent = ({
  variant,
  label,
  onHandleClick,
  color,
  backgroundColor,
  icon,
}: any) => {
  return (
    <Button
      sx={{
        height: "40px",
        fontSize: "15px",
        color: color,
        backgroundColor: backgroundColor,
      }}
      variant={variant}
      onClick={() => onHandleClick()}
    >
      {label}
      {icon && <img style={{ marginLeft: "10px" }} src={icon}></img>}
    </Button>
  );
};

export default memo(ButtonComponent);
