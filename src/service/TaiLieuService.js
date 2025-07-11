import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/tailieu';

const taiLieuService = {
  getTaiLieuBySinhVienId: () => axiosClient.get(BASE_PATH),
  getDeCuongChoDuyet: () => axiosClient.get(`${BASE_PATH}/decuong`),
  getAllDeCuongBySinhVienId: () => axiosClient.get(`${BASE_PATH}/decuongsinhvien`),
  getAllBaoCaoBySinhVienId: () => axiosClient.get(`${BASE_PATH}/baocaosinhvien`),
  getBaoCaoChoDuyet: () => axiosClient.get(`${BASE_PATH}/baocao`),
  getAllBaoCaoSVHD: () => axiosClient.get(`${BASE_PATH}/allbaocaosvhd`),
  createTaiLieu: (data) => axiosClient.post(BASE_PATH, data),
  updateTaiLieu: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  updateTrangThaiTaiLieu: (id, data) => axiosClient.put(`${BASE_PATH}/giangvien/${id}`, data),
  deleteTaiLieu: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),
};

export default taiLieuService;