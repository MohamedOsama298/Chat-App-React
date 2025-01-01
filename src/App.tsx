import { useEffect } from "react";
import "./App.css";
import socket from "./socket";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

const queryClient = new QueryClient();
function App() {
  function onConnect() {
    console.log("connected");
  }

  function onDisconnect() {
    console.log("disconnnected");
  }
  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
