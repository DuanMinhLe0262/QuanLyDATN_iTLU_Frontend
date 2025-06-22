import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/upload';

const fileUploadService = {
  downLoadFile: () => axiosClient.get(BASE_PATH),
  upLoadFile: (data) => axiosClient.post(BASE_PATH, data),
};

export default fileUploadService;