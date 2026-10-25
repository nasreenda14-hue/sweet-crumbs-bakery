import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ children }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!localStorage.getItem("token") || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export default AdminRoute;