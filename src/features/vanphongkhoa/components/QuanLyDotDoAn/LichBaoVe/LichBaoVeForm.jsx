import { RiArrowDropDownLine } from "react-icons/ri";

const LichBaoVeForm = ({ lich, onChange, onSubmit, onCancel, isEdit, hoiDongList }) => {
  if (!lich) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-3/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">

        <form className="max-w-xl mx-auto" onSubmit={onSubmit}>

          <div className="pb-12">
            <h1 className="text-3xl font-bold text-gray-900 mt-5 mb-10">
              {isEdit ? "Chỉnh sửa lịch bảo vệ" : "Thêm lịch bảo vệ"}
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="hoiDongId" className="block text-sm font-medium text-gray-900">Hội đồng</label>
                <div className="mt-2 relative">
                  <select
                    id="hoiDongId"
                    name="hoiDongId"
                    value={lich.hoiDongId || ""}
                    onChange={onChange}
                    className="block w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  >
                    <option value="">-- Chọn hội đồng --</option>
                    {hoiDongList.map((hd) => (
                      <option key={hd.id} value={hd.id}>
                        {hd.tenHoiDong}
                      </option>
                    ))}
                  </select>
                  <RiArrowDropDownLine className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div>
                <label htmlFor="diaDiem" className="block text-sm font-medium text-gray-900">Địa điểm</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="diaDiem"
                    id="diaDiem"
                    value={lich.diaDiem || ""}
                    onChange={onChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ngay" className="block text-sm font-medium text-gray-900">Ngày</label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="ngay"
                    id="ngay"
                    value={lich.ngay || ""}
                    onChange={onChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div>
                <label htmlFor="gioBatDau" className="block text-sm font-medium text-gray-900">Giờ bắt đầu</label>
                <div className="mt-2">
                  <input
                    type="time"
                    name="gioBatDau"
                    id="gioBatDau"
                    value={lich.gioBatDau || ""}
                    onChange={onChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gioKetThuc" className="block text-sm font-medium text-gray-900">Giờ kết thúc</label>
                <div className="mt-2">
                  <input
                    type="time"
                    name="gioKetThuc"
                    id="gioKetThuc"
                    value={lich.gioKetThuc || ""}
                    onChange={onChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row mt-8 gap-3">
            <button
              type="submit"
              className="flex-1 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isEdit ? "Cập nhật" : "Thêm"}
            </button>

            <button
              type="button"
              onClick={() => onCancel(false)}
              className="flex-1 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LichBaoVeForm;
