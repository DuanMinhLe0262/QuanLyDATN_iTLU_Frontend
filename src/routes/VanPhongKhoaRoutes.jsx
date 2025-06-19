import { Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";

import VanPhongKhoaLayout from "../layouts/VanPhongKhoaLayout";
import TrangChuVanPhongKhoa from "../features/bomon/pages/TrangChu";
import DotDoAn from "../features/vanphongkhoa/pages/DotDoAn";
import SinhVienDuDieuKien from "../features/vanphongkhoa/pages/SinhVienDuDieuKien";
import LichBaoVe from "../features/vanphongkhoa/pages/LichBaoVe";
import DuyetHoiDong from "../features/vanphongkhoa/pages/DuyetHoiDong";
import ThongKe from "../features/vanphongkhoa/pages/ThongKe";
import QuanLySinhVien from "../features/vanphongkhoa/pages/QuanLySinhVien";
import QuanLyGiangVien from "../features/vanphongkhoa/pages/QuanLyGiangVien";

import QuanLyKhoa from "../features/vanphongkhoa/pages/QuanLyKhoa";
import QuanLyBoMon from "../features/vanphongkhoa/pages/QuanLyBoMon";
import QuanLyNganh from "../features/vanphongkhoa/pages/QuanLyNganh";
import QuanLyLop from "../features/vanphongkhoa/pages/QuanLyLopHoc";





const VanPhongKhoaRoutes = () => (
  <Route >
    <Route path="/vanphongkhoa" element={<VanPhongKhoaLayout />}>
      <Route index element={<TrangChuVanPhongKhoa />} />
      <Route path="quanly-dotdoan" element={<DotDoAn />} />
      <Route path="quanlykhoa" element={<QuanLyKhoa />} />
      <Route path="quanlybomon" element={<QuanLyBoMon />} />
      <Route path="quanlynganh" element={<QuanLyNganh />} />
      <Route path="quanlylop" element={<QuanLyLop />} />
      <Route path="quanlysinhvien" element={<QuanLySinhVien />} />

      <Route path="quanlygiangvien" element={<QuanLyGiangVien />} />
      <Route path="quanly-sinhvien" element={<SinhVienDuDieuKien />} />
      <Route path="laplich-baove" element={<LichBaoVe />} />
      <Route path="duyet-hoidong" element={<DuyetHoiDong />} />
      <Route path="thongke" element={<ThongKe />} />
    </Route>
  </Route>
);

export default VanPhongKhoaRoutes;