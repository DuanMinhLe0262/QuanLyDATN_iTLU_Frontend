import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";

import BoMonForm from "../components/QuanLyToChuc/BoMon/BoMonForm";
import BoMonTable from "../components/QuanLyToChuc/BoMon/BoMonTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import BoMonService from "../../../service/BoMonSerVice";

const QuanLyBoMon = () => {
  const [boMonList, setBoMonList] = useState([]);
  const [boMon, setBoMon] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchBoMonList();
  }, []);

  const fetchBoMonList = async () => {
    try {
      const res = await BoMonService.getAllBoMon();
      setBoMonList(res.data.result || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bộ môn:", err);
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
    setBoMon((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setBoMon({
      tenBoMon: "",
      moTa: ""
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!boMon) return;

      if (isEdit) {
        await BoMonService.updateBoMon(boMon.id, boMon);
        setSuccessMessage("Cập nhật bộ môn thành công");
      } else {
        await BoMonService.createBoMon(boMon);
        setSuccessMessage("Thêm bộ môn mới thành công");
      }

      setShowForm(false);
      setBoMon(null);
      fetchBoMonList();
    } catch (err) {
      console.error("Lỗi khi lưu bộ môn:", err);
    }
  };

  const handleEditClick = (boMon) => {
    setBoMon(boMon);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await BoMonService.deleteBoMon(deleteId);
      setSuccessMessage("Xóa bộ môn thành công");
      fetchBoMonList();
    } catch (err) {
      console.error("Lỗi khi xóa bộ môn:", err);
    } finally {
      setDeleteId(null);
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
        Thêm bộ môn
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}

      {showForm && (
        <BoMonForm
          boMon={boMon}
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

      <BoMonTable
        boMonList={boMonList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default QuanLyBoMon;
