import { useState, useEffect } from "react";

import GiangVienForm from "../components/QuanLyDotDoAn/DanhSachGiangVienThamGia/GiangVienForm";
import GiangVienTable from "../components/QuanLyDotDoAn/DanhSachGiangVienThamGia/GiangVienTable";
import ConfirmDialog from "../../../components/common/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import UploadGiangVienThamGia from "../components/QuanLyDotDoAn/DanhSachGiangVienThamGia/UploadGiangVienThamGia";

import giangVienDotService from "../../../service/GiangVienDotService";
import FailMessage from "../../../components/common/FailMessage";

const GiangVienHuongDanThamGia = () => {
  const [giangVienList, setGiangVienList] = useState([]);
  const [showFormUpload, setShowFormUpload] = useState(false);
  const [giangVien, setGiangVien] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [IdGiangVienCanXoa, setIdGiangVienCanXoa] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getAllGiangVien();
  }, []);

  const getAllGiangVien = async () => {
    try {
      const res = await giangVienDotService.getAllGiangVien();
      setGiangVienList(res.data.result);
      console.log("Giang vien: ", res);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách giảng viên:", err);
      setFailMessage("Lỗi khi lấy danh sách giảng viên: " + (err.response?.data?.message || ""));
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
    setGiangVien((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setGiangVien({
      hoDem: "",
      ten: "",
      maGiangVien: "",
      soDienThoai: "",
      tenBoMon: "",
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
    setIdGiangVienCanXoa(id);
    setShowConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await giangVienDotService.updateGiangVien(giangVien.id, giangVien);
        setSuccessMessage("Cập nhật giảng viên thành công");
      } else {
        await giangVienDotService.createGiangVien(giangVien);
        setSuccessMessage("Thêm giảng viên mới thành công");
      }

      setShowForm(false);
      setGiangVien(null);
      getAllGiangVien();
    } catch (err) {
      setShowForm(false);
      console.error("Lỗi khi lưu giảng viên:", err);
      setFailMessage("Lỗi khi lưu giảng viên: " + (err.response?.data?.message || ""));
    }
  };

  const confirmDelete = async () => {
    try {
      await giangVienDotService.deleteGiangVien(IdGiangVienCanXoa);
      setSuccessMessage("Xóa giảng viên thành công");
      getAllGiangVien();
    } catch (err) {
      console.error("Lỗi khi xóa giảng viên:", err);
      setFailMessage("Lỗi khi xóa giảng viên");
    } finally {
      setShowConfirm(false);
    }
  };

  const filteredGiangVienList = giangVienList.filter((row) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      row?.giangVien?.maGiangVien?.toLowerCase().includes(keyword) ||
      row?.giangVien?.hoDem?.toLowerCase().includes(keyword) ||
      row?.giangVien?.ten?.toLowerCase().includes(keyword) ||
      row?.giangVien?.user?.email?.toLowerCase().includes(keyword) ||
      row?.giangVien?.soDienThoai?.toLowerCase().includes(keyword) ||
      row?.giangVien?.boMon?.tenBoMon?.toLowerCase().includes(keyword) ||
      row?.giangVien?.boMon?.khoa?.tenKhoa?.toLowerCase().includes(keyword) ||
      row?.dot?.tenDot?.toLowerCase().includes(keyword)
    );
  });

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
          onClick={() => setShowFormUpload(true)}
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm flex-1"
        >
          Tải file
        </button>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm giảng viên..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="block w-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5 mt-10"
      />

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

      {showForm && (
        <GiangVienForm
          giangVien={giangVien}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      {showFormUpload && (
        <UploadGiangVienThamGia
          onCancel={() => setShowFormUpload(false)}
          onSuccessUpload={getAllGiangVien}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <GiangVienTable
        giangVienList={filteredGiangVienList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default GiangVienHuongDanThamGia;
