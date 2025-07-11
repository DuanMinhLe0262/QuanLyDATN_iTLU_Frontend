import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/hoidong';

const hoiDongService = {
  createHoiDongVaHDGV: (data) => axiosClient.post(BASE_PATH, data),
  getHoiDongChoDuyet: () => axiosClient.get(`${BASE_PATH}/choduyet`),
  getHoiDongDaDuyet: () => axiosClient.get(`${BASE_PATH}/daduyet`),
  getAllHoiDongDetail: () => axiosClient.get(`${BASE_PATH}/alldetail`),
  getAllHoiDongByBoMon: () => axiosClient.get(`${BASE_PATH}/allbybomon`),
  getAllHoiDongDetailByBoMon: () => axiosClient.get(`${BASE_PATH}/alldetailbybomon`),
  updateTrangThaiHoiDong: (id, data) => axiosClient.put(`${BASE_PATH}/duyethoidong/${id}`, data),

  updateHoiDong: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
};

export default hoiDongService;