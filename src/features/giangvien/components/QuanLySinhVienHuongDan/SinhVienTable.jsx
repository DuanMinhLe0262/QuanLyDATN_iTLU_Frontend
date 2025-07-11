import React from "react";
import { RiEditLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";

const SinhVienTable = ({ sinhVienList, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Mã sinh viên</th>
            <th className="py-3 px-4">Họ và tên đệm</th>
            <th className="py-3 px-4">Tên</th>
            <th className="py-3 px-4">Lớp</th>
            <th className="py-3 px-4">Số điện thoại</th>
            <th className="py-3 px-4">Vai trò</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sinhVienList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row?.sinhVien?.maSinhVien}</td>
              <td className="py-2 px-4">{row?.sinhVien?.hoDem}</td>
              <td className="py-2 px-4">{row?.sinhVien?.ten}</td>
              <td className="py-2 px-4">{row?.sinhVien?.lop?.tenLop}</td>
              <td className="py-2 px-4">{row?.sinhVien?.soDienThoai}</td>
              <td className="py-2 px-4">{row?.vaiTroHuongDan}</td>
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

export default SinhVienTable;
