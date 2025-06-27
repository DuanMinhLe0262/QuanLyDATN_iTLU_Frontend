import React from "react";

const FormDangKyDeTai = ({ deTai, onChange, onSubmit, onCancel, isEdit }) => {
  if (!deTai) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-full max-w-lg bg-white rounded-xl z-50 p-6 shadow-lg">
        <form className="space-y-6" onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold text-center mb-4">
            {isEdit ? "Chỉnh sửa đề tài" : "Đăng ký đề tài"}
          </h1>

          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="tenDeTai"
              id="tenDeTai"
              value={deTai.tenDeTai}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="tenDeTai"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tên đề tài
            </label>
          </div>

          <div className="relative z-0 w-full group">
            <label
              htmlFor="moTa"
              className="text-gray-700 text-xs"
            >
              Mô tả
            </label>
            <textarea
              name="moTa"
              id="moTa"
              value={deTai.moTa}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              required
            />


          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEdit ? "Cập nhật" : "Gửi đăng ký"}
            </button>
            <button
              type="button"
              onClick={() => onCancel(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDangKyDeTai;
