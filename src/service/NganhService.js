import axios from 'axios';

const BASE_URL = 'http://localhost:8080/nganh';

const nganhService = {
  getAllNganh: () => axios.get(BASE_URL),
  createNganh: (data) => axios.post(BASE_URL, data),
  updateNganh: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  deleteNganh: (id) => axios.delete(`${BASE_URL}/${id}`)
}

export default nganhService;