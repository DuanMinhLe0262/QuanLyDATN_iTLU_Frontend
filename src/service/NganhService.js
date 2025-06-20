import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/nganh';

const nganhService = {
  getAllNganh: () => axiosClient.get(BASE_PATH),
  createNganh: (data) => axiosClient.post(BASE_PATH, data),
  updateNganh: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteNganh: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default nganhService;