import React from "react";
import { FaBell, FaEnvelope, FaUserCircle, FaCog } from "react-icons/fa";
import logoDHTL from '../assets/logo_DHTL.png';
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center h-24 w-full px-4 mt-6 text-[#525252] border-b border-gray-300">
      <div className="flex items-center gap-2">
        <Link to = "/sinhvien"><img src={logoDHTL} alt="Logo DHTL" className="w-20 h-20 object-contain" /></Link>
        <h1 className="text-3xl font-bold text-[#525252]">iTLU</h1>
      </div>

      <ul className="flex items-center space-x-6">
        <li className="cursor-pointer">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-200">
            <FaBell size={20} />
          </div>
        </li>
        <li className="cursor-pointer">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-200">
            <FaEnvelope size={20} />
          </div>
        </li>
        <li className="cursor-pointer">
          <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-200">
          </div>
        </li>
        <li className="mr-6 cursor-pointer">
          <p>Duan</p>
        </li>
      </ul>

    </div>
  );
};

export default Topbar;
