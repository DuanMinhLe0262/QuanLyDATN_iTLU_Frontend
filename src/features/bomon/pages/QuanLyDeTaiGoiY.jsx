import { useState } from "react";

const QuanLyDeTaiGoiY = () => {
  const [deTais, setDeTais] = useState([
    { id: 1, ten: "Hệ thống quản lý sinh viên", moTa: "Ứng dụng React và Spring Boot" },
    { id: 2, ten: "Ứng dụng AI trong giáo dục", moTa: "Dự đoán kết quả học tập" },
  ]);
  const [formOpen, setFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDeTai, setCurrentDeTai] = useState({ id: null, ten: "", moTa: "" });

  const openForm = (deTai = { id: null, ten: "", moTa: "" }) => {
    setCurrentDeTai(deTai);
    setIsEditing(!!deTai.id);
    setFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDeTai((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditing) {
      setDeTais((prev) =>
        prev.map((dt) => (dt.id === currentDeTai.id ? currentDeTai : dt))
      );
    } else {
      setDeTais((prev) => [
        ...prev,
        { ...currentDeTai, id: Date.now() },
      ]);
    }
    setFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      setDeTais((prev) => prev.filter((dt) => dt.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý đề tài gợi ý</h1>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Thêm đề tài
        </button>
      </div>

      <table className="w-full table-auto border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border">Tên đề tài</th>
            <th className="p-3 text-left border">Mô tả</th>
            <th className="p-3 text-center border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {deTais.map((deTai) => (
            <tr key={deTai.id} className="hover:bg-gray-50">
              <td className="p-3 border">{deTai.ten}</td>
              <td className="p-3 border">{deTai.moTa}</td>
              <td className="p-3 border text-center space-x-2">
                <button
                  onClick={() => openForm(deTai)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(deTai.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {deTais.length === 0 && (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                Không có đề tài nào.
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
              {isEditing ? "Sửa đề tài" : "Thêm đề tài"}
            </h2>

            <div className="mb-4">
              <label className="block font-medium mb-1">Tên đề tài</label>
              <input
                type="text"
                name="ten"
                value={currentDeTai.ten}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Mô tả</label>
              <textarea
                name="moTa"
                value={currentDeTai.moTa}
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

export default QuanLyDeTaiGoiY;
