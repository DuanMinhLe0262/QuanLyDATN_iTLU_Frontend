import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";

import QuanLyBaoCao from "../features/sinhvien/pages/QuanLyBaoCao";
import QuanLyDeCuong from "../features/sinhvien/pages/QuanLyDeCuong";
import QuanLyDeTai from "../features/sinhvien/pages/QuanLyDeTai";
import TrangChuSinhVien from "../features/sinhvien/pages/TrangChu";
import SinhVienLayout from "../layouts/SinhVienLayout";


const SinhVienRoutes = () => (
  <Route element={<PrivateRoute allowedRoles={["SINHVIEN"]} />} >
    <Route path="/sinhvien" element={<SinhVienLayout />}>
      <Route index element={<TrangChuSinhVien />} />
      <Route path="baocao" element={<QuanLyBaoCao />} />
      <Route path="decuong" element={<QuanLyDeCuong />} />
      <Route path="detai" element={<QuanLyDeTai />} />
    </Route>
  </Route>
);

export default SinhVienRoutes;
