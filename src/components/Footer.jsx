import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-[#333] py-10 mt-10">
  <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <div>
      <h2 className="text-xl font-semibold mb-4">iTLU</h2>
      <p className="text-sm">
        Chào mừng các bạn đến với hệ thống <strong>iTLU</strong><br />
        Trường Đại học Thủy Lợi
      </p>
    </div>

    <div>
      <h2 className="text-xl font-semibold mb-4">Info</h2>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-blue-500">Trang chủ</a></li>
        <li><a href="#" className="hover:text-blue-500">Thư viện</a></li>
      </ul>
    </div>

    <div>
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <p className="text-sm">
        Nhà C5 - 175 Tây Sơn<br />
        Đống Đa - Hà Nội
      </p>
    </div>

  </div>
</footer>

  );
};

export default Footer;
