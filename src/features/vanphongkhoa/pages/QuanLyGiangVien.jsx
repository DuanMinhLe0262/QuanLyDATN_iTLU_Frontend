import { useState, useEffect } from "react";

import GiangVienForm from "../components/QuanLyNguoiDung/GiangVien/GiangVienForm";
import GiangVienTable from "../components/QuanLyNguoiDung/GiangVien/GiangVienTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import GiangVienService from "../../../service/GiangVienService";

const QuanLyGiangVien = () => {
  const [giangVienList, setGiangVienList] = useState([]);
  const [giangVien, setGiangVien] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getAllGiangVien();
  }, []);

  const getAllGiangVien = async () => {
    try {
      const res = await GiangVienService.getAllGiangVien();
      setGiangVienList(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách giảng viên:", err);
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
    setGiangVien((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    setGiangVien({
      maGiangVien: "",
      hoDem: "",
      ten: "",
      email: "",
      gioiTinh: "",
      ngaySinh: "",
      soDienThoai: "",
      avartarUrl: "",
      hocVi: "",
      hocHam: "",
      chucVu: "",
      boMonId: ""
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEditClick = (giangVien) => {
    setGiangVien(giangVien);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await GiangVienService.updateGiangVien(giangVien.id, giangVien);
        setSuccessMessage("Cập nhật giảng viên thành công");
      } else {
        console.log("data: ", giangVien);
        await GiangVienService.createGiangVien(giangVien);
        setSuccessMessage("Thêm giảng viên mới thành công");
      }

      setShowForm(false);
      setGiangVien(null);
      getAllGiangVien();
    } catch (err) {
      console.error("Lỗi khi lưu giảng viên:", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await GiangVienService.deleteGiangVien(deleteId);
      setSuccessMessage("Xóa giảng viên thành công");
      getAllGiangVien();
    } catch (err) {
      console.error("Lỗi khi xóa giảng viên:", err);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative overflow-x-auto p-4">
      <div className="flex flex-row w-70 h-12 mb-10">
        <button
          onClick={handleAddClick}
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm flex-1 mr-6 pl-5 pr-5"
        >
          Thêm giảng viên
        </button>

        <button
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm flex-1"
        >
          Tải file
        </button>
      </div>

      {successMessage && <SuccessMessage message={successMessage} />}

      {showForm && (
        <GiangVienForm
          giangVien={giangVien}
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

      <GiangVienTable
        giangVienList={giangVienList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default QuanLyGiangVien;