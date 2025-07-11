import { useState, useEffect } from "react";
import giangVienService from "../../../../service/GiangVienService";

const HoiDongForm = ({ hoiDong, onChange, onSubmit, onCancel, isEdit, busyGiangVienIds }) => {
  const [giangVienList, setGiangVienList] = useState([]);

  useEffect(() => {
    const fetchGiangVien = async () => {
      try {
        const res = await giangVienService.getAllGiangVienByBoMon();
        setGiangVienList(res.data.result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách giảng viên:", error);
      }
    };
    fetchGiangVien();
  }, []);

  const selectedIds = [
    hoiDong.chuTichId,
    hoiDong.thuKyId,
    hoiDong.uyVien1Id,
    hoiDong.uyVien2Id,
    hoiDong.uyVien3Id,
  ].filter(Boolean);

  const getAvailableGiangVien = (currentId) => {
    return giangVienList.filter(
      (gv) =>
        (!busyGiangVienIds.includes(gv.id) || gv.id === currentId) &&
        (!selectedIds.includes(gv.id) || gv.id === currentId)
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />
      <div className="relative w-3/5 h-4/5 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <form className="max-w-xl mx-auto" onSubmit={onSubmit}>
          <h1 className="text-3xl font-bold text-gray-900 mt-5 mb-8">
            {isEdit ? "Chỉnh sửa hội đồng" : "Đề xuất hội đồng mới"}
          </h1>

          <div className="mb-5">
            <label htmlFor="tenHoiDong" className="block text-sm font-medium text-gray-900">Tên hội đồng</label>
            <input
              type="text"
              id="tenHoiDong"
              name="tenHoiDong"
              value={hoiDong.tenHoiDong || ""}
              onChange={onChange}
              required
              className="block w-full rounded-md px-3 py-1.5 text-base border border-gray-300"
            />
          </div>

          {[
            { label: "Chủ tịch", name: "chuTichId" },
            { label: "Thư ký", name: "thuKyId" },
            { label: "Ủy viên 1", name: "uyVien1Id" },
            { label: "Ủy viên 2", name: "uyVien2Id" },
            { label: "Ủy viên 3", name: "uyVien3Id" },
          ].map(({ label, name }) => (
            <div key={name} className="mb-5">
              <label className="block text-sm font-medium text-gray-900">{label}</label>
              <select
                name={name}
                value={hoiDong[name] || ""}
                onChange={onChange}
                required
                className="block w-full rounded-md px-3 py-1.5 border border-gray-300"
              >
                <option value="">-- Chọn {label.toLowerCase()} --</option>
                {getAvailableGiangVien(hoiDong[name]).map((gv) => (
                  <option key={gv.id} value={gv.id}>
                    {gv.maGiangVien} - {gv.hoDem} {gv.ten}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex flex-row mt-8 gap-3">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
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

export default HoiDongForm;
