import axios from "../http";

export const login = params => {
  return axios({
    url: "/user/login",
    method: "post",
    data: params
  });
};

export const getUserInfo = () => {
  return axios({
    url: "/user/getUserInfo",
    method: "get"
  });
};

// export const getUserInformation = () => {
//   return axios({
//     url: "/user/getUserInformation",
//     method: "get"
//   });
// };

// // 后台许可
// export const getManage = () => {
//   return axios({
//     url: "/user/manage",
//     method: "get",
//     requiresAuth: true
//   });
// };

export default {
  login,
  getUserInfo
};
