import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authorizedRoute } from "./utils/routeList";
import setUpInterceptor from "./utils/Interceptor";

function App() {
  const [isAuthToken, setIsAuthToken] = useState(false);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken && !isAuthToken) {
      setUpInterceptor(authToken);
      setIsAuthToken(true);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "40px",
        backgroundColor: "#FFFFFF",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Router>
        <Routes>
          {authorizedRoute.map((elm: any, idx: number) => {
            return (
              <Route
                key={`user-route-${idx}`}
                path={elm.path}
                element={elm.component}
              />
            );
          })}
        </Routes>
      </Router>
    </Box>
  );
}
export default App;
