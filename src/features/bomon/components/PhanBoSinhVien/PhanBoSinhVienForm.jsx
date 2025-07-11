import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const PhanBoSinhVienForm = ({
  sinhVienList,
  hoiDongList,
  selectedHoiDongId,
  setSelectedHoiDongId,
  onCancel,
  onSubmit,
}) => {
  const [selectedLichBaoVeId, setSelectedLichBaoVeId] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const selectedHoiDong = hoiDongList.find((hd) => hd.id === selectedHoiDongId);
  const lichBaoVeList = selectedHoiDong ? selectedHoiDong.lichBaoVeList : [];

  const handleHoiDongChange = (e) => {
    setSelectedHoiDongId(e.target.value);
    setSelectedLichBaoVeId(""); 
  };

  const handleStudentCheckbox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedStudents([...selectedStudents, value]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== value));
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit({
      selectedHoiDongId,
      selectedLichBaoVeId,
      selectedStudents,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-20 z-10" />
      <div className="relative w-3/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <form className="max-w-xl mx-auto" onSubmit={handleSubmitForm}>
          <h1 className="text-2xl font-bold mt-5 mb-10">Phân bổ sinh viên</h1>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-900">Hội đồng</label>
            <div className="mt-2 grid grid-cols-1 relative">
              <select
                value={selectedHoiDongId}
                onChange={handleHoiDongChange}
                className="w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline  outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              >
                <option value="">-- Chọn hội đồng --</option>
                {hoiDongList.map((hd) => (
                  <option key={hd.id} value={hd.id}>
                    {hd.tenHoiDong}
                  </option>
                ))}
              </select>
              <RiArrowDropDownLine className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="sm:col-span-3 mt-5">
            <label className="block text-sm font-medium text-gray-900">Lịch bảo vệ</label>
            <div className="mt-2 grid grid-cols-1 relative">
              <select
                value={selectedLichBaoVeId}
                onChange={(e) => setSelectedLichBaoVeId(e.target.value)}
                className="w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              >
                <option value="">-- Chọn lịch bảo vệ --</option>
                {lichBaoVeList.map((lich) => (
                  <option key={lich.id} value={lich.id}>
                    {`[${lich.maLich}] Ngày: ${lich.ngay}, ${lich.gioBatDau}-${lich.gioKetThuc}, Địa điểm: ${lich.diaDiem}`}
                  </option>
                ))}
              </select>
              <RiArrowDropDownLine className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-900">Chọn sinh viên</label>
            <div className="max-h-40 overflow-y-auto border rounded p-2">
              {sinhVienList.map((sv) => (
                <div key={sv.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={sv.maSinhVien}
                    onChange={handleStudentCheckbox}
                    checked={selectedStudents.includes(sv.maSinhVien)}
                    className="mr-2"
                  />
                  <label>{sv.maSinhVien} - {sv.hoTen}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row mt-8">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-4"
            >
              Gửi phân bổ
            </button>
            <button
              type="button"
              onClick={onCancel}
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

export default PhanBoSinhVienForm;
