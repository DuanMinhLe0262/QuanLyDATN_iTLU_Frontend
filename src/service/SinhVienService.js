import axios from 'axios';

const BASE_URL = 'http://localhost:8080/sinhvien';

const sinhvienService = {
  getAllSinhVien: () => axios.get(BASE_URL),
  createSinhVien: (data) => axios.post(BASE_URL, data),
  updateSinhVien: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  deleteSinhVien: (id) => axios.delete(`${BASE_URL}/${id}`)
}

export default sinhvienService;