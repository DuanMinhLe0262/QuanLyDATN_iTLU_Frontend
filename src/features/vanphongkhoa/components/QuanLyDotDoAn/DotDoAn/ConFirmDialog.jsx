import React from "react";
import { PiWarningCircle } from "react-icons/pi";

const ConfirmDialog = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />
      <div className="fixed left-130 w-2/7 h-1/3 bg-white z-5 rounded-xl">
        <div className="p-4 md:p-5 text-center">
          <PiWarningCircle className="text-gray-400 mx-auto" size={60} />
          <h3 className="mb-5 text-lg font-normal text-gray-500">Bạn có chắc chắn muốn xóa không?</h3>
          <div className="flex justify-center gap-4 mt-10 ml-13">
            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 flex-3" onClick={onConfirm}>Xóa</button>
            <button className="text-black bg-white hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto  px-5 py-2.5 text-center flex-3 mr-15 border border-gray-200" onClick={onCancel}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;