import React, { useEffect, useState } from "react";

export default function DeTaiGoiY() {
  const [deTais, setDeTais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/de-tai-goi-y")
      .then((res) => res.json())
      .then((data) => {
        setDeTais(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải đề tài gợi ý:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Đang tải...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6">
        Danh sách đề tài gợi ý
      </h1>

      {deTais.length === 0 ? (
        <p className="text-center text-gray-600">Chưa có đề tài gợi ý nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deTais.map((deTai) => (
            <div
              key={deTai.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {deTai.tenDeTai}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Lĩnh vực: {deTai.linhVuc || "Chưa rõ"}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Sinh viên đề xuất:{" "}
                <span className="font-medium">{deTai.tenSinhVien}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Mô tả: {deTai.moTa || "Không có mô tả"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
