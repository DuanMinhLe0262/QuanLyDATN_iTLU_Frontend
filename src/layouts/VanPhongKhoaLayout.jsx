import { Outlet, NavLink } from "react-router-dom";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaSchool, FaProjectDiagram, FaChartBar, FaUsersCog, FaCalendarAlt, FaLayerGroup } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import { RiArrowDropDownLine } from "react-icons/ri";
import logoDHTL from '../assets/logo_DHTL.png';

import { useState } from "react";

const VanPhongKhoaLayout = () => {
  const [openGroup, setOpenGroup] = useState(null);

  const toggleGroup = (group) => {
    setOpenGroup(openGroup === group ? null : group);
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center p-2 rounded-lg transition ${isActive ? "bg-blue-100 font-semibold text-blue-700" : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"}`;

  return (
    <>
      <div></div>

      <div>

        <button type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
        </button>

        <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">

              <li className="flex items-center-safe mb-10">
                <img src={logoDHTL} alt="Logo DHTL" className="w-20 h-20 object-contain mr-3" />
                <h1 className="text-3xl font-bold text-[#525252]">iTLU</h1>
              </li>

              <li>
                <NavLink to="/vanphongkhoa" end className={navItemClass}>
                  <FaChartBar className="me-3" />
                  <span>Trang chủ</span>
                </NavLink>
              </li>

              {/* Nhóm quản lý người dùng */}
              <li>
                <button onClick={() => toggleGroup("nguoi-dung")}
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                  <FaUsersCog className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />

                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Quản lý người dùng</span>

                  <RiArrowDropDownLine className="w-8 h-8" />
                </button>
                <ul className={`${openGroup === "nguoi-dung" ? "block" : "hidden"} py-2 space-y-2`}>
                  <li>
                    <NavLink to="/vanphongkhoa/quanlysinhvien" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaUserGraduate className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Sinh viên</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/vanphongkhoa/quanlygiangvien" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaChalkboardTeacher className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Giảng viên</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Nhóm tổ chức */}
              <li>
                <button onClick={() => toggleGroup("to-chuc")}
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                  <FaUsersCog className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />

                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Quản lý tổ chức</span>

                  <RiArrowDropDownLine className="w-8 h-8" />
                </button>
                <ul className={`${openGroup === "to-chuc" ? "block" : "hidden"} py-2 space-y-2`}>
                  <li>
                    <NavLink to="/vanphongkhoa/quanlylop" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaUserGraduate className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Lớp học</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/vanphongkhoa/quanlynganh" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaChalkboardTeacher className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Ngành</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/vanphongkhoa/quanlybomon" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaChalkboardTeacher className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Bộ môn</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/vanphongkhoa/quanlykhoa" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaChalkboardTeacher className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Khoa</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Nhóm đồ án */}
              <li>
                <button onClick={() => toggleGroup("do-an")}
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                  <FaUsersCog className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />

                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Quản lý đồ án</span>

                  <RiArrowDropDownLine className="w-8 h-8" />
                </button>
                <ul className={`${openGroup === "do-an" ? "block" : "hidden"} py-2 space-y-2`}>
                  <li>
                    <NavLink to="/vanphongkhoa/quanly-dotdoan" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaUserGraduate className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Đợt đồ án</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/vanphongkhoa/duyet-hoidong" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaChalkboardTeacher className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Hội đồng chấm</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/vanphongkhoa/laplich-baove" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group 
                    ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaChalkboardTeacher className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">Lịch bảo vệ</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/vanphongkhoa/quanly-sinhvien" className={({ isActive }) =>
                      `flex items-center w-full p-2 text-base transition duration-75 rounded-lg pl-11 group 
                    ${isActive
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      }`
                    }>
                      <FaChalkboardTeacher className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                      <span className="ms-3 whitespace-nowrap">DS SV đủ điều kiện</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <NavLink to="/vanphongkhoa/thongke" className={navItemClass}>
                  <FaChartBar className="me-3" />
                  <span>Thống kê</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64">

          <div className="flex justify-end items-center gap-4 px-4 py-2 mt-5 mb-5 bg-white ">
            <button className="relative text-gray-600 hover:text-gray-800">
              <FaRegBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"/>
            </button>

            <button className="flex items-center gap-4">
              <FaUserCircle className="w-6 h-6 text-gray-600 hover:text-gray-800"/>
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

export default VanPhongKhoaLayout;
