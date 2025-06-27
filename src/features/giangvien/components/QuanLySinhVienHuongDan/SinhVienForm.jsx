import { useState, useEffect } from "react";
import sinhVienHuongDanService from "../../../../service/SinhVienHuongdanService";

const SinhVienForm = ({ sinhVien, onChange, onSubmit, onCancel, isEdit }) => {


  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-2/5 h-4/5 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
          <h1 className="font-bold text-3xl mb-15 mt-10">
            {isEdit ? "Chỉnh sửa sinh viên" : "Thêm sinh viên hướng dẫn"}
          </h1>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="maSinhVien"
              id="maSinhVien"
              value={sinhVien.maSinhVien}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="maSinhVien"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mã sinh viên
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="maGiangVien"
              id="maGiangVien"
              value={sinhVien.maGiangVien}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="maGiangVien"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mã giảng viên
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="vaiTroHuongDan"
              className="block mb-2 text-sm font-medium text-gray-500"
            >
              Vai trò hướng dẫn
            </label>
            <select
              id="vaiTroHuongDan"
              name="vaiTroHuongDan"
              value={sinhVien.vaiTroHuongDan || ""}
              onChange={onChange}
              required
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
            >
              <option value="">-- Chọn vai trò --</option>
              <option value="GVHD_1">GVHD_1</option>
              <option value="GVHD_2">GVHD_2</option>
            </select>
          </div>


          <div className="flex gap-4 mt-22">
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

export default SinhVienForm;
