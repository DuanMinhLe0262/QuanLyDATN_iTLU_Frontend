import axiosClient from "../utils/axiosClient";
const BASE_PATH = '/files';

const fileUploadService = {
  upLoadFile: (data) => axiosClient.post(BASE_PATH, data),
  downLoadFile: (fileName) =>
    axiosClient.get(BASE_PATH, {
      params: { fileName },
      responseType: "blob",
    })
};

export default fileUploadService;