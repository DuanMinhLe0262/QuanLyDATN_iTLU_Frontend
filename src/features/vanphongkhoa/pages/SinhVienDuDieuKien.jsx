import { useState, useEffect } from "react";

import SinhVienForm from "../components/DanhSachSinhVien/SinhVienForm";
import SinhVienTable from "../components/DanhSachSinhVien/SinhVienTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import sinhVienService from "../../../service/SinhVienService";
import UploadForm from "../../../components/common/UploadForm";

const SinhVien = () => {
  const [sinhVienList, setSinhVienList] = useState([]);
  const [showFormUpload, setShowFormUpload] = useState(false);
  const [sinhVien, setSinhVien] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [sinhVienIdCanXoa, setSinhVienIdCanXoa] = useState(null);

  useEffect(() => {
    getAllSinhVien();
  }, []);

  const getAllSinhVien = async () => {
    try {
      const res = await sinhVienService.getAllSinhVien();
      setSinhVienList(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách sinh viên:", err);
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
    setSinhVien((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setSinhVien({
      maSinhVien: "",
      hoDem: "",
      ten: "",
      ngaySinh: "",
      gioiTinh: "",
      diaChi: "",
      soDienThoai: "",
      lop: "",
      nganh: "",
      khoa: ""
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEditClick = (sinhVien) => {
    setSinhVien(sinhVien);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setSinhVienIdCanXoa(id);
    setShowConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await sinhVienService.updateSinhVien(sinhVien.id, sinhVien);
        setSuccessMessage("Cập nhật sinh viên thành công");
      } else {
        await sinhVienService.createSinhVien(sinhVien);
        setSuccessMessage("Thêm sinh viên mới thành công");
      }

      setShowForm(false);
      setSinhVien(null);
      getAllSinhVien();
    } catch (err) {
      console.error("Lỗi khi lưu sinh viên:", err);
    }
  };



  const confirmDelete = async () => {
    try {
      await sinhVienService.deleteSinhVien(sinhVienIdCanXoa);
      setSuccessMessage("Xóa sinh viên thành công");
      getAllSinhVien();
    } catch (err) {
      console.error("Lỗi khi xóa sinh viên:", err);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative overflow-x-auto p-4">

      <div className="flex flex-row w-70 h-12 mb-10" >
        <button
          onClick={handleAddClick}
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm flex-1 mr-6 pl-5 pr-5" >
          Thêm sinh viên
        </button>

        <button onClick={() => setShowFormUpload(true)}
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm flex-1">
          Tải file
        </button>
      </div>

      {successMessage && <SuccessMessage message={successMessage} />}

      {showForm && (
        <SinhVienForm
          sinhVien={sinhVien}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      {showFormUpload && (
        <UploadForm
        onCancel={() => setShowFormUpload(false)}
        />
      )}

      {showConfirm && (
        <ConfirmDialog 
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <SinhVienTable
        sinhVienList={sinhVienList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default SinhVien;