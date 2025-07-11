import React from "react";
import { RiEditLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";

const LichBaoVeTable = ({ lichList, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Đợt</th>
            <th className="py-3 px-4">Mã lịch</th>
            <th className="py-3 px-4">Địa điểm</th>
            <th className="py-3 px-4">Ngày</th>
            <th className="py-3 px-4">Giờ bắt đầu</th>
            <th className="py-3 px-4">Giờ kết thúc</th>
            <th className="py-3 px-4">Hội đồng</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {lichList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row.hoiDong?.dot?.tenDot}</td>
              <td className="py-2 px-4">{row.maLich}</td>
              <td className="py-2 px-4">{row.diaDiem}</td>
              <td className="py-2 px-4">
                {row.ngay ? new Date(row.ngay).toLocaleDateString("vi-VN") : ""}
              </td>
              <td className="py-2 px-4">{row.gioBatDau}</td>
              <td className="py-2 px-4">{row.gioKetThuc}</td>
              <td className="py-2 px-4">{row.hoiDong?.tenHoiDong}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <button
                  className="text-yellow-600 hover:text-yellow-800"
                  onClick={() => onEdit(row)}
                >
                  <RiEditLine />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(row.id)}
                >
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LichBaoVeTable;
