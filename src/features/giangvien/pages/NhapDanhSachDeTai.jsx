import { useState } from "react";

const NhapDanhSachDeTai = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return;

    console.log("Đã chọn file đề tài:", file.name);
    setUploaded(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Nhập danh sách đề tài sinh viên</h2>

      {uploaded && (
        <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded mb-4">
          ✅ Tải lên thành công!
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleChange}
          className="block w-full border border-gray-300 p-2 rounded cursor-pointer"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Tải lên đề tài
        </button>
      </form>
    </div>
  );
};

export default NhapDanhSachDeTai;
