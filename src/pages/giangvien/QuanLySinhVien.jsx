import { useEffect, useState } from "react";

const QuanLySinhVien = () => {
  const [sinhViens, setSinhViens] = useState([]);

  useEffect(() => {
    // Gọi API lấy danh sách sinh viên hướng dẫn
    fetch("/api/giangvien/sinhvien-huongdan")
      .then((res) => res.json())
      .then((data) => setSinhViens(data))
      .catch((err) => {
        console.error("Lỗi khi tải danh sách:", err);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Danh sách sinh viên hướng dẫn</h2>

      {sinhViens.length === 0 ? (
        <p className="text-gray-600">Chưa có sinh viên nào.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Mã SV</th>
              <th className="p-2 border">Họ tên</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Tên đề tài</th>
            </tr>
          </thead>
          <tbody>
            {sinhViens.map((sv) => (
              <tr key={sv.maSinhVien} className="hover:bg-gray-50">
                <td className="p-2 border">{sv.maSinhVien}</td>
                <td className="p-2 border">{sv.hoTen}</td>
                <td className="p-2 border">{sv.email}</td>
                <td className="p-2 border">{sv.tenDeTai || "Chưa có"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuanLySinhVien;
