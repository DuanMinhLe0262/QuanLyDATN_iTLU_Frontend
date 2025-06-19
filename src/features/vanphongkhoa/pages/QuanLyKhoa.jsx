import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";

import KhoaForm from "../components/QuanLyToChuc/Khoa/KhoaForm";
import KhoaTable from "../components/QuanLyToChuc/Khoa/KhoaTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import KhoaService from "../../../service/KhoaSerVice";

const QuanLyKhoa = () => {
  const [khoaList, setKhoaList] = useState([]);
  const [khoa, setKhoa] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchKhoaList();
  }, []);

  const fetchKhoaList = async () => {
    try {
      const res = await KhoaService.getAllKhoa();
      setKhoaList(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách khoa:", err);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKhoa((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setKhoa({
      tenKhoa: "",
      moTa: ""
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await KhoaService.updateKhoa(khoa.id, khoa);
        setSuccessMessage("Cập nhật khoa thành công");
      } else {
        await KhoaService.createKhoa(khoa);
        setSuccessMessage("Thêm khoa mới thành công");
      }

      setShowForm(false);
      setKhoa(null);
      fetchKhoaList();
    } catch (err) {
      console.error("Lỗi khi lưu khoa:", err);
    }
  };

  const handleEditClick = (khoa) => {
    setKhoa(khoa);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await KhoaService.deleteKhoa(deleteId);
      setSuccessMessage("Xóa khoa thành công");
      fetchKhoaList();
    } catch (err) {
      console.error("Lỗi khi xóa khoa:", err);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative overflow-x-auto p-4">
      <button
        onClick={handleAddClick}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-10"
      >
        <IoAddOutline className="inline mr-2 mb-0.5 size-5" />
        Thêm khoa
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}

      {showForm && (
        <KhoaForm
          khoa={khoa}
          onChange={handleChange}
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

      <KhoaTable
        khoaList={khoaList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default QuanLyKhoa;
