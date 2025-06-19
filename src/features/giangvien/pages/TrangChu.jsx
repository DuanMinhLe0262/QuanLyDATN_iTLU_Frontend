import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chào mừng bạn đến với iTLU</h1>

      <aside className="...">
        <ul className="...">
          <li><NavLink to="/giangvien">Trang giảng viên</NavLink></li>
          <li><NavLink to="/bomon">Trang bộ môn</NavLink></li>
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
