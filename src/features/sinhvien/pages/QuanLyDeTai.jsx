import { useState, useEffect } from "react";

import DeTaiForm from "../components/QuanLyDeTai/DeTaiForm";
import DeTaiTable from "../components/QuanLyDeTai/DeTaiTable";
import SuccessMessage from "../../../components/common/SuccessMessage";
import FailMessage from "../../../components/common/FailMessage";
import deTaiService from "../../../service/DeTaiService";

const GiangVienHuongDanThamGia = () => {
  const [deTaiList, setdeTaiList] = useState(null);
  const [deTai, setDeTai] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    getDeTaiBySinhVienId();
  }, []);

  const getDeTaiBySinhVienId = async () => {
    try {
      const res = await deTaiService.getDeTaiBySinhVienId();
      setdeTaiList(res.data.result);
      console.log("Sinh vien : ", res);

    } catch (err) {
      console.log("loi lay de tai : ", err);
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
    setDeTai((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setDeTai({
      tenDeTai: "",
      moTa: "",
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEditClick = (deTai) => {
    setDeTai(deTai);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await deTaiService.updateDeTai(deTai.id, deTai);
        setSuccessMessage("Cập nhật đề tài thành công");
      } else {
        await deTaiService.createDeTai(deTai);
        setSuccessMessage("Đăng ký đề tài thành công");
      }

      setShowForm(false);
      setDeTai(null);
      getDeTaiBySinhVienId();
    } catch (err) {
      setShowForm(false);
      console.error("Lỗi khi lưu đề tài:", err.response?.data?.message);
      setFailMessage("Lỗi khi lưu đề tài: " + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="relative overflow-x-auto p-4">

      <button
        onClick={handleAddClick}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-10"
      >
        Thêm đề tài
      </button>

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

      {showForm && (
        <DeTaiForm
          deTai={deTai}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEdit={isEdit}
        />
      )}

      <DeTaiTable
        deTai={deTaiList}
        onEdit={handleEditClick}
      />
    </div>
  );
};

export default GiangVienHuongDanThamGia;
