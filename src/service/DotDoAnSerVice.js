import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/dotdoan';

const dotDoAnService = {
  getAllDotDoAn: () => axiosClient.get(BASE_PATH),
  createDotDoAn: (data) => axiosClient.post(BASE_PATH, data),
  updateDotDoAn: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteDotDoAn: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default dotDoAnService;