import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FailMessage from "../components/common/FailMessage";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    if (failMessage) {
      const timeout = setTimeout(() => setFailMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [failMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/token",
        { email, password },
        { withCredentials: true }
      );


      const infoRes = await axios.get("http://localhost:8080/auth/token/me", {
        withCredentials: true,
      });

      const roles = infoRes.data.roles || [];
      localStorage.setItem("user", JSON.stringify({ roles }));

      console.log("Roles từ server:", roles);
      console.log("Kiểu dữ liệu:", typeof roles, Array.isArray(roles));

      if (roles.includes("SINHVIEN")) {
        navigate("/sinhvien");
      } else if (roles.includes("GIANGVIEN")) {
        navigate("/giangvien");
      } else if (roles.includes("BOMON")) {
        navigate("/bomon");
      } else if (roles.includes("KHOA")) {
        navigate("/vanphongkhoa");
      } else {
        alert("Không xác định được vai trò người dùng!");
      }

    } catch (error) {
      console.error("Login failed", error);
      setFailMessage("Lỗi khi đăng nhập: " + (error.response?.data?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 ">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl flex overflow-hidden">
        
        <div className="w-1/2 bg-gradient-to-br from-blue-400 to-purple-600 text-white flex flex-col justify-center items-center p-8">
          <h1 className="text-5xl font-bold mb-4">iTLU</h1>
          <p className="text-center mb-20">
            Hệ thống quản lý đồ án tốt nghiệp Trường Đại học Thủy Lợi
          </p>
        </div>

        
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Đăng nhập</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 bg-gradient-to-br from-blue-400 to-purple-600 text-white py-2 rounded hover:opacity-90 transition"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            {failMessage && <FailMessage message={failMessage} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
