// 考虑放在 vuex中管理（没必要？）

export const role = () => {
  /*    
    0：未登录
    1：学生
    2：教师
    3：管理者 
  */
  return 1;
};

export const isLogin = () => {
  // 已登录 true，未登录 false
  return true;
};

export default {
  role,
  isLogin
};
