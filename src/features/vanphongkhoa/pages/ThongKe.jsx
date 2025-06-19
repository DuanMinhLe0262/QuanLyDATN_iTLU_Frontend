const ThongKe = () => {
  const stats = [
    {
      title: "Sinh viên đủ điều kiện",
      value: 123,
      color: "bg-blue-500",
    },
    {
      title: "Đề tài đã đăng ký",
      value: 85,
      color: "bg-green-500",
    },
    {
      title: "Đề cương đã duyệt",
      value: 76,
      color: "bg-yellow-500",
    },
    {
      title: "Số lượng hội đồng",
      value: 12,
      color: "bg-purple-500",
    },
    {
      title: "Số buổi bảo vệ",
      value: 8,
      color: "bg-red-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Thống kê tổng quan</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow-md text-white ${item.color} hover:scale-105 transition-transform duration-200`}
          >
            <div className="text-sm opacity-90">{item.title}</div>
            <div className="text-3xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Placeholder cho biểu đồ */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center text-gray-500">
        <p className="text-lg font-medium mb-2">Biểu đồ thống kê theo đợt</p>
      </div>
    </div>
  );
};

export default ThongKe;
