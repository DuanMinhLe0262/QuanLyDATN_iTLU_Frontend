import axios from 'axios';

const BASE_URL = 'http://localhost:8080/dotdoan';

const dotDoAnService = {
  getAllDot: () => axios.get(BASE_URL),
  createDot: (data) => axios.post(BASE_URL, data),
  updateDot: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  deleteDot: (id) => axios.delete(`${BASE_URL}/${id}`)
}

export default dotDoAnService;