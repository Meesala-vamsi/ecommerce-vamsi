import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import { ReactContext } from "../../ReactContext/Context";

const ProtectedRoute = ({ isAuthRoute }) => {
  const token = Cookies.get("jwtToken");
  const {getUser} = useContext(ReactContext)
  console.log(token)
  if (isAuthRoute) {
    return token ? <Navigate to="/" /> : <Outlet />;
  } else {
    return token ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;