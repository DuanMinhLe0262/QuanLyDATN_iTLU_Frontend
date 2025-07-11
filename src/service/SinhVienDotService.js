import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/sinhviendot';

const sinhVienService = {
  phanBoSinhVien: (data) => axiosClient.post(`${BASE_PATH}/phanbo`, data),
  getAllSinhVien: () => axiosClient.get(BASE_PATH),
  createSinhVien: (data) => axiosClient.post(BASE_PATH, data),
  updateSinhVien: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteSinhVien: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),

  uploadExcel: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post(`${BASE_PATH}/uploadExcel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },
};

export default sinhVienService;