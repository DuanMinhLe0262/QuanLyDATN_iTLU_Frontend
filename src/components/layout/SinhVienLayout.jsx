import { Outlet, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SinhVienLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-grow">

        <aside className="w-64  p-6 border-r border-gray-300">
          <ul className="space-y-4">
            <li><Link to="/sinhvien">Trang chủ</Link></li>
            <li><Link to="/sinhvien/decuong">Nộp đề cương</Link></li> 
            <li><Link to="/sinhvien/baocao">Nộp báo cáo</Link></li>
          </ul>
        </aside>

        <main className="flex-grow p-6 bg-white">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SinhVienLayout;
