import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const roles = userInfo?.roles || [];
  const hasBoMonRole = roles.includes("BOMON");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chào mừng bạn đến với iTLU</h1>

      <aside className="...">
        <ul className="...">
          <li>
            <p>Đây là trang dành cho giảng viên.</p>
          </li>
          {hasBoMonRole && (
            <li className="mt-5">
              <NavLink to="/bomon"><span className="text-blue-800">Chuyển đến trang bộ môn</span></NavLink>
            </li>
          )}
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
