
import { useState } from "react";

const DeCuong = () => {
  const [formData, setFormData] = useState({
    tenDeTai: "",
    moTa: "",
    file: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu tới backend sau
    console.log("Dữ liệu nộp:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Nộp Đề Cương Đồ Án</h2>

      {isSubmitted && (
        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded">
          ✅ Bạn đã nộp đề cương thành công!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Tên đề tài</label>
          <input
            type="text"
            name="tenDeTai"
            value={formData.tenDeTai}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mô tả đề tài</label>
          <textarea
            name="moTa"
            value={formData.moTa}
            onChange={handleChange}
            rows={5}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">File đề cương (PDF)</label>
          <input
            type="file"
            name="file"
            accept=".pdf"
            onChange={handleChange}
            required
            className="block"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Nộp đề cương
        </button>
      </form>
    </div>
  );
};

export default DeCuong;
