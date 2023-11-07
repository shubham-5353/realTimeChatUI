import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../styles/componentStyle.css";

const SelectComponent = ({
  onHandleChange,
  value,
  label,
  list,
  field,
  placeholder,
}: any) => {
  return (
    <FormControl fullWidth>
      <p className="input-label">{label}</p>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        displayEmpty
        sx={{
          border: "1px solid #28C9C9",
          boxShadow: "0px 5px 5px rgba(40, 201, 201, 0.2)",
          borderRadius: "5px",
          height: "40px",
          width: "100%",
          background: "rgba(40, 201, 201, 0.05)",
          color: "#1445a2",
          fontSize: "12px",
        }}
        value={value ?? ""}
        // label="Age"
        onChange={(event: SelectChangeEvent) =>
          onHandleChange(field, event.target.value)
        }
      >
        <MenuItem sx={{ color: "#1445a2", fontSize: "12px" }} value="">
          {placeholder}
        </MenuItem>

        {list?.map((elm: any) => (
          <MenuItem
            sx={{ color: "#1445a2", fontSize: "12px" }}
            key={elm.value}
            value={elm.value}
          >
            {elm.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default React.memo(SelectComponent);
