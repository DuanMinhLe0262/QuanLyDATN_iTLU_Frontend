import { useState } from "react";
import { FaCalendarPlus, FaTrash } from "react-icons/fa";

const LichBaoVe = () => {
  const [dot, setDot] = useState("");
  const [ngay, setNgay] = useState("");
  const [gio, setGio] = useState("");
  const [phong, setPhong] = useState("");
  const [hoiDong, setHoiDong] = useState("");
  const [lich, setLich] = useState([
    {
      id: 1,
      dot: "Đợt 1 - HK2 2024",
      ngay: "2024-06-20",
      gio: "08:00",
      phong: "P201",
      hoiDong: "Hội đồng A",
    },
  ]);

  const handleAddSchedule = () => {
    if (!dot || !ngay || !gio || !phong || !hoiDong) return alert("Vui lòng nhập đầy đủ thông tin!");

    const newSchedule = {
      id: Date.now(),
      dot,
      ngay,
      gio,
      phong,
      hoiDong,
    };
    setLich([...lich, newSchedule]);

    // Reset form
    setNgay(""); setGio(""); setPhong(""); setHoiDong("");
  };

  const handleDelete = (id) => {
    setLich(lich.filter((l) => l.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lập lịch bảo vệ</h2>

      {/* Form tạo lịch */}
      <div className="p-4 mb-6 border border-gray-300 rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium text-sm">Chọn đợt đồ án</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={dot}
              onChange={(e) => setDot(e.target.value)}
            >
              <option value="">-- Chọn đợt --</option>
              <option value="Đợt 1 - HK2 2024">Đợt 1 - HK2 2024</option>
              <option value="Đợt 2 - HK1 2025">Đợt 2 - HK1 2025</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Ngày bảo vệ</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={ngay}
              onChange={(e) => setNgay(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Giờ bắt đầu</label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={gio}
              onChange={(e) => setGio(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Phòng</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={phong}
              onChange={(e) => setPhong(e.target.value)}
              placeholder="VD: P201"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Hội đồng</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={hoiDong}
              onChange={(e) => setHoiDong(e.target.value)}
              placeholder="VD: Hội đồng A"
            />
          </div>
        </div>

        <button
          onClick={handleAddSchedule}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center"
        >
          <FaCalendarPlus className="mr-2" />
          Thêm lịch
        </button>
      </div>

      {/* Danh sách lịch đã tạo */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left border-b">#</th>
              <th className="py-3 px-4 text-left border-b">Đợt</th>
              <th className="py-3 px-4 text-left border-b">Ngày</th>
              <th className="py-3 px-4 text-left border-b">Giờ</th>
              <th className="py-3 px-4 text-left border-b">Phòng</th>
              <th className="py-3 px-4 text-left border-b">Hội đồng</th>
              <th className="py-3 px-4 text-center border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {lich.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{item.dot}</td>
                <td className="py-2 px-4 border-b">{item.ngay}</td>
                <td className="py-2 px-4 border-b">{item.gio}</td>
                <td className="py-2 px-4 border-b">{item.phong}</td>
                <td className="py-2 px-4 border-b">{item.hoiDong}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {lich.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Chưa có lịch bảo vệ nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LichBaoVe;
