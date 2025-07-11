import React from "react";
import { RiEditLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";

const GiangVienTable = ({ giangVienList, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">MGV</th>
            <th className="py-3 px-4">Họ</th>
            <th className="py-3 px-4">Tên</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4 text-nowrap">Bộ môn</th>
            <th className="py-3 px-4">Khoa</th>
            <th className="py-3 px-4">SĐT</th>
            <th className="py-3 px-4">Ngày sinh</th>
            <th className="py-3 px-4">Giới tính</th>
            <th className="py-3 px-4">Học vị</th>
            <th className="py-3 px-4">Học hàm</th>
            <th className="py-3 px-4">Chức vụ</th>
            <th className="py-3 px-4">Quyền</th>

            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {giangVienList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row.maGiangVien}</td>
              <td className="py-2 px-4">{row.hoDem}</td>
              <td className="py-2 px-4">{row.ten}</td>
              <td className="py-2 px-4">{row?.user?.email}</td>
              <td className="py-2 px-4">{row?.boMon?.tenBoMon}</td>
              <td className="py-2 px-4">{row?.boMon?.khoa?.tenKhoa}</td>
              <td className="py-2 px-4">{row.soDienThoai}</td>
              <td className="py-2 px-4">{row.ngaySinh}</td>
              <td className="py-2 px-4">{row.gioiTinh}</td>
              <td className="py-2 px-4">{row.hocVi}</td>
              <td className="py-2 px-4">{row.hocHam}</td>
              <td className="py-2 px-4">{row.chucVu}</td>
              <td className="py-2 px-4">{row?.user?.roles}</td>

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

export default GiangVienTable;
