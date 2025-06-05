import { useState } from "react";

const BaoCao = () => {
  const [formData, setFormData] = useState({
    tieuDe: "",
    loaiBaoCao: "",
    files: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "files") {
      setFormData((prev) => ({
        ...prev,
        files: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu nộp:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Nộp Báo Cáo</h2>

      {isSubmitted && (
        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded">
          ✅ Bạn đã nộp báo cáo thành công!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Tiêu đề báo cáo</label>
          <input
            type="text"
            name="tieuDe"
            value={formData.tieuDe}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Loại báo cáo</label>
          <select
            name="loaiBaoCao"
            value={formData.loaiBaoCao}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          >
            <option value="">-- Chọn loại báo cáo --</option>
            <option value="giuaKy">Báo cáo giữa kỳ</option>
            <option value="cuoiKy">Báo cáo cuối kỳ</option>
            <option value="tienDo">Báo cáo tiến độ</option>
          </select>
        </div>


          <div>
          <label className="block mb-1 font-medium">Chọn file</label>
          <label className="cursor-pointer bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 inline-block">
            Chọn file
            <input
              type="file"
              name="files"
              accept=".pdf"
              multiple
              onChange={handleChange}
              required
              className="hidden"
            />
          </label>
          <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
            {formData.files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
        Nộp báo cáo
        </button>
      </form>
    </div>
  );
};

export default BaoCao;
