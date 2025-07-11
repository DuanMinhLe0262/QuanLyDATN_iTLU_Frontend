import { RiDownloadLine, RiEditLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
import { GoDownload } from "react-icons/go";

const DeCuongTable = ({ taiLieuList, onEdit, onDownload }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Tên file</th>
            <th className="py-3 px-4">Tên đề tài</th>
            <th className="py-3 px-4">Ngày nộp</th>
            <th className="py-3 px-4">Trạng thái</th>
            <th className="py-3 px-4">Đánh giá</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {taiLieuList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row.tenFile}</td>
              <td className="py-2 px-4">{row.deTai?.tenDeTai || "-"}</td>
              <td className="py-2 px-4">{new Date(row.ngayNop).toLocaleDateString("vi-VN")}</td>
              <td className="py-2 px-4">{row.trangThai}</td>
              <td className="py-2 px-4">{row.danhGia || ""}</td>
              <td className="py-2 px-4 text-center space-x-2">
                {row.fileUrl && (
                  <a
                    href={row.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800"
                  >
                    <RiDownloadLine />
                  </a>
                )}
                <button
                  className="text-yellow-600 hover:text-yellow-800"
                  onClick={() => onEdit(row)}
                >
                  <RiEditLine />
                </button>
                <button
                  className="text-green-600 hover:text-green-800"
                  onClick={() => onDownload(row.tenFile)}
                >
                  <GoDownload />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeCuongTable;