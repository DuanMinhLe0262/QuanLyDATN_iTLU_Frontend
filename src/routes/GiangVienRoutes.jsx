import { Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";

import GiangVienLayout from "../layouts/GiangVienLayout";
import TrangChuGiangVien from "../features/giangvien/pages/TrangChu"
import DanhSachDeTai from "../features/giangvien/pages/NhapDanhSachDeTai"
import DanhSachSinhVien from "../features/giangvien/pages/NhapDanhSachSinhVien"
import QuanLySinhVien from "../features/giangvien/pages/QuanLySinhVien"

const GiangVienRoutes = () => (

    <Route element={<PrivateRoute allowedRoles={["LECTURE"]} />}>
      <Route path="/giangvien" element={<GiangVienLayout />}>
        <Route index element={<TrangChuGiangVien />} />
        <Route path="danhsachdetai" element={<DanhSachDeTai />} />
        <Route path="danhsachsinhvien" element={<DanhSachSinhVien />} />
        <Route path="quanlysinhvien" element={<QuanLySinhVien />} />
      </Route>
    </Route>
  );

export default GiangVienRoutes;