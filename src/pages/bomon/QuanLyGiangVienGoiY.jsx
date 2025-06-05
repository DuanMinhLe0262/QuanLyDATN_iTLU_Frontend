import { useState } from "react";

const QuanLyGiangVienGoiY = () => {
  const [giangViens, setGiangViens] = useState([
    { id: 1, hoTen: "Nguyễn Văn A", email: "a@example.com", linhVuc: "Công nghệ phần mềm" },
    { id: 2, hoTen: "Trần Thị B", email: "b@example.com", linhVuc: "AI" },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGV, setCurrentGV] = useState({ id: null, hoTen: "", email: "", linhVuc: "" });

  const openForm = (gv = { id: null, hoTen: "", email: "", linhVuc: "" }) => {
    setCurrentGV(gv);
    setIsEditing(!!gv.id);
    setFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGV((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditing) {
      setGiangViens((prev) =>
        prev.map((gv) => (gv.id === currentGV.id ? currentGV : gv))
      );
    } else {
      setGiangViens((prev) => [
        ...prev,
        { ...currentGV, id: Date.now() },
      ]);
    }
    setFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      setGiangViens((prev) => prev.filter((gv) => gv.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý giảng viên gợi ý</h1>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Thêm giảng viên
        </button>
      </div>

      <table className="w-full table-auto border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border">Họ tên</th>
            <th className="p-3 text-left border">Email</th>
            <th className="p-3 text-left border">Lĩnh vực</th>
            <th className="p-3 text-center border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {giangViens.map((gv) => (
            <tr key={gv.id} className="hover:bg-gray-50">
              <td className="p-3 border">{gv.hoTen}</td>
              <td className="p-3 border">{gv.email}</td>
              <td className="p-3 border">{gv.linhVuc}</td>
              <td className="p-3 border text-center space-x-2">
                <button
                  onClick={() => openForm(gv)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(gv.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {giangViens.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Không có giảng viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Sửa giảng viên" : "Thêm giảng viên"}
            </h2>

            <div className="mb-4">
              <label className="block font-medium mb-1">Họ tên</label>
              <input
                type="text"
                name="hoTen"
                value={currentGV.hoTen}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={currentGV.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Lĩnh vực</label>
              <input
                type="text"
                name="linhVuc"
                value={currentGV.linhVuc}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isEditing ? "Lưu thay đổi" : "Thêm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyGiangVienGoiY;
