import { useEffect, useState } from "react";
import deTaiService from "../../../service/DeTaiService";

const DuyetDeTai = () => {
  const [deTais, setDeTais] = useState([]);
  const [tuChoiLyDo, setTuChoiLyDo] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDeTais = async () => {
    try {
      const res = await deTaiService.getDeTaiChoDuyet();
      setDeTais(res.data.result);
      console.log("debug detaichoduyet: ", res.data.result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đề tài:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeTais();
  }, []);

  const handleDuyet = async (id) => {
    try {
      await deTaiService.updateDeTaiByGiangVien(id, { trangThai: "DA_DUYET" });
      fetchDeTais();
    } catch (error) {
      console.error("Lỗi khi duyệt đề tài:", error);
    }
  };

  const handleTuChoi = async (id) => {
    if (!tuChoiLyDo.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }
    try {
      await deTaiService.updateDeTai(id, {
        trangThai: "TU_CHOI",
        danhGia: tuChoiLyDo,
      });
      setTuChoiLyDo("");
      fetchDeTais();
    } catch (error) {
      console.error("Lỗi khi từ chối đề tài:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt Đề Tài</h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : deTais.length === 0 ? (
        <p className="text-gray-600">Không có đề tài nào.</p>
      ) : (
        <div className="space-y-6">
          {deTais.map((dt) => (
            <div
              key={dt.id}
              className="border border-gray-200 rounded p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Tên đề tài: {dt.tenDeTai}
              </h2>
              <p className="text-sm text-gray-600">
                
                <strong>
                  {dt.sinhVienDot?.sinhVien?.hoDem} {dt.sinhVienDot?.sinhVien?.ten} ({dt.sinhVienDot?.sinhVien?.maSinhVien})
                </strong>
              </p>
              <p className="text-sm text-gray-700 mt-2">Mô tả: {dt.moTa}</p>
              <p className="text-sm mt-2">
                Trạng thái:{" "}
                <span
                  className={`font-medium ${
                    dt.trangThai === "TU_CHOI"
                      ? "text-red-600"
                      : dt.trangThai === "DA_DUYET"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {dt.trangThai}
                </span>
              </p>

              {dt.trangThai === "CHO_DUYET" && (
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    onClick={() => handleDuyet(dt.id)}
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
                    onClick={() => handleTuChoi(dt.id)}
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

export default DuyetDeTai;