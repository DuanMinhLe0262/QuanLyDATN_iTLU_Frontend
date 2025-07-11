import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/lichbaove';

const lichBaoVeService = {
  createLichBaoVe: (data) => axiosClient.post(BASE_PATH, data),
  updateLichBaoVe: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  getAllLichBaoVeByHoiDong: (hoiDongId) => axiosClient.get(`${BASE_PATH}/allbyhoidong`, {
    params: { hoiDongId }
  }),
  getAllLichBaoVe: () => axiosClient.get(BASE_PATH),
  deleteLichBaoVe: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default lichBaoVeService;
