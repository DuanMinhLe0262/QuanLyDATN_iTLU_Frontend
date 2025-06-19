import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";

import NganhForm from "../components/QuanLyToChuc/Nganh/NganhForm";
import NganhTable from "../components/QuanLyToChuc/Nganh/NganhTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import nganhService from "../../../service/NganhService";

const QuanLyNganh = () => {
  const [nganhList, setNganhList] = useState([]);
  const [nganh, setNganh] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchNganhList();
  }, []);

  const fetchNganhList = async () => {
    try {
      const res = await nganhService.getAllNganh();
      setNganhList(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách ngành:", err);
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
    setNganh((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setNganh({
      tenNganh: "",
      moTa: "",
      boMonId: "" // chọn bộ môn trực thuộc
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await nganhService.updateNganh(nganh.id, nganh);
        setSuccessMessage("Cập nhật ngành thành công");
      } else {
        await nganhService.createNganh(nganh);
        setSuccessMessage("Thêm ngành mới thành công");
      }

      setShowForm(false);
      setNganh(null);
      fetchNganhList();
    } catch (err) {
      console.error("Lỗi khi lưu ngành:", err);
    }
  };

  const handleEditClick = (nganh) => {
    setNganh(nganh);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await nganhService.deleteNganh(deleteId);
      setSuccessMessage("Xóa ngành thành công");
      fetchNganhList();
    } catch (err) {
      console.error("Lỗi khi xóa ngành:", err);
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
        Thêm ngành
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}

      {showForm && (
        <NganhForm
          nganh={nganh}
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

      <NganhTable
        nganhList={nganhList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default QuanLyNganh;
