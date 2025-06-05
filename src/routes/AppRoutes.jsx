import SinhVienLayout from "@/components/layout/SinhVienLayout";
import DeCuong from "@/pages/sinhvien/DeCuong";
import Login from "@/components/Login";
import BaoCao from "@/pages/sinhvien/BaoCao";
import TrangChuSinhVien from "@/pages/sinhvien/TrangChu";
import TrangChuGiangVien from "@/pages/giangvien/TrangChu";
import TrangChuBoMon from "@/pages/bomon/TrangChu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeTaiGoiY from "@/pages/sinhvien/DeTaiGoiY";
import GiangVienHd from "@/pages/sinhvien/GiangVienHd";
import GiangVienLayout from "../components/layout/GiangVienLayout";
import BoMonLayout from "../components/layout/BoMonLayout";
import NhapDanhSachSinhVien from "../pages/giangvien/NhapDanhSachSinhVien";
import NhapDanhSachDeTai from "../pages/giangvien/NhapDanhSachDeTai";
import QuanLySinhVien from "../pages/giangvien/QuanLySinhVien";
import QuanLyDeTaiGoiY from "../pages/bomon/QuanLyDeTaiGoiY";
import QuanLyGiangVienGoiY from "../pages/bomon/QuanLyGiangVienGoiY";
import PhanCongGiangVien from "../pages/bomon/PhanCongGiangVien";
import DuyetDeCuong from "../pages/bomon/DuyetDeCuong";
import DeXuatHoiDong from "../pages/bomon/DeXuatHoiDong";
import PhanBoHoiDong from "../pages/bomon/PhanBoHoiDong";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/sinhvien" element={<SinhVienLayout />}>
          <Route index element={<TrangChuSinhVien />} />
          <Route path="giangvienhd" element={<GiangVienHd />} />
          <Route path="detaigoiy" element={<DeTaiGoiY />} />
          <Route path="decuong" element={<DeCuong />} />
          <Route path="baocao" element={<BaoCao />} />
        </Route>


        <Route path="/giangvien" element={<GiangVienLayout />}>
          <Route index element={<TrangChuGiangVien />} />
          <Route path="nhapdanhsach" element={<NhapDanhSachSinhVien />} />
          <Route path="nhapdetai" element={<NhapDanhSachDeTai />} />
          <Route path="quanlysinhvien" element={<QuanLySinhVien />} />
        </Route>


        <Route path="/bomon" element={<BoMonLayout />}>
          <Route index element={<TrangChuBoMon />} />
          <Route path="quanly-detaigoiy" element={<QuanLyDeTaiGoiY />} />
          <Route path="phancong-giangvien" element={<PhanCongGiangVien />} />
          <Route path="duyet-decuong" element={<DuyetDeCuong />} />
          <Route path="dexuat-hoidong" element={<DeXuatHoiDong />} />
          <Route path="phanbo-hoidong" element={<PhanBoHoiDong />} />
          <Route path="quanly-giangvien" element={<QuanLyGiangVienGoiY />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes;
