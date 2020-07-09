import axios from "../http";

export const getSearch = params => {
  return axios({
    url: "/statistics/getSearch",
    method: "get",
    params
  });
};

export const search = params => {
  return axios({
    url: "/statistics/search",
    method: "post",
    data: params
  });
};

export default {
  getSearch,
  search
};
