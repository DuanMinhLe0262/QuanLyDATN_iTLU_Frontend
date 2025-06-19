import { useState } from "react";

const DeXuatHoiDong = () => {
  const [deTais] = useState([
    { id: 1, ten: "Xây dựng hệ thống quản lý đồ án tốt nghiệp" },
    { id: 2, ten: "Ứng dụng AI trong xử lý ảnh y tế" },
  ]);

  const [giangViens] = useState([
    { id: 1, ten: "TS. Nguyễn Văn A" },
    { id: 2, ten: "TS. Trần Thị B" },
    { id: 3, ten: "ThS. Lê Văn C" },
    { id: 4, ten: "PGS. TS. Phạm Văn D" },
  ]);

  const [form, setForm] = useState({
    deTaiId: "",
    chuTich: "",
    phanBien: "",
    uyVien: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi đề xuất về backend
    console.log("Đề xuất hội đồng:", form);
    alert("✅ Đã gửi đề xuất hội đồng chấm!");
    setForm({
      deTaiId: "",
      chuTich: "",
      phanBien: "",
      uyVien: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 mt-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Đề Xuất Hội Đồng Chấm</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Chọn đề tài</label>
          <select
            name="deTaiId"
            value={form.deTaiId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">-- Chọn đề tài --</option>
            {deTais.map((dt) => (
              <option key={dt.id} value={dt.id}>
                {dt.ten}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Chủ tịch hội đồng</label>
          <select
            name="chuTich"
            value={form.chuTich}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">-- Chọn giảng viên --</option>
            {giangViens.map((gv) => (
              <option key={gv.id} value={gv.id}>
                {gv.ten}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Phản biện</label>
          <select
            name="phanBien"
            value={form.phanBien}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">-- Chọn giảng viên --</option>
            {giangViens.map((gv) => (
              <option key={gv.id} value={gv.id}>
                {gv.ten}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ủy viên</label>
          <select
            name="uyVien"
            value={form.uyVien}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">-- Chọn giảng viên --</option>
            {giangViens.map((gv) => (
              <option key={gv.id} value={gv.id}>
                {gv.ten}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Gửi đề xuất
        </button>
      </form>
    </div>
  );
};

export default DeXuatHoiDong;
