import SinhVienLayout from "@/components/layout/SinhVienLayout";
import DeCuong from "@/pages/sinhvien/DeCuong";
import Login from "@/components/Login";
import BaoCao from "@/pages/sinhvien/BaoCao";
import TrangChu from "@/pages/sinhvien/TrangChu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element = {<Login/>}/>
          <Route path="/sinhvien" element = {<SinhVienLayout/>}>
          <Route index element = {<TrangChu/>}/>
          <Route path="decuong" element = {<DeCuong/>}/>
          <Route path="baocao" element = {<BaoCao/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
