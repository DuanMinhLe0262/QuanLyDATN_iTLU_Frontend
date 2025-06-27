import React, { useEffect, useState } from "react";
import deTaiService from "../../../service/DeTaiService";
import ChiTietDeTai from "../components/DeTaiCuaToi/ChiTietDeTai";
import FormDangKyDeTai from "../components/DeTaiCuaToi/FormDangKyDeTai";

const DeTaiCuaToi = () => {
  const [deTai, setDeTai] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ tenDeTai: "", moTa: "" });

  const fetchDeTai = async () => {
    try {
      const res = await deTaiService.getDeTaiCuaToi();
      setDeTai(res.data.result);
    } catch (error) {
      console.error("Lỗi khi lấy đề tài:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeTai();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tenDeTai.trim() || !formData.moTa.trim()) return;

    try {
      await deTaiService.createDeTai(formData);
      setShowForm(false);
      setFormData({ tenDeTai: "", moTa: "" });
      fetchDeTai();
    } catch (err) {
      console.error("Lỗi khi gửi đề xuất:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Đề tài của tôi</h1>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : !deTai ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Bạn chưa có đề tài nào.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Đăng ký đề tài
          </button>
        </div>
      ) : (
        <ChiTietDeTai deTai={deTai} />
      )}

      {showForm && (
        <FormDangKyDeTai
          deTai={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={setShowForm}
          isEdit={false}
        />
      )}
    </div>
  );
};

export default DeTaiCuaToi;
