import axios from 'axios';

const BASE_URL = 'http://localhost:8080/bomon';

const boMonService = {
  getAllBoMon: () => axios.get(BASE_URL),
  createBoMon: (data) => axios.post(BASE_URL, data),
  updateBoMon: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  deleteBoMon: (id) => axios.delete(`${BASE_URL}/${id}`)
}

export default boMonService;