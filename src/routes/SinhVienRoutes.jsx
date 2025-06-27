import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";

import BaoCao from "../features/sinhvien/pages/BaoCao";
import DeCuong from "../features/sinhvien/pages/DeCuong";
import DeTaiGoiY from "../features/sinhvien/pages/DeTaiGoiY";
import DeTaiCuaToi from "../features/sinhvien/pages/DeTaiCuaToi";
import GiangVienHd from "../features/sinhvien/pages/GiangVienHd";
import TrangChuSinhVien from "../features/sinhvien/pages/TrangChu";
import SinhVienLayout from "../layouts/SinhVienLayout";

const SinhVienRoutes = () => (
  <Route element={<PrivateRoute allowedRoles={["SINHVIEN"]} />}>
    <Route path="/sinhvien" element={<SinhVienLayout />}>
      <Route index element={<TrangChuSinhVien />} />
      <Route path="baocao" element={<BaoCao />} />
      <Route path="decuong" element={<DeCuong />} />
      <Route path="dangkydetai" element={<DeTaiCuaToi />} />
      <Route path="detaigoiy" element={<DeTaiGoiY />} />
      <Route path="giangvienhd" element={<GiangVienHd />} />
    </Route>
  </Route>
);

export default SinhVienRoutes;
