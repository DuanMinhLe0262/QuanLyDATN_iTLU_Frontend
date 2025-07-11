import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const UserDropdown = () => {
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/myInfo", {
        withCredentials: true,
      });
      console.log("res.data:", res.data);
      setUserInfo(res.data.result.body);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", null, {
        withCredentials: true,
      });
      window.location.href = "/";
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpenUserDropdown((prev) => !prev)}
        className="flex items-center gap-x-2 px-3 py-2 font-medium bg-white rounded-lg hover:bg-gray-100 focus:outline-none"
      >
        {userInfo?.avatarUrl ? (
          <img src={userInfo.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-600 hover:text-gray-800" />
        )}

        <span className="text-gray-900">
          {userInfo?.ten || "Duẩn"}
        </span>
        <RiArrowDropDownLine className="w-5 h-5 text-gray-500" />
      </button>

      {openUserDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5">
          <div>
            <a
              href="/profile"
              className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cài đặt tài khoản
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
