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

// 获取公共文献接口
router.post("/search", hasSession, (req, res, next) => {
  // let username = req.session.user;
  let userId = req.session.userId;
  // console.log(req.body);
  let { check, pageIndex, pageSize } = req.body;
  let condition;
  if (check.length === 0) {
    condition = {};
  } else {
    condition = {
      category_id: { $in: check }
    };
  }

  search("/public", condition, check, pageIndex, pageSize, userId)
    .then(data => {
      // console.log("封装后返回数据:", data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.json({ code: 2, msg: err.message || err });
    });

  // if (pageLastId !== "") {
  //   // 说明不是第一页，需添加条件
  //   let target = {
  //     _id: { $lt: pageLastId }
  //   };
  //   Object.assign(condition, target);
  // }
  // console.log("condition:", condition);
  // console.log("skip:", (pageIndex - 1) * pageSize);
  // 查询总条数
  // let countNumber = 0;

  // models.literature
  //   .countDocuments(condition)
  //   .then(count => {
  //     // console.log("count:", count);
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
  //       // console.log("获取公共文献库：", data);
  //       // 这里还要查询 star表
  //       let target = [];
  //       data.map(item => {
  //         let temp = {};
  //         temp.literatureId = item._id;
  //         temp.title = item.filename.split(".")[0];
  //         temp.author = item.author;
  //         temp.category = item.category_id;
  //         if (item.fans.indexOf(userId) !== -1) {
  //           // 说明该文献是 该用户的个人收藏
  //           temp.star = true;
  //         } else {
  //           temp.star = false;
  //         }
  //         target.push(temp);
  //       });

  //       res.json({
  //         code: 0,
  //         msg: "获取公共文献库成功",
  //         pageIndex,
  //         pageSize,
  //         pageTotal: countNumber,
  //         check,
  //         data: target
  //       });
  //     } else {
  //       // 未找到
  //     }
  //   })
  // .catch(err => {
  //   console.log(err);
  //   res.json({ code: 2, msg: err.message || err });
  // });
});

// 公共文献添加个人文献接口
router.post("/add", hasSession, (req, res, next) => {
  let username = req.session.user;
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
        // 找到目标文献
        if (data.fans.indexOf(userId) === -1) {
          console.log("还没有添加");
          let fans = data.fans;
          fans.push(userId);
          return models.literature.findByIdAndUpdate(data._id, {
            fans: fans
          });
        } else {
          throw new Error("文献已经在个人文献中");
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
      res.json({ code: 0, msg: "文献收藏成功" });
    })
    .catch(err => {
      // console.log(err.message);
      res.json({ code: 2, msg: err.message || err });
    });
});

module.exports = router;
