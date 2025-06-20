import { Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import BoMonLayout from "../layouts/BoMonLayout";
import TrangChuBoMon from "../features/bomon/pages/TrangChu";
import DeXuatHoiDong from "../features/bomon/pages/DeXuatHoiDong";
import DuyetDeCuong from "../features/bomon/pages/DuyetDeCuong";
import PhanBoHoiDong from "../features/bomon/pages/PhanBoHoiDong";
import PhanCongGiangVien from "../features/bomon/pages/PhanCongGiangVien";
import QuanLyDeTaiGoiY from "../features/bomon/pages/QuanLyDeTaiGoiY";
import QuanLyGiangVienGoiY from "../features/bomon/pages/QuanLyGiangVienGoiY";

const BoMonRoutes = () => (
      <Route element={<PrivateRoute allowedRoles={["DEPARTMENT"]} />}>
        <Route path="/bomon" element={<BoMonLayout />}>
          <Route index element={<TrangChuBoMon />} />
          <Route path="dexuathoidong" element={<DeXuatHoiDong />} />
          <Route path="duyetdecuong" element={<DuyetDeCuong />} />
          <Route path="phanbohoidong" element={<PhanBoHoiDong />} />
          <Route path="phanconggiangvien" element={<PhanCongGiangVien />} />
          <Route path="detaigoiy" element={<QuanLyDeTaiGoiY />} />
          <Route path="giangviengoiy" element={<QuanLyGiangVienGoiY />} />
        </Route>
      </Route>
);

export default BoMonRoutes;
