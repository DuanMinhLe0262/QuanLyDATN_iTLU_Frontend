import { useState, useEffect } from "react";
import lopService from "../../../../../service/LopService";
import dotService from "../../../../../service/DotDoAnService";

const SinhVienForm = ({ sinhVien, onChange, onSubmit, onCancel, isEdit }) => {
  const [danhSachLop, setDanhSachLop] = useState([]);
  const [danhSachDot, setDanhSachDot] = useState([]);

  useEffect(() => {

    fetchLop();
    fetchDot();
  }, []);

  const fetchLop = async () => {
    try {
      const res = await lopService.getAllLop();
      setDanhSachLop(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách khoa:", error);
    }
  };

  const fetchDot = async () => {
    try {
      const res = await dotService.getAllDotDoAn();
      setDanhSachDot(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách khoa:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-2/5 h-4/5 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
          <h1 className="font-bold text-3xl mb-15 mt-10">
            {isEdit ? "Chỉnh sửa sinh viên" : "Thêm sinh viên mới"}
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
              required/>
            <label
              htmlFor="maSinhVien"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Mã sinh viên
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="hoDem"
              id="hoDem"
              value={sinhVien.hoDem}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required/>
            <label
              htmlFor="hoDem"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Họ đệm
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="ten"
              id="ten"
              value={sinhVien.ten}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required/>
            <label
              htmlFor="ten"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tên
            </label>
          </div>

          <div className={`relative z-0 w-full mb-5 group ${isEdit ? 'hidden' : 'block'}`}>
            <input
              type="email"
              name="email"
              id="email"
              value={sinhVien.email}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required/>
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="soDienThoai"
              id="soDienThoai"
              value={sinhVien.soDienThoai}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required/>
            <label
              htmlFor="soDienThoai"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Số điện thoại
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="ngaySinh"
              id="ngaySinh"
              value={sinhVien.ngaySinh}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required/>
            <label
              htmlFor="ngaySinh"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Ngày sinh
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <select
              name="gioiTinh"
              id="gioiTinh"
              value={sinhVien.gioiTinh}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required>
              <option value="">-- Chọn giới tính --</option>
              <option value="NAM">Nam</option>
              <option value="NU">Nữ</option>
              <option value="KHAC">Khác</option>
            </select>
            <label
              htmlFor="gioiTinh"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Giới tính
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="diaChi"
              id="diaChi"
              value={sinhVien.diaChi}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required/>
            <label
              htmlFor="diaChi"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Địa chỉ
            </label>
          </div>


          <div className="flex gap-4">

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="lopId"
                className="block mb-2 text-sm font-medium text-gray-500">
                Chọn lớp
              </label>
              <select
                id="lopId"
                name="lopId"
                value={sinhVien.lopId || ""}
                onChange={onChange}
                required
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5">
                <option value="">----</option>
                {danhSachLop.map((lop) => (
                  <option key={lop.id} value={lop.id}>
                    {lop.moTa}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="dotId"
                className="block mb-2 text-sm font-medium text-gray-500">
                Chọn đợt
              </label>
              <select
                id="dotId"
                name="dotId"
                value={sinhVien.dotId || ""}
                onChange={onChange}
                required
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5">
                <option value="">----</option>
                {danhSachDot.map((dot) => (
                  <option key={dot.id} value={dot.id}>
                    {dot.tenDot}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
              {isEdit ? "Cập nhật" : "Thêm"}
            </button>

            <button
              type="button"
              onClick={() => onCancel(false)}
              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SinhVienForm;
