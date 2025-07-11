import { useState, useEffect } from "react";
import SinhVienTable from "../components/QuanLyDeTaiDoAn/SinhVienTable";
import FormChiTietDeTai from "../components/QuanLyDeTaiDoAn/FormChiTietDeTai";
import SuccessMessage from "../../../components/common/SuccessMessage";
import deTaiService from "../../../service/DeTaiService";

const DanhSachDeTai = () => {
  const [deTaiList, setDeTaiList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [deTaiDetail, setDeTaiDetail] = useState(null);
  const [showDetailForm, setShowDetailForm] = useState(false);

  useEffect(() => {
    getAllDeTaiSVHD();
  }, []);

  const getAllDeTaiSVHD = async () => {
    try {
      const res = await deTaiService.getAllDeTaiSVHD();
      setDeTaiList(res.data.result);
      console.log("detai debug: ", res.data.result);
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

  const handleDetailClick = (sinhVien) => {
    setDeTaiDetail(sinhVien);
    setShowDetailForm(true);
  };

  return (
    <div className="relative overflow-x-auto p-4">
      {successMessage && <SuccessMessage message={successMessage} />}

      <SinhVienTable deTaiList={deTaiList} onDetail={handleDetailClick} />

      {showDetailForm && deTaiDetail && (
        <FormChiTietDeTai
          deTai={deTaiDetail}
          onCancel={() => setShowDetailForm(false)}
        />
      )}
    </div>
  );
};

export default DanhSachDeTai;