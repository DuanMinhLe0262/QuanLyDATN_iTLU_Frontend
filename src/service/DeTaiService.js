import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/detai';

const deTaiService = {
  getAllDeTai: () => axiosClient.get(BASE_PATH),
  createDeTai: (data) => axiosClient.post(BASE_PATH, data),
  updateDeTai: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteDeTai: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default deTaiService;