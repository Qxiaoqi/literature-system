import axios from "../http";

// 导师获取同学院下所有学生（剔除已经添加的）
export const getSameCollegeStu = params => {
  return axios({
    url: "/information/getSameCollegeStu",
    method: "get",
    data: params
  });
};

// 导师 添加学生
export const addStu = params => {
  return axios({
    url: "/information/addStu",
    method: "post",
    data: params
  });
};

// 导师 删除学生
export const deleteStu = params => {
  return axios({
    url: "/information/deleteStu",
    method: "post",
    data: params
  });
};

// 导师 获取已经添加的学生
export const getStu = params => {
  return axios({
    url: "/information/getStu",
    method: "get",
    data: params
  });
};

export default {
  getSameCollegeStu,
  addStu,
  deleteStu,
  getStu
};
