import { RiArrowDropDownLine } from "react-icons/ri";

const PhanBoDeTail = ({
  sinhVienList,
  hoiDongList,
  selectedHoiDongId,
  selectedLichBaoVeId,
  selectedStudents,
  onClose,
}) => {
  const selectedHoiDong = hoiDongList.find((hd) => hd.id === selectedHoiDongId);
  const lichBaoVeList = selectedHoiDong ? selectedHoiDong.lichBaoVeList : [];
  const selectedLich = lichBaoVeList.find((lich) => lich.id === selectedLichBaoVeId);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-20 z-10" />
      <div className="relative w-3/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mt-5 mb-10">Chi tiết phân bổ sinh viên</h1>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-900">Hội đồng</label>
            <p className="mt-2 p-2 bg-gray-100 rounded">{selectedHoiDong?.tenHoiDong || "Không có thông tin"}</p>
          </div>

          <div className="sm:col-span-3 mt-5">
            <label className="block text-sm font-medium text-gray-900">Lịch bảo vệ</label>
            <p className="mt-2 p-2 bg-gray-100 rounded">
              {selectedLich
                ? `[${selectedLich.maLich}] Ngày: ${selectedLich.ngay}, ${selectedLich.gioBatDau}-${selectedLich.gioKetThuc}, Địa điểm: ${selectedLich.diaDiem}`
                : "Không có thông tin"}
            </p>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-900 mb-3">Danh sách sinh viên</label>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Mã sinh viên</th>
                    <th className="py-3 px-4">Họ</th>
                    <th className="py-3 px-4">Tên</th>
                    <th className="py-3 px-4">Lớp</th>
                    <th className="py-3 px-4">Số điện thoại</th>
                    <th className="py-3 px-4">Tên đề tài</th>
                  </tr>
                </thead>
                <tbody>
                  {sinhVienList
                    .filter((sv) => selectedStudents.includes(sv.maSinhVien))
                    .map((sv, index) => (
                      <tr key={sv.id} className="border-t hover:bg-gray-100">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{sv.maSinhVien}</td>
                        <td className="py-2 px-4">{sv.hoDem || "-"}</td>
                        <td className="py-2 px-4">{sv.ten || "-"}</td>
                        <td className="py-2 px-4">{sv.lop?.tenLop || "-"}</td>
                        <td className="py-2 px-4">{sv.soDienThoai || "-"}</td>
                        <td className="py-2 px-4">{sv.deTai?.tenDeTai || "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-row mt-8">
            <button
              type="button"
              onClick={onClose}
              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhanBoDeTail;
