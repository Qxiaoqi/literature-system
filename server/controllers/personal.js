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

// 获取个人文献接口
router.post("/star/search", hasSession, (req, res, next) => {
  // console.log("获取个人文献");
  let userId = req.session.userId;
  let { check, pageIndex, pageSize } = req.body;
  let condition;
  if (check.length === 0) {
    condition = {};
  } else {
    condition = {
      category_id: { $in: check }
    };
  }
  Object.assign(condition, { fans: userId });

  search("/star", condition, check, pageIndex, pageSize, userId)
    .then(data => {
      // console.log("封装后返回数据:", data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.json({ code: 2, msg: err.message || err });
    });
  // console.log("condition:", condition);
  // let countNumber = 0;

  // models.literature
  //   .countDocuments(condition)
  //   .then(count => {
  //     countNumber = count;
  //     if (count) {
  //       return models.literature
  //         .find(condition)
  //         .skip((pageIndex - 1) * pageSize)
  //         .limit(pageSize);
  //     }
  //   })
  //   .then(data => {
  //     if (data) {
  //       // console.log(data.stars);
  //       let target = [];
  //       data.map(item => {
  //         let temp = {};
  //         temp.literatureId = item._id;
  //         temp.title = item.filename.split(".")[0];
  //         temp.author = item.author;
  //         temp.category = item.category_id;
  //         temp.star = true;
  //         target.push(temp);
  //       });

  //       res.json({
  //         code: 0,
  //         msg: "获取个人文献库成功",
  //         pageIndex,
  //         pageSize,
  //         pageTotal: countNumber,
  //         check,
  //         data: target
  //       });
  //     } else {
  //       throw new Error("未找到个人文献库");
  //       // res.json({ code: 2, msg: "未找到个人文献库" });
  //     }
  //   })
  // .catch(err => {
  //   console.log(err);
  //   res.json({ code: 2, msg: err.message || err });
  // });

});

// 获取个人导师推送接口
router.post("/task/search", hasSession, (req, res, next) => {
  // console.log("获取个人文献");
  let userId = req.session.userId;
  let { check, pageIndex, pageSize } = req.body;
  let condition = {
    student: userId
  };

  let countNumber = 0;

  models.task
    .countDocuments(condition)
    .then(count => {
      countNumber = count;
      if (count) {
        countNumber = count;
        return models.task
          .find(condition)
          .skip((pageIndex - 1) * pageSize)
          .limit(pageSize)
          .populate("literatureId");
      }
    })
    .then(data => {
      // console.log(data);
      if (data) {
        // console.log("data.literatureId:", data.literatureId);
        let target = [];
        data.map(item => {
          let temp = {};
          temp.literatureId = item.literatureId._id;
          temp.title = item.literatureId.filename.split(".")[0];
          temp.author = item.literatureId.author;
          temp.category = item.literatureId.category_id;
          if (item.literatureId.fans.indexOf(userId) !== -1) {
            // 说明该文献是 该用户的个人收藏
            temp.star = true;
          } else {
            temp.star = false;
          }
          target.push(temp);
        });

        res.json({
          code: 0,
          msg: "获取导师推送成功",
          pageIndex,
          pageSize,
          pageTotal: countNumber,
          check,
          data: target
        });
        // console.log(target);
        // console.log(countNumber);
      } else {
        console.log("没找到目标");
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 2,
        msg: "获取导师推送失败"
      });
    });
});

// 个人文献删除个人文献接口
router.post("/delete", hasSession, (req, res, next) => {
  let userId = req.session.userId;
  let { literatureId } = req.body;
  console.log(userId);
  // 直接查找目标文献
  models.literature
    .findOne({
      _id: literatureId
    })
    .then(data => {
      if (data) {
        console.log(data);
        let index = data.fans.indexOf(userId);
        // 找到目标文献
        if (index !== -1) {
          let fans = data.fans;
          fans.splice(index, 1);
          return models.literature.findByIdAndUpdate(data._id, {
            fans: fans
          });
        } else {
          console.log("目标文献中没有该用户，不用操作（一般不会出现这种情况）");
          throw new Error("文献不在个人文献中");
          // res.json({ code: 2, msg: "文献已经收藏" });
        }
      } else {
        // 不存在需要添加新的
        throw new Error("没有找到目标文献");
        // console.log("不存在");
        // return models.star.create({
        //   username: username,
        //   stars: [literatureId]
        // });
      }
    })
    .then(data => {
      res.json({ code: 0, msg: "个人文献删除成功" });
    })
    .catch(err => {
      // console.log(err.message);
      res.json({ code: 2, msg: err.message || err });
    });
});

module.exports = router;
