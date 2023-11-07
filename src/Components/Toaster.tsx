import React, { memo } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toaster = ({ onHandleClose, severity, message }: any) => {
  return (
    <Snackbar open={true} autoHideDuration={2000} onClose={onHandleClose}>
      <Alert onClose={onHandleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default memo(Toaster);
