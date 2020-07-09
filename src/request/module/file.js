import axios from "../http";

// 文献上传
export const upload = params => {
  return axios({
    url: "/file/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8"
    },
    data: params
  });
};

// 文献下载
export const download = params => {
  return axios({
    url: "/file/download",
    method: "post",
    responseType: "blob",
    data: params
  });
};

export default {
  upload,
  download
};
