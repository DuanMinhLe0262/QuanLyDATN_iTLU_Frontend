import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/giangviendot';

const giangVienDotService = {
  getAllGiangVien: () => axiosClient.get(BASE_PATH),
  createGiangVien: (data) => axiosClient.post(BASE_PATH, data),
  updateGiangVien: (id, data) => axiosClient.put(`${BASE_PATH}/${id}`, data),
  deleteGiangVien: (id) => axiosClient.delete(`${BASE_PATH}/${id}`),

  uploadExcel: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post(`${BASE_PATH}/uploadExcel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },
};

export default giangVienDotService;