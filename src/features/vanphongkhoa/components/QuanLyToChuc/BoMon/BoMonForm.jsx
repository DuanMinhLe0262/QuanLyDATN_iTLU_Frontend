import React, { useEffect, useState } from "react";
import khoaService from "../../../../../service/KhoaService";

const BoMonForm = ({ boMon, onChange, onSubmit, onCancel, isEdit }) => {
  const [danhSachKhoa, setDanhSachKhoa] = useState([]);

  useEffect(() => {

    fetchKhoa();
  }, []);

  const fetchKhoa = async () => {
    try {
      const res = await khoaService.getAllKhoa();
      setDanhSachKhoa(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách khoa:", error);
    }
  };

  if (!boMon) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-2/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
          <h1 className="font-bold text-3xl mb-10 mt-10">
            {isEdit ? "Chỉnh sửa bộ môn" : "Thêm bộ môn mới"}
          </h1>

          {/* Tên bộ môn */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="tenBoMon"
              id="tenBoMon"
              value={boMon.tenBoMon}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="tenBoMon"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tên bộ môn
            </label>
          </div>

          {/* Mô tả */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="moTa"
              id="moTa"
              value={boMon.moTa}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="moTa"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mô tả
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="khoaId"
              className="block mb-2 text-sm font-medium text-gray-500"
            >
              Chọn Khoa
            </label>
            <select
              id="khoaId"
              name="khoaId"
              value={boMon.khoaId || ""}
              onChange={onChange}
              required
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5"
            >
              <option value="">-- Chọn khoa --</option>
              {danhSachKhoa.map((khoa) => (
                <option key={khoa.id} value={khoa.id}>
                  {khoa.tenKhoa}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {isEdit ? "Cập nhật" : "Thêm"}
            </button>

            <button
              type="button"
              onClick={() => onCancel(false)}
              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoMonForm;
