import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/lop';

const lopService = {
  getAllLop: () => axiosClient.get(BASE_PATH),
  createLop: (data) => axiosClient.post(BASE_PATH, data),
  updateLop: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteLop: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default lopService;