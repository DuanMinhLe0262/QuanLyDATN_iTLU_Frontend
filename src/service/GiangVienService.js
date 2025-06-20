import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/giangvien';

const giangVienService = {
  getAllGiangVien: () => axiosClient.get(BASE_PATH),
  createGiangVien: (data) => axiosClient.post(BASE_PATH, data),
  updateGiangVien: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteGiangVien: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default giangVienService;