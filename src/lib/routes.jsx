import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import {createBrowserRouter} from "react-router-dom";
import Home from "../components/layout";
import Profile from "../components/layout/Profile";
import CurrentPost from "../components/layout/CurrentPost";
import Payment from "../components/layout/Payment";
import PostProfile from "../components/layout/PostProfile";
// import SharedPost from "../components/layout/SharedPost";


export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const PROFILE = "/profile";
export const PAYMENT = "/payment";

export const router = createBrowserRouter([
  {path: ROOT, element: <Home />},
  {path: LOGIN, element: <Login />},
  {path: REGISTER, element: <Register />},
  {path: "/posts/:postId", element: <CurrentPost />},
  {path: PROFILE, element: <Profile />},
  {path: PAYMENT, element: <Payment />},
  {path: "/profile/:postId", element: <PostProfile />},
  // {path: "/shared/:shareId", element: <SharedPost />},
  // {path: "/posts/:postId", element: <SinglePost />},

]);
