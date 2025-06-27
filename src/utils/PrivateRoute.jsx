import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PrivateRoute = ({ allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/token/me", {
          withCredentials: true,
        });

        const actualRoles = (res.data.roles || []).map(r => r.trim().toUpperCase());
        const normalizedAllowedRoles = allowedRoles.map(r => r.trim().toUpperCase());

        const hasPermission = normalizedAllowedRoles.some(role =>
          actualRoles.includes(role)
        );

        const cached = JSON.parse(localStorage.getItem("user"));
        const cachedRoles = cached?.roles || [];

        const rolesChanged =
          JSON.stringify(actualRoles.sort()) !== JSON.stringify(cachedRoles.sort());

        if (rolesChanged) {
          localStorage.setItem("user", JSON.stringify({ roles: actualRoles }));
        }

        setIsAllowed(hasPermission);
      } catch (err) {
        console.error("Không xác thực được người dùng", err);
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [allowedRoles]);

  if (loading) return <div className="text-center p-4">Đang kiểm tra quyền truy cập...</div>;

  return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
