import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import giangVienDotService from "../../../../../service/GiangVienDotService";
import SuccessMessage from "../../../../../components/common/SuccessMessage";

const UploadGiangVienThamGia = ({ onCancel, onSuccessUpload  }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | uploading | success | error
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadStatus("idle");
      setErrors([]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus("uploading");
    setErrors([]);

    try {
      const res = await giangVienDotService.uploadExcel(file);
      const result = res.data.result;
      console.log("data add: ", result);

      if (result.errorList && result.errorList.length > 0) {
        setErrors(result.errorList);
        setUploadStatus("error");
      } else {
        setUploadStatus("success");
        setSuccessMessage("Tải file thành công!");
        onSuccessUpload();
      }
    } catch (err) {
      setUploadStatus("error");
      setErrors([{ row: null, message: "Lỗi hệ thống: Không thể kết nối tới máy chủ." }]);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-3/5 h-4/5 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <button onClick={() => onCancel(false)} className="absolute top-4 right-4">
          <ImCancelCircle className="w-6 h-6" />
        </button>

        <h1 className="font-bold text-3xl mb-10 mt-10">
          Tải lên danh sách giảng viên hướng dẫn
        </h1>

        <div className="flex items-center gap-6 text-blue-600 text-sm mb-10">
          <a
            href="/FormDanhSachGVHD.xlsx"
            download
            className="flex items-center gap-1 hover:underline"
          >
            <FaDownload /> Tải file mẫu
          </a>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
            Chọn file (.xlsx, tối đa 10MB)
          </label>
          <input
            id="file_input"
            type="file"
            name="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            required
            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
          />
          {fileName && (
            <p className="mt-2 mb-5 text-sm text-gray-700">File: {fileName}</p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploadStatus === "uploading"}
          className="bg-blue-600 text-white px-4 py-2 mt-15 rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-5"
        >
          {uploadStatus === "uploading" ? "Đang tải lên..." : "Tải lên"}
        </button>

        {uploadStatus === "error" && errors.length > 0 && (
          <div className="mt-4 text-red-600">
            <p><strong>Có lỗi xảy ra:</strong></p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              {errors.map((err, idx) => (
                <li key={idx}>
                  {err.rowIndex ? `Dòng ${err.rowIndex}: ${err.message}` : err.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {successMessage && <SuccessMessage message={successMessage} />}
      </div>
    </div>
  );
};

export default UploadGiangVienThamGia;
