import { useState, useEffect } from "react";

import SinhVienForm from "../components/QuanLySinhVienHuongDan/SinhVienForm";
import SinhVienTable from "../components/QuanLySinhVienHuongDan/SinhVienTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import sinhVienHuongDanService from "../../../service/SinhVienHuongdanService";

import UploadForm from "../components/QuanLySinhVienHuongDan/UploadForm";

const QuanLySinhVien = () => {
  const [sinhVienList, setSinhVienList] = useState([]);
  const [sinhVien, setSinhVien] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [sinhVienIdCanXoa, setSinhVienIdCanXoa] = useState(null);

  useEffect(() => {
    getAllSinhVien();
  }, []);

  const getAllSinhVien = async () => {
    try {
      const res = await sinhVienHuongDanService.getAllSinhVienHuongDan();
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
    setSinhVien((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleAddClick = () => {
    setSinhVien({
      maSinhVien: "",
      maGiangVien: "",
      vaiTroHuongDan: ""
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEditClick = (sinhVien) => {
    console.log("sinhvien: ", sinhVien);
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
        await sinhVienHuongDanService.updateSinhVienHuongDan(sinhVien.id, sinhVien);
        setSuccessMessage("Cập nhật sinh viên thành công");
      } else {

        console.log("data: ", sinhVien);
        await sinhVienHuongDanService.createSinhVienHuongDan(sinhVien);
        setSuccessMessage("Thêm sinh viên hướng dẫn thành công");
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
      await sinhVienHuongDanService.deleteSinhVienHuongDan(sinhVienIdCanXoa);
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

        <button
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm flex-1"
          onClick={() => setShowUploadForm(true)}>
          Tải file
        </button>
      </div>

      {successMessage && <SuccessMessage message={successMessage} />}

      {showUploadForm && (
        <UploadForm
          onCancel={() => setShowUploadForm(false)}
        />
      )}

      {showForm && (
        <SinhVienForm
          sinhVien={sinhVien}
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

      <SinhVienTable
        sinhVienList={sinhVienList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default QuanLySinhVien;