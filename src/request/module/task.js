import axios from "../http";

// 导师布置任务
export const releaseTask = params => {
  return axios({
    url: "/task/release",
    method: "post",
    data: params
  });
};

// 导师删除任务
export const deleteTask = params => {
  return axios({
    url: "/task/deleteTask",
    method: "post",
    data: params
  });
};

// 获取任务列表
export const getTaskList = params => {
  return axios({
    url: "/task/getTaskList",
    method: "post",
    data: params
  });
};

// 获取任务详情
export const getTaskDetail = params => {
  return axios({
    url: "/task/getTaskDetail",
    method: "post",
    data: params
  });
};

// 提交任务评分
export const submitTaskScore = params => {
  return axios({
    url: "/task/submitTaskScore",
    method: "post",
    data: params
  });
};

// 提交留言
export const submitCommunication = params => {
  return axios({
    url: "/task/submitCommunication",
    method: "post",
    data: params
  });
};

// 获取留言
export const getCommunication = params => {
  return axios({
    url: "/task/getCommunication",
    method: "post",
    data: params
  });
};

export default {
  releaseTask,
  deleteTask,
  getTaskList,
  getTaskDetail,
  submitTaskScore,
  submitCommunication,
  getCommunication
};
