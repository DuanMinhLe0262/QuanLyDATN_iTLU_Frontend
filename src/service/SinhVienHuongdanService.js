import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/sinhvienhuongdan';

const sinhVienHuongDanService = {
  getAllSinhVienHuongDan: () => axiosClient.get(BASE_PATH),
  getAllSinhVienHuongDanBySinhVienEmail: () => axiosClient.get(`${BASE_PATH}/gvhd`),
  createSinhVienHuongDan: (data) => axiosClient.post(BASE_PATH, data),
  multipleCreateSinhVienHuongDan: (data) => axiosClient.post(`${BASE_PATH}/nhieu`, data),
  updateSinhVienHuongDan: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteSinhVienHuongDan: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),

  uploadExcel: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post(`${BASE_PATH}/uploadExcel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  },
};

export default sinhVienHuongDanService;