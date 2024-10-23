import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { AuthProvider } from "./context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatProvider } from "./context/chat";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
