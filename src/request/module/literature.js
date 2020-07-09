import axios from "../http";

// ================== 个人文献 ======================
// 获取个人文献
export const getPersonal = params => {
  return axios({
    url: "/personal/" + params.type + "/search",
    method: "post",
    data: params.data
  });
};

// 添加公共文献到个人文献
export const deletePersonalStar = params => {
  return axios({
    url: "/personal/delete",
    method: "post",
    data: params
  });
};

// ================== 公共文献 ======================
// 获取公共文献
export const getPublic = params => {
  return axios({
    url: "/public/search",
    method: "post",
    data: params
  });
};

// 添加公共文献到个人文献
export const addPersonalStar = params => {
  return axios({
    url: "/public/add",
    method: "post",
    data: params
  });
};

export default {
  getPersonal,
  deletePersonalStar,
  getPublic,
  addPersonalStar
};
