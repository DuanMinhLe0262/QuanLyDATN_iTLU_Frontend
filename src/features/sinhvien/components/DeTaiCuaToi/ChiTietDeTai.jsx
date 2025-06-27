import React from "react";

const ChiTietDeTai = ({ deTai }) => {
  return (
    <div className="space-y-4">
      <p><strong>Tên đề tài:</strong> {deTai.tenDeTai}</p>
      <p><strong>Mô tả:</strong> {deTai.moTa}</p>
      <p>
        <strong>Trạng thái:</strong>{" "}
        <span
          className={`font-semibold ${
            deTai.trangThai === "CHO_DUYET"
              ? "text-yellow-600"
              : deTai.trangThai === "DA_DUYET"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {deTai.trangThai}
        </span>
      </p>
      {deTai.nhanXet && (
        <p className="text-sm text-red-600">
          <strong>Lý do từ chối:</strong> {deTai.nhanXet}
        </p>
      )}
    </div>
  );
};

export default ChiTietDeTai;