import React from "react";
import { ImCancelCircle } from "react-icons/im";

const FormChiTietDeTai = ({ deTai, onCancel }) => {
  if (!deTai) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-3/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <button onClick={() => onCancel(false)} className="absolute top-4 right-4">
          <ImCancelCircle className="w-6 h-6" />
        </button>

        <form className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mt-5 mb-8 text-center">
            Chi tiết đề tài
          </h1>

          <div className="mb-5">
            <label htmlFor="tenDeTai" className="block text-sm font-medium text-gray-900">
              Tên đề tài
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="tenDeTai"
                id="tenDeTai"
                value={deTai.tenDeTai || ""}
                readOnly
                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-none border border-gray-300 placeholder:text-gray-400 sm:text-sm"
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="moTa" className="block text-sm font-medium text-gray-900">
              Mô tả đề tài
            </label>
            <textarea
              name="moTa"
              id="moTa"
              value={deTai.moTa || ""}
              readOnly
              rows={5}
              className="w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-900 outline-none border border-gray-300 placeholder:text-gray-400 sm:text-sm"
            ></textarea>
          </div>

          <div className="mb-5">
            <label htmlFor="sinhVien" className="block text-sm font-medium text-gray-900">
              Sinh viên thực hiện
            </label>
            <input
              type="text"
              name="sinhVien"
              id="sinhVien"
              value={`${deTai?.sinhVienDot?.sinhVien?.hoDem || ""} ${deTai?.sinhVienDot?.sinhVien?.ten || ""}`}
              readOnly
              className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-none border border-gray-300 placeholder:text-gray-400 sm:text-sm"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="lop" className="block text-sm font-medium text-gray-900">
              Lớp
            </label>
            <input
              type="text"
              name="lop"
              id="lop"
              value={deTai?.sinhVienDot?.sinhVien?.lop?.tenLop || ""}
              readOnly
              className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-none border border-gray-300 placeholder:text-gray-400 sm:text-sm"
            />
          </div>
    
        </form>
      </div>
    </div>
  );
};

export default FormChiTietDeTai;
