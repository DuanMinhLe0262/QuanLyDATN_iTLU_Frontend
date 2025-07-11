import { useState, useEffect } from "react";
import giangVienDotService from "../../../service/GiangVienDotService";
import sinhVienService from "../../../service/SinhVienService";
import sinhVienHuongDanService from "../../../service/SinhVienHuongdanService";
import SuccessMessage from "../../../components/common/SuccessMessage";
import FailMessage from "../../../components/common/FailMessage";

const PhanCongGiangVien = () => {
  const [danhSachGiangVien, setDanhSachGiangVien] = useState([]);
  const [danhSachSinhVien, setDanhSachSinhVien] = useState([]);
  const [giangVienId, setGiangVienId] = useState("");
  const [selectedSinhViens, setSelectedSinhViens] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    fetchGiangVien();
    fetchSinhVien();
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

  const fetchGiangVien = async () => {
    try {
      const res = await giangVienDotService.getAllGiangVien();
      setDanhSachGiangVien(res.data.result);
      console.log("Danh sách giảng viên:", res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách giảng viên:", error);
    }
  };

  const fetchSinhVien = async () => {
    try {
      const res = await sinhVienService.getAllSinhVienChuaCoGVHD();
      setDanhSachSinhVien(res.data.result);
      console.log("Danh sách sinhvien:", res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách sinh viên:", error);
    }
  };

  const handleCheckboxChange = (maSinhVien) => {
    if (selectedSinhViens.includes(maSinhVien)) {
      setSelectedSinhViens(selectedSinhViens.filter((m) => m !== maSinhVien));
    } else {
      setSelectedSinhViens([...selectedSinhViens, maSinhVien]);
    }
  };

  const handlePhanCong = async () => {
    if (!giangVienId) {
      setFailMessage("Vui lòng chọn giảng viên");
      return;
    }
    if (selectedSinhViens.length === 0) {
      setFailMessage("Vui lòng chọn ít nhất 1 sinh viên");
      return;
    }

    const payload = {
      danhSachMaSinhVien: selectedSinhViens,
      maGiangVien: giangVienId
    };

    try {
      await sinhVienHuongDanService.multipleCreateSinhVienHuongDan(payload);
      setSuccessMessage("Phân công thành công");
      setSelectedSinhViens([]);
      setGiangVienId("");
      await fetchSinhVien();
    } catch (error) {
      console.error("Lỗi phân công giảng viên:", error);
      setFailMessage("Có lỗi xảy ra khi phân công");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Phân công giảng viên hướng dẫn</h1>

      <div className="relative z-0 w-1/2 mt-20 mb-5  group">
        <label
          htmlFor="giangVienId"
          className="block text-sm/6 font-medium text-gray-900 mb-2">
          Chọn giảng viên hướng dẫn
        </label>
        <select
          id="giangVienId"
          value={giangVienId}
          onChange={(e) => setGiangVienId(e.target.value)}
          required
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"
        >
          <option value="">--Chọn giảng viên--</option>
          {danhSachGiangVien.map((gv) => (
            <option key={gv.id} value={gv.giangVien?.maGiangVien}>
              {gv.giangVien?.maGiangVien} - {gv.giangVien?.hoDem}{gv.giangVien?.ten}
            </option>
          ))}
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">MSV</th>
              <th className="py-3 px-4">Họ</th>
              <th className="py-3 px-4">Tên</th>
              <th className="py-3 px-4">Lớp</th>
              <th className="py-3 px-4">Ngành</th>
              <th className="py-3 px-4 text-center">Chọn</th>
            </tr>
          </thead>
          <tbody>
            {danhSachSinhVien.map((sv, index) => (
              <tr key={sv.id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{sv.maSinhVien}</td>
                <td className="py-2 px-4">{sv.hoDem}</td>
                <td className="py-2 px-4">{sv.ten}</td>
                <td className="py-2 px-4">{sv.lop?.tenLop}</td>
                <td className="py-2 px-4">{sv.lop?.nganh?.tenNganh}</td>
                <td className="py-2 px-4 text-center">
                  <input
                    type="checkbox"
                    className="accent-blue-600 w-4 h-4"
                    checked={selectedSinhViens.includes(sv.maSinhVien)}
                    onChange={() => handleCheckboxChange(sv.maSinhVien)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {successMessage && <SuccessMessage message={successMessage} />}
      {failMessage && <FailMessage message={failMessage} />}

      <button
        onClick={handlePhanCong}
        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Phân công
      </button>
    </>
  );
};

export default PhanCongGiangVien;
