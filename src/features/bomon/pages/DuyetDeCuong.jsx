import { useEffect, useState } from "react";
import axios from "axios";

const DuyetDeCuong = () => {
  const [deCuongs, setDeCuongs] = useState([]);
  const [tuChoiLyDo, setTuChoiLyDo] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDeCuongs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/tailieu", {
        withCredentials: true,
      });
      setDeCuongs(res.data.result);
      console.log("dataa: ", deCuongs);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đề cương:", error);
    } finally {
      setLoading(false);
    }
  };
  

  
  useEffect(() => {
    fetchDeCuongs();
  }, []);


  useEffect(() => {
    console.log("data decuong sau khi fetch:", deCuongs);
  }, [deCuongs]);

  
  const handleDuyet = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/tailieu/${id}`,
        {
          trangThai: "DA_DUYET",
        },
        { withCredentials: true }
      );
      fetchDeCuongs();
    } catch (error) {
      console.error("Lỗi khi duyệt đề cương:", error);
    }
  };

  const handleTuChoi = async (id) => {
    if (!tuChoiLyDo.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/tailieu/${id}`,
        {
          trangThai: "TU_CHOI",
          nhanXet: tuChoiLyDo,
        },
        { withCredentials: true }
      );
      setTuChoiLyDo("");
      fetchDeCuongs();
    } catch (error) {
      console.error("Lỗi khi từ chối đề cương:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt Đề Cương</h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : deCuongs.length === 0 ? (
        <p className="text-gray-600">Không có đề cương nào.</p>
      ) : (

        <div className="space-y-6">
          {deCuongs.map((dc) => (
            <div
              key={dc.id}
              className="border border-gray-200 rounded p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800">{dc.tenDeTai}</h2>
              <p className="text-sm text-gray-600">
                Sinh viên:{" "}
                <strong>
                  {dc.sinhVien.hoDem} {dc.sinhVien.ten} ({dc.sinhVien.maSinhVien})
                </strong>
              </p>
              <p className="text-sm text-gray-700 mt-2">Mô tả: {dc.moTa}</p>
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

export default DuyetDeCuong;
