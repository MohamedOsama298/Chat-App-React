import { useEffect } from "react";
import "./App.css";
import socket from "./socket";
import { httpInstance } from "./network/baseUrl";
import Chat from "./pages/Chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./pages/SignIn";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();
function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <div>Hello</div>,
    },
    {
      path:"/login",
      element: <SignIn/>
    },
    {
      path:"/signup",
      element: <SignUp/>,
    },
    {
      path:"/chat",
      element: <Chat/>
    }
  ])
  function onConnect() {
    console.log("connected");
  }

  function onDisconnect() {
    console.log("disconnnected");
  }
  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // httpInstance.post("/messages", {
    //   message: {
    //     id: "hello",
    //     title: "Hello",
    //     body: "A Body",
    //   },
    // });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  );
}

export default App;
