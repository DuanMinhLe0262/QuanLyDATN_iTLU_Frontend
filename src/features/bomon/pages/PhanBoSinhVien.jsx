import React, { useState, useEffect } from "react";
import PhanBoSinhVienForm from "../components/PhanBoSinhVien/PhanBoSinhVienForm";
import PhanBoList from "../components/PhanBoSinhVien/PhanBoList";
import PhanBoDetail from "../components/PhanBoSinhVien/PhanBoDetail";
import hoiDongService from "../../../service/HoiDongService";
import SinhVienService from "../../../service/SinhVienService";
import SinhVienDotService from "../../../service/SinhVienDotService";
import SuccessMessage from "../../../components/common/SuccessMessage";
import FailMessage from "../../../components/common/FailMessage";

const PhanBoSinhVien = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [sinhVienList, setSinhVienList] = useState([]);
  const [hoiDongList, setHoiDongList] = useState([]);
  const [selectedHoiDongId, setSelectedHoiDongId] = useState("");
  const [selectedLichDetail, setSelectedLichDetail] = useState(null); 
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    fetchSinhVien();
    fetchHoiDong();
  }, []);

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

  const fetchSinhVien = async () => {
    try {
      const res = await SinhVienService.getAllSinhVien();
      setSinhVienList(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách sinh viên:", error);
    }
  };

  const fetchHoiDong = async () => {
    try {
      const res = await hoiDongService.getAllHoiDongDetailByBoMon();
      setHoiDongList(res.data.result);
      console.log("debug: hoidong", res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách hội đồng:", error);
    }
  };

  const handlePhanBo = () => {
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      const requestData = {
        lichBaoVeId: data.selectedLichBaoVeId,
        danhSachMaSinhVien: data.selectedStudents,
      };
      await SinhVienDotService.phanBoSinhVien(requestData);
      setSuccessMessage("Phân bổ thành công");
      setShowForm(false);
      await fetchSinhVien();
    } catch (error) {
      setShowForm(false);
      console.error("Lỗi khi phân bổ:", error);
      setFailMessage("Có lỗi xảy ra khi phân bổ");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedHoiDongId("");
  };

const handleViewDetail = (lich) => {
  const danhSachMaSinhVien = lich.danhSachSinhVien?.map((sv) => sv.sinhVien?.maSinhVien) || [];
  setSelectedLichDetail({
    ...lich,
    danhSachMaSinhVien: danhSachMaSinhVien,
  });
  setShowDetailForm(true);
};


  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Danh sách phân bổ sinh viên</h2>

      <button
        className="text-white bg-blue-600 hover:bg-blue-700 shadow-md font-medium rounded-lg text-sm px-5 py-2.5 mb-5"
        onClick={handlePhanBo}
      >
        Phân bổ
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

      {showForm && (
        <PhanBoSinhVienForm
          sinhVienList={sinhVienList}
          hoiDongList={hoiDongList}
          selectedHoiDongId={selectedHoiDongId}
          setSelectedHoiDongId={setSelectedHoiDongId}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}

      {showDetailForm && selectedLichDetail && (
        <PhanBoDetail
          sinhVienList={sinhVienList}
          hoiDongList={hoiDongList}
          selectedHoiDongId={selectedLichDetail.hoiDong.id}
          selectedLichBaoVeId={selectedLichDetail.id}
          selectedStudents={selectedLichDetail.danhSachMaSinhVien || []}
          onClose={() => setShowDetailForm(false)}
        />
      )}

      <PhanBoList
        hoiDongList={hoiDongList}
        onView={handleViewDetail}
        onDelete={(lichId) => {
          console.log("Xóa lịch với ID:", lichId);
        }}
      />
    </div>
  );
};

export default PhanBoSinhVien;
