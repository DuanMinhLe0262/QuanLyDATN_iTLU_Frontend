import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const roles = userInfo?.roles || [];
  const hasGiangVienRole = roles.includes("GIANGVIEN");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chào mừng bạn đến với iTLU</h1>

      <aside className="...">
        <ul className="...">
          <li>
            <p>Đây là trang dành cho bộ môn.</p>
          </li>
          {hasGiangVienRole && (
            <li className="mt-5">
              <NavLink to="/giangvien"><span className="text-blue-700 ">Chuyển đến trang giảng viên</span></NavLink>
            </li>
          )}
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
