import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Chats from "../pages/Chats/Chats";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/chat",
    element: <Chats />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
