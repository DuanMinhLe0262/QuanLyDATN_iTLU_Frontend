import { useState, useEffect } from "react";

import FormChiTietDeTai from "../components/QuanLyDeTaiDoAn/FormChiTietDeTai";
import SinhVienTable from "../components/QuanLyDeTaiDoAn/SinhVienTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import sinhVienHuongDanService from "../../../service/SinhVienHuongdanService";

import UploadForm from "../components/QuanLySinhVienHuongDan/UploadForm";

const DanhSachDeTai = () => {
  const [sinhVienList, setSinhVienList] = useState([]);
  const [sinhVien, setSinhVien] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
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
    setSinhVien(sinhVien);
    setIsEdit(true);
    setShowForm(true);
  };


  const handleDetailClick = (sinhVien) => {
    setSinhVien(sinhVien);
    setShowDetailForm(true);
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

      {successMessage && <SuccessMessage message={successMessage} />}


      {showForm && (
        <FormChiTietDeTai
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
        onDetail={handleDetailClick}
        onEdit={handleEditClick}

        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default DanhSachDeTai;