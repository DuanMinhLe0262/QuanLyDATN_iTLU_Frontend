import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";

import LopForm from "../components/QuanLyToChuc/LopHoc/LopForm";
import LopTable from "../components/QuanLyToChuc/LopHoc/LopTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import LopService from "../../../service/LopService";

const QuanLyLop = () => {
  const [lopList, setLopList] = useState([]);
  const [lop, setLop] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchLopList();
  }, []);

  const fetchLopList = async () => {
    try {
      const res = await LopService.getAllLop();
      setLopList(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách lớp:", err);
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
    setLop((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setLop({
      tenLop: "",
      moTa: "",
      boMonId: ""
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await LopService.updateLop(lop.id, lop);
        setSuccessMessage("Cập nhật lớp thành công");
      } else {
        await LopService.createLop(lop);
        setSuccessMessage("Thêm lớp mới thành công");
      }

      setShowForm(false);
      setLop(null);
      fetchLopList();
    } catch (err) {
      console.error("Lỗi khi lưu lớp:", err);
    }
  };

  const handleEditClick = (lop) => {
    setLop(lop);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await LopService.deleteLop(deleteId);
      setSuccessMessage("Xóa lớp thành công");
      fetchLopList();
    } catch (err) {
      console.error("Lỗi khi xóa lớp:", err);
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
        Thêm lớp
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}

      {showForm && (
        <LopForm
          lop={lop}
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

      <LopTable
        lopList={lopList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default QuanLyLop;
