import React, { useEffect, useState } from "react";

export default function GiangVienHd() {
  const [giangViens, setGiangViens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/giang-vien-goi-y")
      .then((res) => res.json())
      .then((data) => {
        setGiangViens(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách giảng viên:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Đang tải danh sách...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6">
        Danh sách giảng viên gợi ý
      </h1>

      {giangViens.length === 0 ? (
        <p className="text-center text-gray-600">Không có giảng viên gợi ý nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {giangViens.map((gv) => (
            <div
              key={gv.id}
              className="p-5 border border-gray-200 rounded-lg hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">{gv.hoTen}</h2>
              <p className="text-sm text-gray-600 mt-1">
                Email: <span className="font-medium">{gv.email}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Bộ môn: {gv.boMon || "Chưa rõ"}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Đang hướng dẫn: {gv.soLuongHuongDan} sinh viên
              </p>
              <p className="text-sm text-gray-600 mt-2 italic">
                {gv.moTa || "Không có mô tả thêm"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
