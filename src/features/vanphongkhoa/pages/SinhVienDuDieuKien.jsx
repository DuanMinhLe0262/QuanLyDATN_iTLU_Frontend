import { useState, useEffect } from "react";

import SinhVienForm from "../components/QuanLyDotDoAn/DanhSachSinhVienDuDK/SinhVienForm";
import SinhVienTable from "../components/QuanLyDotDoAn/DanhSachSinhVienDuDK/SinhVienTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import UploadSinhVienDuDieuKien from "../components/QuanLyDotDoAn/DanhSachSinhVienDuDK/UploadSinhVienDuDieuKien";

import sinhVienDotService from "../../../service/SinhVienDotService";
import sinhVienService from "../../../service/SinhVienService";
import FailMessage from "../../../components/common/FailMessage";

const SinhVien = () => {
  const [sinhVienList, setSinhVienList] = useState([]);
  const [showFormUpload, setShowFormUpload] = useState(false);
  const [sinhVien, setSinhVien] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [sinhVienIdCanXoa, setSinhVienIdCanXoa] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getAllSinhVien();
  }, []);

  const getAllSinhVien = async () => {
    try {
      const res = await sinhVienDotService.getAllSinhVien();
      setSinhVienList(res.data.result);
      console.log("Sinh vien : ", res);
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

  useEffect(() => {
    if (failMessage) {
      const timeout = setTimeout(() => setFailMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [failMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSinhVien((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setSinhVien({
      maSinhVien: "",
      hoDem: "",
      ten: "",
      tenLop: "",
      soDienThoai: ""
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEditClick = (row) => {
    setSinhVien({
      id: row.sinhVien?.id || "",
      maSinhVien: row.sinhVien?.maSinhVien || "",
      hoDem: row.sinhVien?.hoDem || "",
      ten: row.sinhVien?.ten || "",
      tenLop: row.sinhVien?.lop?.tenLop || "",
      soDienThoai: row.sinhVien?.soDienThoai || ""
    });
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
        await sinhVienDotService.createSinhVien(sinhVien);
        setSuccessMessage("Thêm sinh viên mới thành công");
      }

      setShowForm(false);
      setSinhVien(null);
      getAllSinhVien();
    } catch (err) {
      setShowForm(false);
      console.error("Lỗi khi lưu sinh viên:", err);
      setFailMessage("Lỗi khi thêm sinh viên: " + (err.response?.data?.message || ""));
    }
  };

  const confirmDelete = async () => {
    try {
      await sinhVienDotService.deleteSinhVien(sinhVienIdCanXoa);
      setSuccessMessage("Xóa sinh viên thành công");
      getAllSinhVien();
    } catch (err) {
      console.error("Lỗi khi xóa sinh viên:", err);
      setFailMessage("Lỗi khi xóa sinh viên");
    } finally {
      setShowConfirm(false);
    }
  };

  const filteredSinhVienList = sinhVienList.filter((row) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      row?.sinhVien?.maSinhVien?.toLowerCase().includes(keyword) ||
      row?.sinhVien?.hoDem?.toLowerCase().includes(keyword) ||
      row?.sinhVien?.ten?.toLowerCase().includes(keyword) ||
      row?.sinhVien?.lop?.tenLop?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="relative overflow-x-auto p-4">
      <div className="flex flex-row w-70 h-12 mb-4">
        <button
          onClick={handleAddClick}
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm flex-1 mr-6 pl-5 pr-5"
        >
          Thêm sinh viên
        </button>

        <button
          onClick={() => setShowFormUpload(true)}
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm flex-1"
        >
          Tải file
        </button>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm sinh viên..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="block w-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5 mt-10"
      />

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

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
        <UploadSinhVienDuDieuKien
          onCancel={() => setShowFormUpload(false)}
          onSuccessUpload={getAllSinhVien}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <SinhVienTable
        sinhVienList={filteredSinhVienList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default SinhVien;
