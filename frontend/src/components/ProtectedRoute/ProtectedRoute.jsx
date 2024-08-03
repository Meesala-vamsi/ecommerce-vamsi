import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ isAuthRoute }) => {
  const token = Cookies.get("connect.sid");
  console.log(token)
  if (isAuthRoute) {
    return token ? <Navigate to="/" /> : <Outlet />;
  } else {
    return token ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;