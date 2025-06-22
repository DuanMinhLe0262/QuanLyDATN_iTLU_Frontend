import { useState, useEffect } from "react";
import nganhService from "../../../../../service/NganhService";

const LopForm = ({ lop, onChange, onSubmit, onCancel, isEdit }) => {

  const [danhSachNganh, setDanhSachNganh] = useState([]);

  useEffect(() => {

    fetchNganh();
  }, []);

  const fetchNganh = async () => {
    try {
      const res = await nganhService.getAllNganh();
      setDanhSachNganh(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách khoa:", error);
    }
  };
  if (!lop) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-2/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">

        <form className="max-w-md mx-auto" onSubmit={onSubmit}>

          <h1 className="font-bold text-3xl mb-15 mt-10">
            {isEdit ? "Chỉnh sửa lớp" : "Thêm lớp mới"}
          </h1>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="tenLop"
              id="tenLop"
              value={lop.tenLop}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:lue-500 focus:outline-none focus:ring-0 focus:lue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="tenLop"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tên lớp
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="moTa"
              id="moTa"
              value={lop.moTa}
              onChange={onChange}
              className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:lue-500 focus:outline-none focus:ring-0 focus:lue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="moTa" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mô tả</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="khoaHoc"
              id="khoaHoc"
              value={lop.khoaHoc}
              onChange={onChange}
              className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:lue-500 focus:outline-none focus:ring-0 focus:lue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="khoaHoc" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Khóa học</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="nganhId"
              className="block mb-2 text-sm font-medium text-gray-500"
            >
              Chọn ngành
            </label>
            <select
              id="nganhId"
              name="nganhId"
              value={lop.nganhId || ""}
              onChange={onChange}
              required
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5"
            >
              <option value="">-- Chọn ngành --</option>
              {danhSachNganh.map((nganh) => (
                <option key={nganh.id} value={nganh.id}>
                  {nganh.tenNganh}
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

export default LopForm;
