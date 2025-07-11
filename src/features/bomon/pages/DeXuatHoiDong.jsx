import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";

import HoiDongForm from "../components/DeXuatHoiDong/HoiDongForm";
import HoiDongTable from "../components/DeXuatHoiDong/HoiDongTable";
import SuccessMessage from "../../../components/common/SuccessMessage";
import FailMessage from "../../../components/common/FailMessage";
import hoiDongService from "../../../service/HoiDongService";

const DeXuatHoiDong = () => {
  const [hoiDongList, setHoiDongList] = useState([]);
  const [hoiDong, setHoiDong] = useState({
    tenHoiDong: "",
    chuTichId: "",
    thuKyId: "",
    uyVien1Id: "",
    uyVien2Id: "",
    uyVien3Id: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    getAllHoiDong();
  }, []);

  const getAllHoiDong = async () => {
    try {
      const res = await hoiDongService.getAllHoiDongDetail();
      setHoiDongList(res.data.result);
      console.log("debug: ", res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách:", err);
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

  const handleAddClick = () => {
    setHoiDong({
      tenHoiDong: "",
      chuTichId: "",
      thuKyId: "",
      uyVien1Id: "",
      uyVien2Id: "",
      uyVien3Id: "",
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHoiDong((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await hoiDongService.createHoiDongVaHDGV(hoiDong);
      setSuccessMessage("Thêm hội đồng mới thành công");
      setShowForm(false);
      getAllHoiDong();
    } catch (err) {
      setShowForm(false);
      setFailMessage("Lỗi khi thêm hội đồng: " + (err.response?.data?.message || ""));
      console.error("Lỗi khi thêm hội đồng:", err);
    }
  };

  // Tính danh sách giảng viên đang bận
  const busyGiangVienIds = hoiDongList
    .filter(hd => hd.trangThai === "CHO_DUYET" || hd.trangThai === "DA_DUYET")
    .flatMap(hd => hd.danhSachGiangVien.map(gv => gv.giangVien.id));

  return (
    <div className="relative overflow-x-auto p-4">
      <button
        onClick={handleAddClick}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-10"
      >
        <IoAddOutline className="inline mr-2 mb-0.5 size-5" />
        Thêm hội đồng
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

      {showForm && (
        <HoiDongForm
          hoiDong={hoiDong}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
          busyGiangVienIds={busyGiangVienIds}
        />
      )}

      <HoiDongTable hoiDongList={hoiDongList} />
    </div>
  );
};

export default DeXuatHoiDong;
