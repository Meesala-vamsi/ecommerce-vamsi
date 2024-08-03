import "./App.css";
import { ToastContainer } from "react-toastify";
import {ContextProvider} from "./ReactContext/Context";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <ContextProvider>
      <ToastContainer/>
        <Routes>
          <Route element={<ProtectedRoute isAuthRoute={true} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute isAuthRoute={false} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
    </ContextProvider>
  );
};

export default App;
