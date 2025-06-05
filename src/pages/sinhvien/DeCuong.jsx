import { useState } from "react";

const DeCuong = () => {
  const [formData, setFormData] = useState({
    tenDeTai: "",
    moTa: "",
    files: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.files.length === 0) {
      alert("Vui lòng chọn ít nhất một file PDF!");
      return;
    }

    for (let file of formData.files) {
      if (file.type !== "application/pdf") {
        alert(`File "${file.name}" không phải là PDF.`);
        return;
      }
    }

    const data = new FormData();
    data.append("tenDeTai", formData.tenDeTai);
    data.append("moTa", formData.moTa);
    formData.files.forEach((file) => {
      data.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:8080/upload-files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("Upload thất bại!");
      }

      setIsSubmitted(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi upload file.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Nộp Đề Cương Đồ Án</h2>

      {isSubmitted && (
        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded">
          ✅ Bạn đã nộp đề cương thành công!
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded">
          ❌ {error}
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
          <label className="block mb-1 font-medium">Chọn file (có thể chọn nhiều)</label>
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
          Nộp đề cương
        </button>
      </form>
    </div>
  );
};

export default DeCuong;
