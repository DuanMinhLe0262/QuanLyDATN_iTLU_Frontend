import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    const scopes = decoded.scope || [];

    const roles = typeof scopes === "string" ? scopes.trim().split(/\s+/) : scopes;

    const hasRole = roles.some((role) => allowedRoles.includes(role));

    return hasRole ? <Outlet /> : <Navigate to="/" />;
  } catch (err) {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
