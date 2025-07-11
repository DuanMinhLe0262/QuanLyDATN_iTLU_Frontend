import { RiEditLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";

const DeTaiTable = ({ deTai, onEdit }) => {
  if (!deTai) {
    return <p>Không có dữ liệu đề tài.</p>;
  }

  console.log("bug: ", deTai);

  const gvhd1 = deTai.listSinhVienHuongDan?.find(
    (hd) => hd.vaiTroHuongDan === "GVHD_1"
  )?.giangVien?.ten || "Không có";

  const gvhd2 = deTai.listSinhVienHuongDan?.find(
    (hd) => hd.vaiTroHuongDan === "GVHD_2"
  )?.giangVien?.ten || "Không có";

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Tên đề tài</th>
            <th className="py-3 px-4">Mô tả</th>
            <th className="py-3 px-4">Trạng thái</th>
            <th className="py-3 px-4">Đánh giá</th>
            <th className="py-3 px-4">GVHD 1</th>
            <th className="py-3 px-4">GVHD 2</th>
            <th className="py-3 px-4">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4">1</td>
            <td className="py-2 px-4">{deTai.tenDeTai}</td>
            <td className="py-2 px-4 max-w-xs truncate">{deTai.moTa}</td>
            <td className="py-2 px-4">{deTai.trangThai}</td>
            <td className="py-2 px-4">{deTai.danhGia}</td>
            <td className="py-2 px-4">{gvhd1}</td>
            <td className="py-2 px-4">{gvhd2}</td>
            <td className="py-2 px-4 text-center space-x-2">
              <button
                className="text-yellow-600 hover:text-yellow-800"
                onClick={() => onEdit(deTai)}
              >
                <RiEditLine />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DeTaiTable;
