import React from "react";
import { RiEditLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";

const DotDoAnTable = ({ dotList, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Tên đợt</th>
            <th className="py-3 px-4">Năm học</th>
            <th className="py-3 px-4">Thời gian bắt đầu</th>
            <th className="py-3 px-4">Thời gian kết thúc</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {dotList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row.tenDot}</td>
              <td className="py-2 px-4">{row.namHoc}</td>
              <td className="py-2 px-4">{row.thoiGianBatDau}</td>
              <td className="py-2 px-4">{row.thoiGianKetThuc}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <button className="text-yellow-600 hover:text-yellow-800" onClick={() => onEdit(row)}>
                  <RiEditLine />
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(row.id)}>
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

export default DotDoAnTable;