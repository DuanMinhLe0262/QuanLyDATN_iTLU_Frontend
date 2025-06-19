import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DuyetHoiDong = () => {
  const [hoiDongs, setHoiDongs] = useState([
    {
      id: 1,
      tenHoiDong: "Hội đồng A",
      dot: "Đợt 1 - HK2 2024",
      thanhVien: ["GV Nguyễn Văn A", "GV Trần Thị B", "GV Lê Văn C"],
      trangThai: "chờ duyệt",
    },
    {
      id: 2,
      tenHoiDong: "Hội đồng B",
      dot: "Đợt 1 - HK2 2024",
      thanhVien: ["GV Nguyễn Thị D", "GV Phạm Văn E"],
      trangThai: "chờ duyệt",
    },
  ]);

  const handleApprove = (id) => {
    setHoiDongs(
      hoiDongs.map((hd) =>
        hd.id === id ? { ...hd, trangThai: "đã duyệt" } : hd
      )
    );
  };

  const handleReject = (id) => {
    setHoiDongs(
      hoiDongs.map((hd) =>
        hd.id === id ? { ...hd, trangThai: "từ chối" } : hd
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Duyệt hội đồng</h2>

      <div className="grid gap-4">
        {hoiDongs.map((hd) => (
          <div
            key={hd.id}
            className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{hd.tenHoiDong}</h3>
                <p className="text-sm text-gray-500">Đợt: {hd.dot}</p>
              </div>
              <div
                className={`text-sm mt-2 md:mt-0 font-semibold ${
                  hd.trangThai === "đã duyệt"
                    ? "text-green-600"
                    : hd.trangThai === "từ chối"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Trạng thái: {hd.trangThai}
              </div>
            </div>

            <div className="mb-3">
              <p className="font-medium text-sm mb-1">Thành viên:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {hd.thanhVien.map((gv, index) => (
                  <li key={index}>{gv}</li>
                ))}
              </ul>
            </div>

            {hd.trangThai === "chờ duyệt" && (
              <div className="flex gap-4">
                <button
                  onClick={() => handleApprove(hd.id)}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  <FaCheckCircle className="mr-2" />
                  Duyệt
                </button>
                <button
                  onClick={() => handleReject(hd.id)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  <FaTimesCircle className="mr-2" />
                  Từ chối
                </button>
              </div>
            )}
          </div>
        ))}

        {hoiDongs.length === 0 && (
          <p className="text-center text-gray-500">Không có hội đồng nào.</p>
        )}
      </div>
    </div>
  );
};

export default DuyetHoiDong;
