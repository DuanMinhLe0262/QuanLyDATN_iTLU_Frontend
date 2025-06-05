import { useState } from "react";

const PhanBoHoiDong = () => {
  const [sinhViens] = useState([
    { id: 1, ten: "Nguyễn Văn A", deTai: "Xây dựng hệ thống quản lý sinh viên" },
    { id: 2, ten: "Trần Thị B", deTai: "Ứng dụng Machine Learning trong y tế" },
  ]);

  const [hoiDongs] = useState([
    { id: 1, ten: "Hội đồng 1" },
    { id: 2, ten: "Hội đồng 2" },
  ]);

  const [phanBo, setPhanBo] = useState({});

  const handleChange = (sinhVienId, hoiDongId) => {
    setPhanBo((prev) => ({
      ...prev,
      [sinhVienId]: hoiDongId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Kết quả phân bổ:", phanBo);
    alert("✅ Đã phân bổ sinh viên vào hội đồng thành công!");
    // Gửi dữ liệu phân bổ lên backend tại đây
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow p-6 mt-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Phân Bổ Sinh Viên Vào Hội Đồng Chấm</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {sinhViens.map((sv) => (
          <div
            key={sv.id}
            className="border p-4 rounded-md flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="mb-2 md:mb-0">
              <p className="font-medium">{sv.ten}</p>
              <p className="text-sm text-gray-600">Đề tài: {sv.deTai}</p>
            </div>

            <select
              className="border px-4 py-2 rounded-md"
              value={phanBo[sv.id] || ""}
              onChange={(e) => handleChange(sv.id, e.target.value)}
              required
            >
              <option value="">-- Chọn hội đồng --</option>
              {hoiDongs.map((hd) => (
                <option key={hd.id} value={hd.id}>
                  {hd.ten}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Lưu phân bổ
        </button>
      </form>
    </div>
  );
};

export default PhanBoHoiDong;
