import { useState } from "react";

const NhapDanhSachSinhVien = () => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    // Gửi file lên server ở đây
    console.log("File gửi:", file.name);
    setSuccess(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Nhập danh sách sinh viên hướng dẫn</h2>

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded mb-4">
          ✅ Tải file thành công!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 p-2 rounded cursor-pointer"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tải lên
        </button>
      </form>
    </div>
  );
};

export default NhapDanhSachSinhVien;
