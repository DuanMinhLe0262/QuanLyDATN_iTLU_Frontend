import React from "react";

const PhanBoList = ({ hoiDongList, onView, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl mb-8 p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh sách hội đồng và lịch bảo vệ</h3>

      {hoiDongList.length === 0 ? (
        <p className="text-gray-500">Không có hội đồng nào.</p>
      ) : (
        hoiDongList.map((hd) => (
          <div key={hd.id} className="bg-gray-50 rounded-lg mb-6 p-4 shadow-sm">
            <h4 className="font-medium text-blue-700 mb-2">Hội đồng: {hd.tenHoiDong}</h4>

            {(!hd.lichBaoVeList || hd.lichBaoVeList.length === 0) ? (
              <p className="text-gray-500">Chưa có lịch bảo vệ nào.</p>
            ) : (
              hd.lichBaoVeList.map((lich) => (
                <div
                  key={lich.id}
                  className="border-gray-900 rounded-lg p-3 mb-3 bg-white"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-700">
                      {lich.maLich} | {lich.ngay} | {lich.gioBatDau}-{lich.gioKetThuc} | {lich.diaDiem}
                    </p>
                    <div className="flex space-x-2 ml-4">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => onView(lich)}
                      >
                        Xem chi tiết
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => onDelete(lich.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PhanBoList;
