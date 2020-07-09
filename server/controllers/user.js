//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 数据库模型
const models = require("../db");
// session认证
const { hasSession } = require("../utils/session");

// 登录接口
router.post("/login", (req, res, next) => {
  console.log("登陆请求");
  // var sess = req.session;
  console.log("body:", req.body);

  models.user
    .findOne({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    })
    .then(data => {
      if (data) {
        // console.log("登录接口用户信息：", data);
        // 找到用户，生成 session，只需要保存 username 即可
        req.session.regenerate(err => {
          if (err) {
            return res.json({ code: 500, msg: "session生成失败" });
          }

          req.session.userId = data._id;
          req.session.user = data.username;
          req.session.role = data.role;
          // 还需要返回一些数据给客户端，客户端保存到 cookie中，方便一些内容展示
          // 因为 cookie-session返回的只是 一串加密后的sessionId，因此客户端并不方便拿来使用，仅作为标识用户以及签名验证是否伪造

          // 重做方案：将登录信息存在 localStorage 或者 Cookie中不可取，前端可以直接被改变，而应该在每次请求带上cookie后，后端来判断
          // 但是会有一个小问题，前端页面展示需要根据 权限 来展示不同界面，这里需要另外搞一个接口（和登录接口不同），发请求获取用户信息，然后存在 Vuex中，如果 vuex中没有，就再次用这个接口获取信息
          // 因此这里就不需要全局导航守卫来判断
          // 后端在需要 鉴权 的接口上添加逻辑判断即可
          res.json({
            code: 0,
            msg: "登录成功",
            data: {
              username: data.username,
              name: data.name,
              role: data.role
            }
          });
        });
      } else {
        // 未找到用户
        res.json({ code: 2, msg: "账号密码或角色错误" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

// 获取用户接口
router.get("/getUserInfo", hasSession, (req, res, next) => {
  console.log("获取用户信息请求");
  // let username = req.session.user;
  // console.log("session.user:", username);
  models.user
    .findOne({
      username: req.session.user
    })
    .then(data => {
      if (data) {
        // console.log("获取用户信息接口：", data);
        res.json({
          code: 0,
          msg: "获取用户信息成功",
          data: {
            username: data.username,
            name: data.name,
            role: data.role,
            gender: data.gender,
            faculty: data.faculty
          }
        });
      } else {
        // 未找到用户
        throw new Error("未找到用户");
        // res.json({ code: 2, msg: "未找到用户" });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ code: 2, msg: err.message || err });
    });
});

module.exports = router;
