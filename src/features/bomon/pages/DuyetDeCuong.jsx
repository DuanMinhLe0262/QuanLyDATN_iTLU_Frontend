import { useState } from "react";

const DuyetDeCuong = () => {
  const [deCuongs, setDeCuongs] = useState([
    {
      id: 1,
      tenSinhVien: "Nguyễn Văn A",
      maSV: "SV001",
      tenDeTai: "Xây dựng website quản lý đồ án",
      moTa: "Ứng dụng React và Spring Boot để quản lý đồ án tốt nghiệp.",
      trangThai: "Chờ duyệt",
    },
    {
      id: 2,
      tenSinhVien: "Trần Thị B",
      maSV: "SV002",
      tenDeTai: "Nghiên cứu AI trong phân loại văn bản",
      moTa: "Áp dụng mô hình học sâu để phân loại văn bản tiếng Việt.",
      trangThai: "Chờ duyệt",
    },
  ]);

  const [tuChoiLyDo, setTuChoiLyDo] = useState("");

  const handleDuyet = (id) => {
    setDeCuongs((prev) =>
      prev.map((dc) =>
        dc.id === id ? { ...dc, trangThai: "Đã duyệt" } : dc
      )
    );
  };

  const handleTuChoi = (id) => {
    if (!tuChoiLyDo.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }
    setDeCuongs((prev) =>
      prev.map((dc) =>
        dc.id === id ? { ...dc, trangThai: `Từ chối: ${tuChoiLyDo}` } : dc
      )
    );
    setTuChoiLyDo("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt Đề Cương</h1>

      {deCuongs.length === 0 ? (
        <p className="text-gray-600">Không có đề cương nào.</p>
      ) : (
        <div className="space-y-6">
          {deCuongs.map((dc) => (
            <div
              key={dc.id}
              className="border border-gray-200 rounded p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {dc.tenDeTai}
              </h2>
              <p className="text-sm text-gray-600">
                Sinh viên: <strong>{dc.tenSinhVien} ({dc.maSV})</strong>
              </p>
              <p className="text-sm text-gray-700 mt-2">Mô tả: {dc.moTa}</p>
              <p className="text-sm mt-2">
                Trạng thái:{" "}
                <span
                  className={`font-medium ${
                    dc.trangThai.includes("Từ chối")
                      ? "text-red-600"
                      : dc.trangThai === "Đã duyệt"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {dc.trangThai}
                </span>
              </p>

              {dc.trangThai === "Chờ duyệt" && (
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    onClick={() => handleDuyet(dc.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    ✅ Duyệt
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
                    ❌ Từ chối
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

export default DuyetDeCuong;
