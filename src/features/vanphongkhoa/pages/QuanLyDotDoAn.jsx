import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";

import DotDoAnForm from "../components/QuanLyDotDoAn/DotDoAn/DotDoAnForm";
import DotDoAnTable from "../components/QuanLyDotDoAn/DotDoAn/DotDoAnTable";
import ConfirmDialog from "../components/QuanLyDotDoAn/DotDoAn/ConFirmDialog";
import SuccessMessage from "../components/common/SuccessMessage";
import FailMessage from "../../../components/common/FailMessage";
import dotDoAnService from "../../../service/DotDoAnService";

const DotDoAn = () => {
  const [dotList, setDotList] = useState([]);
  const [dot, setDot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [deleteDot, setDeleteDot] = useState(null);

  useEffect(() => {
    getAllDot();
  }, []);

  const getAllDot = async () => {
    try {
      const res = await dotDoAnService.getAllDotDoAn();
      setDotList(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách:", err);
      setFailMessage("Lỗi khi lấy danh sách đợt: " + (err.response?.data?.message || ""));
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
      const timeout = setTimeout(() => setFailMessage(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [failMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDot((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setDot({
      maDot: "",
      tenDot: "",
      namHoc: "",
      thoiGianBatDau: "",
      thoiGianKetThuc: ""
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await dotDoAnService.updateDotDoAn(dot.id, dot);
        setSuccessMessage("Cập nhật đợt thành công");
      } else {
        await dotDoAnService.createDotDoAn(dot);
        setSuccessMessage("Thêm đợt mới thành công");
      }

      setShowForm(false);
      setDot(null);
      getAllDot();
    } catch (err) {
      setShowForm(false);
      console.error("Lỗi khi lưu đợt:", err);
      setFailMessage("Lỗi khi lưu đợt: " + (err.response?.data?.message || ""));
    }
  };

  const handleEditClick = (dotDoAnSelected) => {
    setDot({
      ...dotDoAnSelected,
      tenDot: dotDoAnSelected.tenDot || "",
      namHoc: dotDoAnSelected.namHoc || "",
      thoiGianBatDau: dotDoAnSelected.thoiGianBatDau || "",
      thoiGianKetThuc: dotDoAnSelected.thoiGianKetThuc || ""
    });
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteDot(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await dotDoAnService.deleteDotDoAn(deleteDot);
      setSuccessMessage("Xóa đợt thành công");
      getAllDot();
    } catch (err) {
      console.error("Lỗi khi xóa đợt:", err);
      setFailMessage("Lỗi khi xóa đợt: " + (err.response?.data?.message || ""));
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
        Thêm đợt
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

      {showForm && (
        <DotDoAnForm
          dotDoAn={dot}
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

      <DotDoAnTable
        dotList={dotList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default DotDoAn;
