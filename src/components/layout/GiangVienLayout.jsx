import { Outlet, NavLink } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GiangVienLayout = () => {
  const navItemClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive
        ? "bg-gray-200 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-grow">
        <aside className="w-64 p-6 border-r border-gray-300 bg-gray-50">
          <ul className="space-y-2">
            <li>
              <NavLink to="/giangvien" end className={navItemClass}>
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/giangvien/nhapdanhsach" className={navItemClass}>
                Nhập DS Sinh viên hướng dẫn
              </NavLink>
            </li>
            <li>
              <NavLink to="/giangvien/nhapdetai" className={navItemClass}>
                Nhập DS Đề tài của sinh viên
              </NavLink>
            </li>
            <li>
              <NavLink to="/giangvien/quanlysinhvien" className={navItemClass}>
                Quản lý sinh viên hướng dẫn
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

export default GiangVienLayout;
