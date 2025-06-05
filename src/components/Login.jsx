import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn submit reload lại trang
    setLoading(true); // Bắt đầu loading

    try {
      const response = await axios.post("http://localhost:8080/auth/token", {
        email,
        password,
      });

      const token = response.data.result.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      console.log("Token nhận được:", token);

      navigate("/sinhvien");

    } catch (error) {
      alert("Đăng nhập thất bại.");
    } finally {
    setLoading(false); // Kết thúc loading
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl flex overflow-hidden">
        {/* Bên trái */}
        <div className="w-1/2 bg-gradient-to-br from-blue-400 to-purple-600 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Hello, welcome</h2>
          <p className="text-center">We're glad you're here. Please login to continue.</p>
        </div>

        {/* Bên phải */}
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Login</h2>
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
                placeholder="Password"
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
              type="submit disabled={loading}"
              className="mt-5 bg-gradient-to-br from-blue-400 to-purple-600 text-white py-2 rounded hover:opacity-90 transition"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
