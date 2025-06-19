import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login"
import VanPhongKhoaRoutes from "../routes/VanPhongKhoaRoutes"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {VanPhongKhoaRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
