import { LuEye } from "react-icons/lu";

const SinhVienTable = ({ deTaiList, onDetail }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Mã sinh viên</th>
            <th className="py-3 px-4">Họ và tên đệm</th>
            <th className="py-3 px-4">Tên</th>
            <th className="py-3 px-4">Lớp</th>
            <th className="py-3 px-4">Số điện thoại</th>
            <th className="py-3 px-4">Tên đề tài</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {deTaiList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row?.sinhVienDot?.sinhVien?.maSinhVien}</td>
              <td className="py-2 px-4">{row?.sinhVienDot?.sinhVien?.hoDem}</td>
              <td className="py-2 px-4">{row?.sinhVienDot?.sinhVien?.ten}</td>
              <td className="py-2 px-4">{row?.sinhVienDot?.sinhVien?.lop?.tenLop}</td>
              <td className="py-2 px-4">{row?.sinhVienDot?.sinhVien?.soDienThoai}</td>
              <td className="py-2 px-4">{row?.tenDeTai}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="text-yellow-600 hover:text-yellow-800"
                  onClick={() => onDetail(row)}
                >
                  <LuEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SinhVienTable;
