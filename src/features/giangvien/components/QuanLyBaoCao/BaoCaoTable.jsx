import fileUploadService from "../../../../service/FileUploadService";
import { GoDownload } from "react-icons/go";

const SinhVienTable = ({ deTaiList }) => {

  const handleDownloadClick = async (tenFile) => {
    try {
      const res = await fileUploadService.downLoadFile(tenFile);

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = res.headers["content-disposition"];
      let fileName = tenFile;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length > 1) {
          fileName = fileNameMatch[1];
        }
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
    }
  };
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
            <th className="py-3 px-4">File</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {deTaiList.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{row?.deTai?.sinhVienDot?.sinhVien?.maSinhVien}</td>
              <td className="py-2 px-4">{row.deTai?.sinhVienDot?.sinhVien?.hoDem}</td>
              <td className="py-2 px-4">{row.deTai?.sinhVienDot?.sinhVien?.ten}</td>
              <td className="py-2 px-4">{row?.deTai?.sinhVienDot?.sinhVien?.lop?.tenLop}</td>
              <td className="py-2 px-4">{row.deTai?.sinhVienDot?.sinhVien?.soDienThoai}</td>
              <td className="py-2 px-4">{row.deTai?.tenDeTai}</td>
              <td className="py-2 px-4">{row.tenFile}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <button
                  className="text-green-600 hover:text-green-800 ml-2 mt-1"
                  onClick={() => handleDownloadClick(row.tenFile)}>
                  <GoDownload className="w-6 h-6" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SinhVienTable;