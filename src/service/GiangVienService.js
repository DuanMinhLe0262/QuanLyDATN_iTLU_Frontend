import axios from 'axios';

const BASE_URL = 'http://localhost:8080/giangvien';

const giangVienService = {
  getAllGiangVien: () => axios.get(BASE_URL),
  createGiangVien: (data) => axios.post(BASE_URL, data),
  updateGiangVien: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  deleteGiangVien: (id) => axios.delete(`${BASE_URL}/${id}`)
}

export default giangVienService;