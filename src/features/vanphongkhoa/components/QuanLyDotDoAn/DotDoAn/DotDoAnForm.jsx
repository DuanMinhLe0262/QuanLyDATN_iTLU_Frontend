import { RiArrowDropDownLine } from "react-icons/ri";

const DotDoAnForm = ({ dotDoAn, onChange, onSubmit, onCancel, isEdit }) => {
  if (!dotDoAn) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-3/7 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">

        <form className="max-w-md mx-auto" onSubmit={onSubmit}>

          <div className="pb-12">
            <h1 className="text-3xl font-bold text-gray-900 mt-5 mb-10">
              {isEdit ? "Chỉnh sửa đợt" : "Thêm đợt mới"}
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-3">
                <label htmlFor="maDot" className="block text-sm/6 font-medium text-gray-900">Mã đợt</label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="maDot"
                    name="maDot"
                    required
                    value={dotDoAn.maDot || ""}
                    onChange={onChange}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    <option value="">-- Chọn mã đợt --</option>
                    <option value={"DOT_1"}>DOT_1</option>
                    <option value={"DOT_2"}>DOT_2</option>
                  </select>
                  <RiArrowDropDownLine className="w-5 h-5 pointer-events-none col-start-1 row-start-1 mr-2  self-center justify-self-end text-gray-500 sm:size-4" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="tenDot" className="block text-sm/6 font-medium text-gray-900">Tên đợt</label>
                <div className="mt-2">
                  <input

                    type="text"
                    name="tenDot"
                    id="tenDot"
                    required
                    value={dotDoAn.tenDot || ""}
                    onChange={onChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="namHoc" className="block text-sm/6 font-medium text-gray-900">Năm học</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="namHoc"
                    id="namHoc"
                    required
                    value={dotDoAn.namHoc || ""}
                    onChange={onChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
              </div>

            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-3">
                <label htmlFor="thoiGianBatDau" className="block text-sm/6 font-medium text-gray-900">Thời gian bắt đầu</label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="thoiGianBatDau"
                    id="thoiGianBatDau"
                    required
                    value={dotDoAn.thoiGianBatDau || ""}
                    onChange={onChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="thoiGianKetThuc" className="block text-sm/6 font-medium text-gray-900">Thời gian kết thúc</label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="thoiGianKetThuc"
                    id="thoiGianKetThuc"
                    required
                    value={dotDoAn.thoiGianKetThuc || ""}
                    onChange={onChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
              </div>

            </div>
          </div>

          <div className="flex flex-row mt-10">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  px-5 py-2.5 text-center  flex-3 mr-15"
            >
              {isEdit ? "Cập nhật" : "Thêm"}
            </button>

            <button
              type="button"
              onClick={() => onCancel(false)}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  flex-3"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DotDoAnForm;