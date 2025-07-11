import { Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import BoMonLayout from "../layouts/BoMonLayout";
import TrangChuBoMon from "../features/bomon/pages/TrangChu";
import DeXuatHoiDong from "../features/bomon/pages/DeXuatHoiDong";
import DuyetDeCuong from "../features/bomon/pages/DuyetDeCuong";
import PhanBoSinhVien from "../features/bomon/pages/PhanBoSinhVien";
import PhanCongGiangVien from "../features/bomon/pages/PhanCongGiangVien";


const BoMonRoutes = () => (
      <Route element={<PrivateRoute allowedRoles={["BOMON"]} />} >
        <Route path="/bomon" element={<BoMonLayout />}>
          <Route index element={<TrangChuBoMon />} />
          <Route path="dexuathoidong" element={<DeXuatHoiDong />} />
          <Route path="duyetdecuong" element={<DuyetDeCuong />} />
          <Route path="phanbosinhvien" element={<PhanBoSinhVien />} />
          <Route path="phanconggiangvien" element={<PhanCongGiangVien />} />
        </Route>
      </Route>
);

export default BoMonRoutes;
