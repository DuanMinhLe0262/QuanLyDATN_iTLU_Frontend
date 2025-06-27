import { useState } from "react";

const BaoCao = () => {
  const [formData, setFormData] = useState({
    tieuDe: "",
    loaiBaoCao: "",
    files: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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

    const fakeSubmission = {
      ...formData,
      submitTime: new Date().toLocaleString(),
      status: "Chờ duyệt",
    };

    setSubmittedData(fakeSubmission);
    setIsSubmitted(true);
  };

  const handleResubmit = () => {
    setFormData({
      tieuDe: "",
      loaiBaoCao: "",
      files: [],
    });
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Nộp Báo Cáo</h2>

      {isSubmitted && submittedData ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded">
            ✅ Bạn đã nộp báo cáo thành công!
          </div>

          <div className="border-t pt-4">
            <p><span className="font-medium">Tiêu đề:</span> {submittedData.tieuDe}</p>
            <p><span className="font-medium">Loại báo cáo:</span> {submittedData.loaiBaoCao}</p>
            <p><span className="font-medium">Thời gian nộp:</span> {submittedData.submitTime}</p>
            <p><span className="font-medium">Trạng thái:</span>
              <span className="ml-2 inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                {submittedData.status}
              </span>
            </p>
            <div className="mt-2">
              <span className="font-medium">File đã nộp:</span>
              <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                {submittedData.files.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={handleResubmit}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Nộp lại
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default BaoCao;
