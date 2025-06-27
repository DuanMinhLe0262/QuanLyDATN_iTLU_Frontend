import { Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";

import GiangVienLayout from "../layouts/GiangVienLayout";
import TrangChuGiangVien from "../features/giangvien/pages/TrangChu"
import DanhSachDeTai from "../features/giangvien/pages/DanhSachDeTai"
import DuyetDeTai from "../features/giangvien/pages/DuyetDeTai"
import DanhSachSinhVien from "../features/giangvien/pages/NhapDanhSachSinhVien"
import QuanLySinhVienHuongDan from "../features/giangvien/pages/QuanLySinhVienHuongDan"

const GiangVienRoutes = () => (

  <Route element={<PrivateRoute allowedRoles={["GIANGVIEN"]} />}>
    <Route path="/giangvien" element={<GiangVienLayout />}>
      <Route index element={<TrangChuGiangVien />} />
      <Route path="danhsachdetai" element={<DanhSachDeTai />} />
      <Route path="duyetdetai" element={<DuyetDeTai />} />
      <Route path="danhsachsinhvien" element={<DanhSachSinhVien />} />
      <Route path="quanlysinhvienhuongdan" element={<QuanLySinhVienHuongDan />} />
    </Route>
  </Route>
);

export default GiangVienRoutes;