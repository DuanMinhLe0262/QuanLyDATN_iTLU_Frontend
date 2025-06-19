import axios from 'axios';

const BASE_URL = 'http://localhost:8080/khoa';

const khoaService = {
  getAllKhoa: () => axios.get(BASE_URL),
  createKhoa: (data) => axios.post(BASE_URL, data),
  updateKhoa: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  deleteKhoa: (id) => axios.delete(`${BASE_URL}/${id}`)
}

export default khoaService;