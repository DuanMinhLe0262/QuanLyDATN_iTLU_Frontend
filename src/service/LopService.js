import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/khoa';

const khoaService = {
  getAllKhoa: () => axiosClient.get(BASE_PATH),
  createKhoa: (data) => axiosClient.post(BASE_PATH, data),
  updateKhoa: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteKhoa: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default khoaService;