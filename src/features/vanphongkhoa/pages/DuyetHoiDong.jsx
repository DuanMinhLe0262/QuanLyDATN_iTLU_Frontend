import { useEffect, useState } from "react";
import hoiDongService from "../../../service/HoiDongService";

const DuyetHoiDong = () => {
  const [hoiDongs, setHoiDongs] = useState([]);
  const [tuChoiLyDos, setTuChoiLyDos] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchHoiDong = async () => {
    try {
      const res = await hoiDongService.getHoiDongChoDuyet();
      setHoiDongs(res.data.result);
      console.log("debug hoi dong: ", res.data.result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hội đồng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoiDong();
  }, []);

  const handleDuyet = async (id) => {
    try {
      await hoiDongService.updateTrangThaiHoiDong(id, { trangThai: "DA_DUYET" });
      setTuChoiLyDos({ ...tuChoiLyDos, [id]: "" }); // reset lý do từ chối của hội đồng đó
      fetchHoiDong();
    } catch (error) {
      console.error("Lỗi khi duyệt hội đồng:", error);
    }
  };

  const handleTuChoi = async (id) => {
    const lyDo = tuChoiLyDos[id];
    if (!lyDo || !lyDo.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }
    try {
      await hoiDongService.updateTrangThaiHoiDong(id, {
        trangThai: "TU_CHOI",
        danhGia: lyDo,
      });
      setTuChoiLyDos({ ...tuChoiLyDos, [id]: "" });
      fetchHoiDong();
    } catch (error) {
      console.error("Lỗi khi từ chối hội đồng:", error);
    }
  };

  // Hàm sắp xếp vai trò
  const sortGiangVien = (list) => {
    const vaiTroOrder = {
      CHU_TICH: 1,
      THU_KY: 2,
      UY_VIEN_1: 3,
      UY_VIEN_2: 4,
      UY_VIEN_3: 5,
    };
    return list.slice().sort((a, b) => {
      const orderA = vaiTroOrder[a.vaiTro] || 99;
      const orderB = vaiTroOrder[b.vaiTro] || 99;
      return orderA - orderB;
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt Hội Đồng</h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : hoiDongs.length === 0 ? (
        <p className="text-gray-600">Không có hội đồng nào đang chờ duyệt.</p>
      ) : (
        <div className="space-y-6">
          {hoiDongs.map((hd) => {
            const danhSachGVSorted = sortGiangVien(hd.danhSachGiangVien || []);

            return (
              <div
                key={hd.id}
                className="border border-gray-200 rounded p-4 shadow-sm bg-white"
              >
                <h2 className="text-lg font-bold text-gray-800">
                  Tên hội đồng: {hd.tenHoiDong}
                </h2>

                <p className="text-sm text-gray-700 mt-2">
                  Trạng thái: <strong className="text-red-500">{hd.trangThai}</strong>
                </p>

                <div className="mt-3">
                  <h3 className="text-sm font-semibold mb-1">
                    Danh sách giảng viên:
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {danhSachGVSorted.map((gv, idx) => (
                      <li key={idx}>
                        {gv.giangVien?.maGiangVien} - {gv.giangVien?.hoDem} {gv.giangVien?.ten} ({gv.vaiTro})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    onClick={() => handleDuyet(hd.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Duyệt
                  </button>

                  <input
                    type="text"
                    placeholder="Lý do từ chối"
                    value={tuChoiLyDos[hd.id] || ""}
                    onChange={(e) =>
                      setTuChoiLyDos({ ...tuChoiLyDos, [hd.id]: e.target.value })
                    }
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                  />

                  <button
                    onClick={() => handleTuChoi(hd.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DuyetHoiDong;
