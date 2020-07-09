//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 数据库模型
const models = require("../db");
// session认证
const { hasSession, isTutor } = require("../utils/session");

// 布置任务接口
router.post("/release", hasSession, isTutor, (req, res, next) => {
  // var sess = req.session;
  let userId = req.session.userId;
  const {
    literatureId,
    releaseTime,
    deadline,
    students,
    requirement
  } = req.body;

  console.log("body:", req.body);
  let studentSuccess = [];
  // 将请求的数据 创建新的文档 存入集合
  // 这里不能存入学生数组，一个学生一个任务
  students.map(item => {
    models.task
      .create({
        literatureId,
        releaseTime,
        deadline,
        tutor: userId,
        student: item,
        requirement
      })
      .then(data => {
        // console.log(data);
        if (data) {
          studentSuccess.push(item)
          // res.json({ code: 0, msg: `${item}任务布置成功` });
        } else {
          throw new Error("未创建成功");
        }
      })
      .catch(err => {
        res.json({ code: 2, msg: err.message || err });
      });
  });
  res.json({ code: 0, msg: `${studentSuccess.join("、")}任务布置成功` });
});

// 删除任务接口
router.post("/deleteTask", hasSession, isTutor, (req, res, next) => {
  // var sess = req.session;
  // let userId = req.session.userId;
  const { taskId } = req.body;
  // console.log(mongoose.Types.ObjectId(taskId));
  // models.task
  //   .findOne()
  //   .then(data => {
  //     console.log(data);
  //     // if (data) {
  //     // }
  //   })
  //   .catch(err => {
  //     console.log("err:", err);
  //   });

  // students.map(item => {
  //   models.task
  //     .create({
  //       literatureId,
  //       releaseTime,
  //       deadline,
  //       tutor: userId,
  //       student: item,
  //       requirement
  //     })
  //     .then(data => {
  //       // console.log(data);
  //       if (data) {
  //         studentSuccess.push(item)
  //         // res.json({ code: 0, msg: `${item}任务布置成功` });
  //       } else {
  //         throw new Error("未创建成功");
  //       }
  //     })
  //     .catch(err => {
  //       res.json({ code: 2, msg: err.message || err });
  //     });
  // });
  // res.json({ code: 0, msg: `${studentSuccess.join("、")}任务布置成功` });
});

// 获取任务列表接口
router.post("/getTaskList", hasSession, (req, res, next) => {
  let userId = req.session.userId;
  let role = req.session.role;
  const { check, pageIndex, pageSize } = req.body;
  let countNumber = 0;
  let condition;
  if (role === "tutor") {
    condition = {
      tutor: userId
    };
    // 导师才有根据学生查询
    if (check.length !== 0) {
      Object.assign(condition, {
        student: { $in: check }
      });
    }
  } else if (role === "student") {
    condition = {
      student: userId
    };
  }

  // 查询目标用户的任务列表，学生 和 导师不同
  models.task
    .countDocuments(condition)
    .then(count => {
      countNumber = count;
      if (count) {
        return models.task
          .find(condition)
          .skip((pageIndex - 1) * pageSize)
          .limit(pageSize)
          .populate("literatureId")
          .populate("student");
      }
    })
    .then(data => {
      // console.log(data);
      if (data) {
        let target = [];
        data.map(item => {
          let temp = {};
          temp.taskId = item._id;
          temp.title = item.literatureId.filename.split(".")[0];
          temp.releaseTime = item.releaseTime;
          temp.deadline = item.deadline;
          temp.student = item.student.name;
          target.push(temp);
        });

        res.json({
          code: 0,
          msg: "获取任务列表成功",
          pageIndex,
          pageSize,
          pageTotal: countNumber,
          check,
          data: target
        });
      } else {
        throw new Error("未找到任务");
      }
    })
    .catch(err => {
      res.json({ code: 2, msg: err.message || err });
    });
});

// 获取任务详情接口
router.post("/getTaskDetail", hasSession, (req, res, next) => {
  let userId = req.session.userId;
  const { taskId } = req.body;

  // console.log(taskId);
  models.task
    .findOne({
      _id: taskId
    })
    .populate("literatureId")
    .then(data => {
      if (data) {
        // console.log(data);
        let target = {
          literatureId: data.literatureId._id,
          title: data.literatureId.filename.split(".")[0],
          author: data.literatureId.author,
          category: data.literatureId.category_id,
          star: true,
          score: data.score,
          releaseTime: data.releaseTime,
          deadline: data.deadline,
          requirement: data.requirement
        };

        res.json({
          code: 0,
          msg: "获取任务详情成功",
          data: target
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

// 导师提交评分
router.post("/submitTaskScore", hasSession, isTutor, (req, res, next) => {
  let userId = req.session.userId;
  const { taskId, scoreArr } = req.body;
  // console.log(req.body);

  models.task
    .findOne({
      _id: taskId
    })
    .then(data => {
      if (data) {
        // console.log(data);
        return models.task.findByIdAndUpdate(data._id, {
          score: scoreArr
        });
      }
    })
    .then(data => {
      if (data) {
        res.json({
          code: 0,
          msg: "打分成功"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 2,
        msg: err.msg || "打分失败"
      });
    });
});

// 提交留言
router.post("/submitCommunication", hasSession, (req, res, next) => {
  let userId = req.session.userId;
  const { taskId, content } = req.body;
  let timeDate = new Date();
  let time =
    timeDate.getFullYear() +
    "." +
    (timeDate.getMonth() + 1) +
    "." +
    timeDate.getDate();
  // console.log(req.body);
  // console.log(username);

  let target = {};
  // 先检查 留言文档 是否已经创建
  // 查找目标 userId的 name
  models.user
    .findOne({
      _id: userId
    })
    .then(data => {
      if (data) {
        console.log("userdata:", data);
        let username = data.name;
        // 处理数据
        target = {
          username,
          time,
          content
        };
        // console.log(target);
        return models.communication.findOne({
          taskId: taskId
        });
      }
    })
    .then(data => {
      if (data) {
        // console.log(data);
        // 已经有了，直接 push
        let communication = data.communication;
        communication.push(target);
        return models.communication.findByIdAndUpdate(data._id, {
          communication
        });
      } else {
        // console.log("没有");
        // 需要创建
        return models.communication.create({
          taskId,
          communication: [target]
        });
      }
    })
    .then(data => {
      if (data) {
        res.json({
          code: 0,
          msg: "提交成功"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 2,
        msg: err.msg || "提交失败"
      });
    });
});

// 获取任务留言
router.post("/getCommunication", hasSession, (req, res, next) => {
  // let userId = req.session.userId;
  const { taskId } = req.body;

  console.log(taskId);
  models.communication
    .findOne({
      taskId
    })
    .then(data => {
      // console.log(data);
      if (data) {
        let target = data.communication;

        res.json({
          code: 0,
          msg: "获取任务留言成功",
          data: target
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 2,
        msg: err.message || "获取任务留言失败"
      });
    });
});

module.exports = router;
