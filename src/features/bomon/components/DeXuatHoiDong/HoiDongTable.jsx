import { RiEditLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";

const getGiangVienByVaiTro = (danhSach, vaiTro) => {
  const found = danhSach.find(item => item.vaiTro === vaiTro);
  const gv = found?.giangVien;
  if (!gv) return "";
  if (gv.hoDem || gv.ten) {
    return `${gv.hoDem ?? ""} ${gv.ten ?? ""}`.trim();
  }
  return gv.maGiangVien ?? gv.user?.email ?? "";
};

const HoiDongTable = ({ hoiDongList, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Tên hội đồng</th>
            <th className="py-3 px-4">Chủ tịch</th>
            <th className="py-3 px-4">Thư ký</th>
            <th className="py-3 px-4">Ủy viên 1</th>
            <th className="py-3 px-4">Ủy viên 2</th>
            <th className="py-3 px-4">Ủy viên 3</th>
            <th className="py-3 px-4">Trạng thái</th>
            <th className="py-3 px-4">Đánh giá</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {hoiDongList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row.tenHoiDong}</td>
              <td className="py-2 px-4">{getGiangVienByVaiTro(row.danhSachGiangVien, "CHU_TICH")}</td>
              <td className="py-2 px-4">{getGiangVienByVaiTro(row.danhSachGiangVien, "THU_KY")}</td>
              <td className="py-2 px-4">{getGiangVienByVaiTro(row.danhSachGiangVien, "UY_VIEN_1")}</td>
              <td className="py-2 px-4">{getGiangVienByVaiTro(row.danhSachGiangVien, "UY_VIEN_2")}</td>
              <td className="py-2 px-4">{getGiangVienByVaiTro(row.danhSachGiangVien, "UY_VIEN_3")}</td>
              <td className="py-2 px-4">{row.trangThai}</td>
              <td className="py-2 px-4">{row.danhGia ?? ""}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <button
                  className="text-yellow-600 hover:text-yellow-800"
                  onClick={() => onEdit(row)}
                >
                  <RiEditLine />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(row.id)}
                >
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoiDongTable;
