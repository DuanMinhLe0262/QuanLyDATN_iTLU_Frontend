import React from "react";

const KhoaForm = ({ khoa, onChange, onSubmit, onCancel, isEdit }) => {
  if (!khoa) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-2/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">

        <form className="max-w-md mx-auto" onSubmit={onSubmit}>

          <h1 className="font-bold text-3xl mb-15 mt-10">
             {isEdit ? "Chỉnh sửa khoa" : "Thêm khoa mới"}
          </h1>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="tenKhoa"
              id="tenKhoa"
              value={khoa.tenKhoa}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:lue-500 focus:outline-none focus:ring-0 focus:lue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="tenKhoa"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tên khoa
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="moTa"
              id="moTa"
              value={khoa.moTa}
              onChange={onChange}
              className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:lue-500 focus:outline-none focus:ring-0 focus:lue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="moTa" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mô tả</label>
          </div>

          <div className="flex flex-row mt-25">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex-3 mr-15"
            >
              {isEdit ? "Cập nhật" : "Thêm"}
            </button>

            <button
              type="button"
              onClick={() => onCancel(false)}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 flex-3"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KhoaForm;
