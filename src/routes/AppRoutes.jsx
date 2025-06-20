import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login"

import SinhVienRoutes from "./SinhVienRoutes";
import BoMonRoutes from "./BoMonRoutes";
import GiangVienRoutes from "./GiangVienRoutes";
import VanPhongKhoaRoutes from "./VanPhongKhoaRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {VanPhongKhoaRoutes()}
        {SinhVienRoutes()}
        {BoMonRoutes()}
        {GiangVienRoutes()}

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
