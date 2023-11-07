import React, { memo } from "react";
import "../styles/componentStyle.css";

const InputComponent = ({
  label,
  onHandleChange,
  value,
  placeholder,
  field,
  icon,
  error,
  onKeyDownHandler,
  iconStyle,
  type,
}: any) => {
  return (
    <div style={{position:"relative"}}>
      {label && <p className="input-label">{label}</p>}
      {icon && <img style={iconStyle} src={icon}/>}
      <input
        className="input-field"
        type = {type ?? "text"}
        placeholder={placeholder}
        value={value??""}
        style={{paddingLeft: icon && "40px"}}
        onKeyDown={onKeyDownHandler}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onHandleChange(field, event.target.value)
        }
      />
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default memo(InputComponent);
