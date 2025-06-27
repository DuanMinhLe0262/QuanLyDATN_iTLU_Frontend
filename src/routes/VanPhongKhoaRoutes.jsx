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
    <Route element={<PrivateRoute allowedRoles={["KHOA"]} />}>
      <Route path="/vanphongkhoa" element={<VanPhongKhoaLayout />}>
        <Route index element={<TrangChuVanPhongKhoa />} />

        <Route path="tochuc/khoa" element={<QuanLyKhoa />} />
        <Route path="tochuc/bomon" element={<QuanLyBoMon />} />
        <Route path="tochuc/nganh" element={<QuanLyNganh />} />
        <Route path="tochuc/lop" element={<QuanLyLop />} />

        <Route path="nguoidung/sinhvien" element={<QuanLySinhVien />} />
        <Route path="nguoidung/giangvien" element={<QuanLyGiangVien />} />

        <Route path="doan/dotdoan" element={<DotDoAn />} />
        <Route path="doan/svddk" element={<SinhVienDuDieuKien />} />
        <Route path="doan/lich" element={<LichBaoVe />} />
        <Route path="doan/hodong" element={<DuyetHoiDong />} />

        <Route path="thongke" element={<ThongKe />} />

      </Route>
    </Route>
);

export default VanPhongKhoaRoutes;
