import { useState, useEffect } from "react";
import deTaiService from "../../../../service/DeTaiService";

const DeCuongForm = ({ taiLieu, setTaiLieu, onSubmit, onCancel, isEdit }) => {
  const [deTai, setDeTai] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    fetchDeTai();
    if (taiLieu?.file) {
      setFileName(taiLieu.file.name);
    }
  }, [taiLieu]);

  const fetchDeTai = async () => {
    try {
      const res = await deTaiService.getDeTaiBySinhVienId();
      setDeTai(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy đề tài:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File phải nhỏ hơn 10MB!");
        return;
      }
      setFileName(selectedFile.name);
      setTaiLieu((prev) => ({ ...prev, file: selectedFile }));
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10" />
      <div className="relative w-2/5 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
          <h1 className="font-bold text-2xl mb-5">
            {isEdit ? "Chỉnh sửa đề cương" : "Nộp đề cương mới"}
          </h1>

          <div className="mb-4">
            <label htmlFor="tenDeTai" className="block text-sm font-medium text-gray-900">Tên đề tài</label>
            <input
              type="text"
              id="tenDeTai"
              name="tenDeTai"
              value={deTai?.tenDeTai || ""}
              readOnly
              className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="moTa" className="block text-sm font-medium text-gray-900">Mô tả</label>
            <textarea
              id="moTa"
              name="moTa"
              value={deTai?.moTa || ""}
              readOnly
              rows={3}
              className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
              Chọn file (tối đa 10MB)
            </label>
            <input
              id="file_input"
              type="file"
              name="file"
              accept=".pdf"
              onChange={handleFileChange}
              required={!isEdit}
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 file:bg-gray-50 file:border-0 file:py-3 file:px-4"
            />
            {fileName && (
              <p className="mt-2 text-sm text-gray-700">File: {fileName}</p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 w-full sm:w-auto"
            >
              {isEdit ? "Cập nhật" : "Thêm"}
            </button>

            <button
              type="button"
              onClick={() => onCancel(false)}
              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 w-full sm:w-auto"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeCuongForm;