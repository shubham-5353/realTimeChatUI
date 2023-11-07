import { lazy } from "react";
import SignUp from "../Screens/Auth/SignUp";
import Chat from "../Screens/Chat/Chat";

const Login = lazy(() => import("../Screens/Auth/Login"));

export const authorizedRoute = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/",
    component: <SignUp />,
  },
  {
    path: "/chat",
    component: <Chat />,
  },
];
