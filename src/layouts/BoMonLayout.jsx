import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BoMonLayout = () => {
  const navItemClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive ? "bg-gray-200 font-semibold" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-grow">
        <aside className="w-64 p-6 border-r border-gray-300 bg-gray-50">
          <ul className="space-y-2">
            <li>
              <NavLink to="/bomon" end className={navItemClass}>
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/bomon/quanly-detaigoiy" className={navItemClass}>
                Quản lý đề tài gợi ý
              </NavLink>
            </li>
            <li>
              <NavLink to="/bomon/quanly-giangvien" className={navItemClass}>
                Quản lý giảng viên gợi ý
              </NavLink>
            </li>
            <li>
              <NavLink to="/bomon/phancong-giangvien" className={navItemClass}>
                Phân công giảng viên
              </NavLink>
            </li>
            <li>
              <NavLink to="/bomon/duyet-decuong" className={navItemClass}>
                Duyệt đề cương
              </NavLink>
            </li>
            <li>
              <NavLink to="/bomon/dexuat-hoidong" className={navItemClass}>
                Đề xuất hội đồng
              </NavLink>
            </li>
            <li>
              <NavLink to="/bomon/phanbo-hoidong" className={navItemClass}>
                Phân bổ hội đồng
              </NavLink>
            </li>
          </ul>
        </aside>

        <main className="flex-grow p-6 bg-white">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default BoMonLayout;
