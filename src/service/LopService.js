import axios from 'axios';

const BASE_URL = 'http://localhost:8080/lop';

const lopService = {
  getAllLop: () => axios.get(BASE_URL),
  createLop: (data) => axios.post(BASE_URL, data),
  updateLop: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  deleteLop: (id) => axios.delete(`${BASE_URL}/${id}`)
}

export default lopService;