import { useEffect, useState } from "react";
import taiLieuService from "../../../service/TaiLieuService";
import fileUploadService from "../../../service/FileUploadService";
import { GoDownload } from "react-icons/go";

const DuyetBaoCao = () => {
  const [deCuongs, setDeCuongs] = useState([]);
  const [tuChoiLyDo, setTuChoiLyDo] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDeCuong = async () => {
    try {
      const res = await taiLieuService.getBaoCaoChoDuyet();
      setDeCuongs(res.data.result);
      console.log("debug bao cao choduyet: ", res.data.result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách báo cáo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeCuong();
  }, []);

  const handleDuyet = async (id) => {
    try {
      await taiLieuService.updateTrangThaiTaiLieu(id, { trangThai: "DA_DUYET" });
      fetchDeCuong();
    } catch (error) {
      console.error("Lỗi khi duyệt báo cáo:", error);
    }
  };

  const handleTuChoi = async (id) => {
    if (!tuChoiLyDo.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }
    try {
      await taiLieuService.updateTrangThaiTaiLieu(id, {
        trangThai: "TU_CHOI",
        danhGia: tuChoiLyDo,
      });
      setTuChoiLyDo("");
      fetchDeCuong();
    } catch (error) {
      console.error("Lỗi khi từ chối báo cáo:", error);
    }
  };

  const handleDownloadClick = async (tenFile) => {
    try {
      const res = await fileUploadService.downLoadFile(tenFile);

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = res.headers["content-disposition"];
      let fileName = tenFile;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length > 1) {
          fileName = fileNameMatch[1];
        }
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt báo cáo</h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : deCuongs.length === 0 ? (
        <p className="text-gray-600">Không có báo cáo nào.</p>
      ) : (
        <div className="space-y-6">
          {deCuongs.map((dc) => (
            <div
              key={dc.id}
              className="border border-gray-200 rounded p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-bold text-gray-800">
                Tên đề tài: {dc?.deTai?.tenDeTai}
              </h2>
              <p className="text-sm text-gray-800">
                <strong>
                  {dc.deTai?.sinhVienDot?.sinhVien?.hoDem} {dc.deTai?.sinhVienDot?.sinhVien?.ten} ({dc.deTai?.sinhVienDot?.sinhVien?.maSinhVien})
                </strong>
              </p>
              <p className="text-sm text-gray-700 mt-2">Mô tả: {dc?.deTai?.moTa}</p>

              <div className="flex mb-5">
                <p className="text-sm text-gray-700 mt-2">File: <span className="text-red-600">{dc?.tenFile}</span>

              </p>
              <button
                className="text-green-600 hover:text-green-800 ml-2 mt-1"
                onClick={() => handleDownloadClick(dc?.tenFile)}>
                <GoDownload className="w-6 h-6" /></button>
              </div>

              <p className="text-sm mt-2">
                Trạng thái:{" "}
                <span
                  className={`font-medium ${dc.trangThai === "TU_CHOI"
                    ? "text-red-600"
                    : dc.trangThai === "DA_DUYET"
                      ? "text-blue-600"
                      : "text-yellow-600"
                    }`}
                >
                  {dc.trangThai}
                </span>
              </p>

              {dc.trangThai === "CHO_DUYET" && (
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    onClick={() => handleDuyet(dc.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Duyệt
                  </button>

                  <input
                    type="text"
                    placeholder="Lý do từ chối"
                    value={tuChoiLyDo}
                    onChange={(e) => setTuChoiLyDo(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                  />

                  <button
                    onClick={() => handleTuChoi(dc.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Từ chối
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DuyetBaoCao;
