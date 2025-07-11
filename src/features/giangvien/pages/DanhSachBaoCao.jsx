import { useState, useEffect } from "react";
import BaoCaoTable from "../components/QuanLyBaoCao/BaoCaoTable";
import FormBaoCao from "../components/QuanLyBaoCao/FormBaoCao";
import SuccessMessage from "../../../components/common/SuccessMessage";
import taiLieuService from "../../../service/TaiLieuService";

const DanhSachBaoCao = () => {
  const [deTaiList, setDeTaiList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [deTaiDetail, setDeTaiDetail] = useState(null);
  const [showDetailForm, setShowDetailForm] = useState(false);

  useEffect(() => {
    getAllDeTaiSVHD();
  }, []);

  const getAllDeTaiSVHD = async () => {
    try {
      const res = await taiLieuService.getAllBaoCaoSVHD();
      setDeTaiList(res.data.result);
      console.log("baocao debug: ", res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bao cao:", err);
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

      <BaoCaoTable deTaiList={deTaiList} onDetail={handleDetailClick} />

      {showDetailForm && deTaiDetail && (
        <FormBaoCao
          deTai={deTaiDetail}
          onCancel={() => setShowDetailForm(false)}
        />
      )}
    </div>
  );
};

export default DanhSachBaoCao;