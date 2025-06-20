import { Outlet, NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { MdOutlineAssessment } from "react-icons/md";

import logoDHTL from '../assets/logo_DHTL.png';

import { useState } from "react";

const GiangVienLayout = () => {
  const [openGroup, setOpenGroup] = useState(null);

  const toggleGroup = (group) => {
    setOpenGroup(openGroup === group ? null : group);
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center p-2 rounded-lg transition ${isActive ? "bg-blue-100 font-semibold text-blue-700" : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"}`;

  return (
    <>
      <div>

        <button type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
        </button>

        <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">

              <li className="flex items-center-safe mb-10">
                <img src={logoDHTL} alt="Logo DHTL" className="w-20 h-20 object-contain mr-3" />
                <h1 className="text-3xl font-bold">iTLU</h1>
              </li>

              <li>
                <NavLink to="/giangvien" end className={navItemClass}>
                  <LuLayoutDashboard className="w-5 h-5" />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Trang chủ</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/giangvien/danhsachdetai" className={navItemClass}>
                  <FaRegLightbulb className="w-5 h-5" />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Danh sách đề tài</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/giangvien/danhsachsinhvien" className={navItemClass}>
                  <FaChalkboardTeacher className="w-5 h-5" />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Danh sách sinh viên</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/giangvien/quanlysinhvien" className={navItemClass}>
                  <TbReport className="w-5 h-5" />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Quản lý sinh viên</span>
                </NavLink>
              </li>

            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64">

          <div className="flex justify-end items-center gap-4 px-4 py-2 mt-5 mb-5 bg-white ">
            <button className="relative text-gray-600 hover:text-gray-800">
              <FaRegBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button className="flex items-center gap-4">
              <FaUserCircle className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              <span>Duan</span>
            </button>

          </div>

          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <Outlet />
          </div>
        </div>

      </div>
    </>
  );
};

export default GiangVienLayout;