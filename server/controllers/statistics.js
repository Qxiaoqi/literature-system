//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 数据库模型
const models = require("../db");
// session认证
const { hasSession } = require("../utils/session");
// search模块
const { search } = require("../utils/search");

// 获取查询目标对象
router.get("/getSearch", hasSession, (req, res, next) => {
  // let userId = req.session.userId;
  // console.log("userId:", userId);
  // console.log("req.query:", req.query);
  const { type } = req.query;

  models.user
    .find({
      role: type
    })
    .then(data => {
      // console.log(data);
      if (data) {
        let target = [];
        data.map(item => {
          let temp = {
            id: item._id,
            name: item.name
          };
          target.push(temp);
        });

        res.json({
          code: 0,
          msg: "获取目标成功",
          data: target
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 2,
        msg: "获取目标失败"
      });
    });
});

// 查询目标数据
router.post("/search", hasSession, (req, res, next) => {
  // let userId = req.session.userId;
  // console.log("userId:", userId);
  const { check, type } = req.body;
  // console.log(check, type);
  let targetName = [];
  let targetData = [];

  // 查目标姓名
  const namePromises = check.map(id => models.user.findOne({ _id: id }));
  // 查结果数据
  const dataPromises = check.map(id =>
    models.task.countDocuments({ [type]: id })
  );
  Promise.all(namePromises)
    .then(data => {
      // console.log(data);
      if (data) {
        data.map(item => {
          targetName.push(item.name);
        });
        return Promise.all(dataPromises);
      }
    })
    .then(data => {
      // console.log(data);
      if (data) {
        targetData = data;
        res.json({
          code: 0,
          msg: "获取图表数据成功",
          data: {
            targetName,
            targetData
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 2,
        msg: "获取图表数据失败"
      });
    });
});

module.exports = router;
