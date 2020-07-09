// initial state
const state = {
  // 用户名
  username: "",
  // 角色
  role: "",
  // 姓名
  name: ""
};

// getters
const getters = {};

// actions
const actions = {
  getUserInfo({ commit }, userInfo) {
    commit("setUsername", userInfo.username);
    commit("setRole", userInfo.role);
    commit("setName", userInfo.name);
  }
  // getUsername({ commit }, username) {
  //   commit("setUsername", username);
  // },
  // getRole({ commit }, role) {
  //   commit("setRole", role);
  // },
  // getName({ commit }, name) {
  //   commit("setName", name);
  // }
};

// mutations
const mutations = {
  // 设置用户名
  setUsername(state, username) {
    state.username = username;
  },
  // 设置角色
  setRole(state, role) {
    state.role = role;
  },
  // 设置姓名
  setName(state, name) {
    state.name = name;
  }
};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
};
