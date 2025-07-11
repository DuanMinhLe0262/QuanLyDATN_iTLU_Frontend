import { useState, useEffect } from "react";
import DeCuongForm from "../components/QuanLyDeCuong/DeCuongForm";
import DeCuongTable from "../components/QuanLyDeCuong/DeCuongTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import FailMessage from "../../../components/common/FailMessage";
import taiLieuService from "../../../service/TaiLieuService";
import fileUploadService from "../../../service/FileUploadService";

const QuanLyDeCuong = () => {
  const [taiLieuList, setTaiLieuList] = useState([]);
  const [taiLieu, setTaiLieu] = useState({ file: null });
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    getTaiLieuBySinhVienId();
  }, []);

  const getTaiLieuBySinhVienId = async () => {
    try {
      const res = await taiLieuService.getAllDeCuongBySinhVienId();
      setTaiLieuList(res.data.result);
      console.log("debug: ", res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách đề cương:", err);
      setFailMessage("Lỗi khi lấy danh sách đề cương: " + (err.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  useEffect(() => {
    if (failMessage) {
      const timeout = setTimeout(() => setFailMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [failMessage]);

  const handleAddClick = () => {
    setTaiLieu({ file: null });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setTaiLieu(item);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fileUrl = "";
      let fileName = "";

      if (taiLieu.file) {
        const formData = new FormData();
        formData.append("file", taiLieu.file);

        const res = await fileUploadService.upLoadFile(formData);
        console.log("url: ", res.data);
        fileUrl = res.data;
        fileName = taiLieu.file.name;
      }

      const payload = {
        tenFile: fileName,
        url: fileUrl,
        loai: "DE_CUONG",
      };

      console.log("payload: ", payload);

      if (isEdit) {
        await taiLieuService.updateTaiLieu(taiLieu.id, payload);
        setSuccessMessage("Cập nhật đề cương thành công");
      } else {
        await taiLieuService.createTaiLieu(payload);
        setSuccessMessage("Nộp đề cương thành công");
      }

      setShowForm(false);
      setTaiLieu({ file: null });
      getTaiLieuBySinhVienId();
    } catch (err) {

      setShowForm(false);
      console.error("Lỗi khi xử lý đề cương:", err);
      setFailMessage("Lỗi khi lưu đề cương: " + (err.response?.data?.message || ""));
    }
  };

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
      setFailMessage("Lỗi khi tải file: " + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="relative overflow-x-auto p-4">
      <button
        onClick={handleAddClick}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-10"
      >
        Nộp đề cương
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

      {showForm && (
        <DeCuongForm
          taiLieu={taiLieu}
          setTaiLieu={setTaiLieu}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <DeCuongTable
        taiLieuList={taiLieuList}
        onEdit={handleEditClick}
        onDownload={handleDownloadClick}
      />
    </div>
  );
};

export default QuanLyDeCuong;
