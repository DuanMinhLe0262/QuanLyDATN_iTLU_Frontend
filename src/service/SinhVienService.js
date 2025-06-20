import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/sinhvien';

const sinhVienService = {
  getAllSinhVien: () => axiosClient.get(BASE_PATH),
  createSinhVien: (data) => axiosClient.post(BASE_PATH, data),
  updateSinhVien: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteSinhVien: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default sinhVienService;