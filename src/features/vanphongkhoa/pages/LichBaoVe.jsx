import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";

import LichBaoVeForm from "../components/QuanLyDotDoAn/LichBaoVe/LichBaoVeForm";
import LichBaoVeTable from "../components/QuanLyDotDoAn/LichBaoVe/LichBaoVeTable";
import ConfirmDialog from "../components/QuanLyDotDoAn/DotDoAn/ConFirmDialog";
import SuccessMessage from "../../../components/common/SuccessMessage";
import FailMessage from "../../../components/common/FailMessage";

import hoiDongService from "../../../service/HoiDongService";
import lichBaoVeService from "../../../service/LichBaoVeService";

const LichBaoVe = () => {
  const [lichList, setLichList] = useState([]);
  const [lich, setLich] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [hoiDongList, setHoiDongList] = useState([]);

  useEffect(() => {
    getAllLich();
    fetchHoiDongList();
  }, []);

  const getAllLich = async () => {
    try {
      const res = await lichBaoVeService.getAllLichBaoVe();
      setLichList(res.data.result);
      console.log("debug: ", res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách lịch:", err);
      setFailMessage("Lỗi khi lấy danh sách lịch: " + (err.response?.data?.message || ""));
    }
  };

  const fetchHoiDongList = async () => {
    try {
      const res = await hoiDongService.getHoiDongDaDuyet();
      setHoiDongList(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách hội đồng:", err);
      setFailMessage("Lỗi khi lấy danh sách hội đồng: " + (err.response?.data?.message || ""));
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
    setLich((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setLich({
      hoiDongId: "",
      diaDiem: "",
      ngay: "",
      gioBatDau: "",
      gioKetThuc: "",
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await lichBaoVeService.updateLichBaoVe(lich.id, lich);
        setSuccessMessage("Cập nhật lịch thành công");
      } else {
        await lichBaoVeService.createLichBaoVe(lich);
        setSuccessMessage("Thêm lịch thành công");
      }
      setShowForm(false);
      setLich(null);
      getAllLich();
    } catch (err) {
      setShowForm(false);
      console.error("Lỗi khi lưu lịch:", err);
      setFailMessage("Lỗi khi lưu lịch: " + (err.response?.data?.message || ""));
    }
  };

  const handleEditClick = (lichSelected) => {
    setLich({
      ...lichSelected,
      hoiDongId: lichSelected.hoiDongId || "",
      diaDiem: lichSelected.diaDiem || "",
      ngay: lichSelected.ngay || "",
      gioBatDau: lichSelected.gioBatDau || "",
      gioKetThuc: lichSelected.gioKetThuc || "",
    });
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await lichBaoVeService.deleteLichBaoVe(deleteId);
      setSuccessMessage("Xóa lịch thành công");
      getAllLich();
    } catch (err) {
      console.error("Lỗi khi xóa lịch:", err);
      setFailMessage("Lỗi khi xóa lịch: " + (err.response?.data?.message || ""));
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
        Thêm lịch
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

      {showForm && (
        <LichBaoVeForm
          lich={lich}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
          hoiDongList={hoiDongList}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <LichBaoVeTable
        lichList={lichList}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default LichBaoVe;
