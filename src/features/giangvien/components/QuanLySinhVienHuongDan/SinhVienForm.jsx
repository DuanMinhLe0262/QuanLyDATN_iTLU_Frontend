
import { RiArrowDropDownLine } from "react-icons/ri";

const SinhVienForm = ({ sinhVien, onChange, onSubmit, onCancel, isEdit }) => {


  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-2/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
          <h1 className="font-bold text-3xl mb-15 mt-10">
            {isEdit ? "Chỉnh sửa sinh viên" : "Thêm sinh viên hướng dẫn"}
          </h1>

          <div>
            <label htmlFor="maSinhVien" className="block text-sm/6 font-medium text-gray-900">Mã sinh viên</label>
            <div className="mt-2">
              <input

                type="text"
                name="maSinhVien"
                id="maSinhVien"
                value={sinhVien.maSinhVien || ""}
                onChange={onChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div className="sm:col-span-3 mt-10">
            <label htmlFor="vaiTroHuongDan" className="block text-sm/6 font-medium text-gray-900">Vai trò hướng dẫn</label>
            <div className="mt-2 grid grid-cols-1">
              <select

                type="text"
                name="vaiTroHuongDan"
                id="vaiTroHuongDan"
                value={sinhVien.vaiTroHuongDan || ""}
                onChange={onChange}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option value="">-- Chọn vai trò --</option>
                <option value={"GVHD_1"}>GVHD 1</option>
                <option value={"GVHD_2"}>GVHD 2</option>
              </select>
              <RiArrowDropDownLine className="w-5 h-5 pointer-events-none col-start-1 row-start-1 mr-2  self-center justify-self-end text-gray-500 sm:size-4" />
            </div>
          </div>


          <div className="flex flex-row mt-20">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  px-5 py-2.5 text-center  flex-3 mr-15">
              {isEdit ? "Cập nhật" : "Thêm"}
            </button>

            <button
              type="button"
              onClick={() => onCancel(false)}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  flex-3">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SinhVienForm;
