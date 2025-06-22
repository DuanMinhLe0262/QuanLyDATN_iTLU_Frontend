import { useState, useEffect } from "react";
import axios from "axios";

import SuccessMessage from "../../../components/common/SuccessMessage"

const DeCuong = () => {

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    tenDeTai: "",
    moTa: "",
    file: null,
  });

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
        alert("File phải nhỏ hơn 10MB!");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        file: selectedFile,
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

    if (!formData.file) {
      alert("Vui lòng chọn một file để nộp!");
      return;
    }

    try {
      // 1. Upload file lên server
      const data = new FormData();
      data.append("file", formData.file);

      const uploadRes = await axios.post("http://localhost:8080/files/upload", data, {
        withCredentials: true
      });

      console.log("dataUrl: ", uploadRes.data);

      const fileUrl = uploadRes.data; // server trả về URL đã lưu
            console.log("dataUrl: ", fileUrl);

      const taiLieu = {
        tenDeTai: formData.tenDeTai,
        moTa: formData.moTa,
        fileUrl: fileUrl,
        loai: "DE_CUONG",
        lanNop: 1
      };

      const uploadTaiLieu = await axios.post("http://localhost:8080/tailieu", taiLieu, {
        withCredentials: true,
      });
      setSuccessMessage("Nộp đề cương thành công");

      console.log("data: ", uploadTaiLieu.data);
      setFormData({
        tenDeTai: "",
        moTa: "",
        file: null,
      });

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi nộp đề cương.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Nộp Đề Cương Đồ Án</h2>

      {successMessage && <SuccessMessage message={successMessage} />}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Tên đề tài
          </label>
          <input
            type="text"
            name="tenDeTai"
            value={formData.tenDeTai}
            onChange={handleChange}
            required
            placeholder="Nhập tên đề tài"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Chọn file (tối đa 10MB)</label>
          <input
            id="file_input"
            type="file"
            name="file"
            accept="*/*"
            onChange={handleChange}
            required
            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
          />
          {formData.file && (
            <p className="mt-2 text-sm text-gray-700">File: {formData.file.name}</p>
          )}

        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Nộp đề cương
        </button>
      </form>
    </div>
  );
};

export default DeCuong;
