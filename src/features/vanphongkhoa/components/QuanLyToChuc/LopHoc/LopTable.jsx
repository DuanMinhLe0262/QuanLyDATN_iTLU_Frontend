import { RiEditLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";

const LopTable = ({ lopList, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Tên lớp</th>
            <th className="py-3 px-4">Mô tả</th>
            <th className="py-3 px-4">Khóa</th>
            <th className="py-3 px-4">Ngành</th>
            <th className="py-3 px-4">Bộ môn</th>
            <th className="py-3 px-4">Khoa</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {lopList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row.tenLop}</td>
              <td className="py-2 px-4">{row.moTa}</td>
              <td className="py-2 px-4">{row.khoaHoc}</td>
              <td className="py-2 px-4">{row.nganh?.tenNganh}</td>
              <td className="py-2 px-4">{row.nganh?.boMon?.tenBoMon}</td>
              <td className="py-2 px-4">{row.nganh?.boMon?.khoa?.tenKhoa}</td>
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

export default LopTable;
