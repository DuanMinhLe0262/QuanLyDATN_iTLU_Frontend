const DeTaiForm = ({ deTai, onChange, onSubmit, onCancel, isEdit }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-10 z-1" />

      <div className="relative w-3/5 h-3/4 bg-white rounded-xl z-50 p-6 overflow-y-auto shadow-lg">

        <form className="max-w-xl mx-auto" onSubmit={onSubmit}>

          <div className="pb-12">
            <h1 className="text-3xl font-bold text-gray-900 mt-5 mb-15">
              {isEdit ? "Chỉnh sửa lịch" : "Đăng ký đề tài"}
            </h1>

            <div className="mb-5">
              <label htmlFor="tenDeTai" className="block text-sm/6 font-medium text-gray-900">Tên đề tài</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="tenDeTai"
                  id="tenDeTai"
                  value={deTai.tenDeTai || ""}
                  onChange={onChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <label htmlFor="moTa" className="block mb-1 font-medium">Mô tả đề tài</label>
              <textarea
                name="moTa"
                rows={5}
                required
                type="text"
                id="moTa"
                value={deTai.moTa || ""}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
              ></textarea>
            </div>

          </div>

          <div className="flex flex-row mt-8">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  px-5 py-2.5 text-center  flex-3 mr-35"
            >
              {isEdit ? "Cập nhật" : "Đăng ký"}
            </button>

            <button
              type="button"
              onClick={() => onCancel(false)}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex-3"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeTaiForm;