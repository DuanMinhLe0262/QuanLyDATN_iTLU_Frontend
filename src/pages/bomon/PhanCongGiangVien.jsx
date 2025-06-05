import { useState } from "react";

const PhanCongGiangVien = () => {
  // Danh sách giả định - bạn nên thay bằng API từ backend
  const [sinhViens, setSinhViens] = useState([
    { id: 1, hoTen: "Nguyễn Văn A", maSV: "SV001", giangVienId: null },
    { id: 2, hoTen: "Trần Thị B", maSV: "SV002", giangVienId: null },
  ]);

  const giangViens = [
    { id: 101, hoTen: "ThS. Lê Văn Giảng" },
    { id: 102, hoTen: "TS. Nguyễn Thị Hướng Dẫn" },
  ];

  const handleChangeGV = (sinhVienId, gvId) => {
    setSinhViens((prev) =>
      prev.map((sv) =>
        sv.id === sinhVienId ? { ...sv, giangVienId: Number(gvId) } : sv
      )
    );
  };

  const handleSave = () => {
    console.log("Phân công giảng viên:", sinhViens);
    alert("Phân công đã được lưu!");
    // Gửi dữ liệu sinhViens lên server qua API nếu có
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Phân công giảng viên hướng dẫn</h1>

      <table className="w-full border border-gray-300 rounded shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border">Mã SV</th>
            <th className="p-3 text-left border">Họ tên sinh viên</th>
            <th className="p-3 text-left border">Giảng viên hướng dẫn</th>
          </tr>
        </thead>
        <tbody>
          {sinhViens.map((sv) => (
            <tr key={sv.id} className="hover:bg-gray-50">
              <td className="p-3 border">{sv.maSV}</td>
              <td className="p-3 border">{sv.hoTen}</td>
              <td className="p-3 border">
                <select
                  value={sv.giangVienId || ""}
                  onChange={(e) => handleChangeGV(sv.id, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">-- Chọn giảng viên --</option>
                  {giangViens.map((gv) => (
                    <option key={gv.id} value={gv.id}>
                      {gv.hoTen}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          💾 Lưu phân công
        </button>
      </div>
    </div>
  );
};

export default PhanCongGiangVien;
