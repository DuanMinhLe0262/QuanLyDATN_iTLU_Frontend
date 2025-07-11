import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/detai';

const deTaiService = {
  getDeTaiBySinhVienId: () => axiosClient.get(BASE_PATH),
  getDeTaiChoDuyet: () => axiosClient.get(`${BASE_PATH}/choduyet`),
  getAllDeTaiSVHD: () => axiosClient.get(`${BASE_PATH}/detaiSVHD`),
  createDeTai: (data) => axiosClient.post(BASE_PATH, data),
  updateDeTai: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  updateDeTaiByGiangVien: (id, data) => axiosClient.put(`${BASE_PATH}/giangvien/${id}`, data),
  deleteDeTai: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default deTaiService;