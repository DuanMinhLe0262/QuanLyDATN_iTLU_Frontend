import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/bomon';

const boMonService = {
  getAllBoMon: () => axiosClient.get(BASE_PATH),
  createBoMon: (data) => axiosClient.post(BASE_PATH, data),
  updateBoMon: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteBoMon: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default boMonService;