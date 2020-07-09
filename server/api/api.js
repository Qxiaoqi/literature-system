//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 数据库模型
const models = require("../db");
// session认证
// const { hasSession } = require("../utils/session");

// 查看 user数据
// models.user.find((err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

/*
- 0     请求成功
- 1     权限不足
- 2     正常失败
- 3     未登录
- 4     session过期
- 5     无效 session
- 6     缺少 session参数
- 7     验证码不正确
- 500   服务器内部错误
*/

// router.get("/", (req, res, next) => {
//   console.log("/接收");
// });

module.exports = router;
