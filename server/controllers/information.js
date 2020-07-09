//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 数据库模型
const models = require("../db");
// session认证
const { hasSession, isTutor } = require("../utils/session");

// 导师获取同学院下所有学生
router.get("/getSameCollegeStu", hasSession, isTutor, (req, res, next) => {
  let userId = req.session.userId;

  let allSameStu = [];
  let hasStu = [];

  // 先要查该导师所在学院 id
  models.user
    .findOne({
      _id: userId
    })
    .then(data => {
      if (data) {
        // console.log(data.faculty);
        // 然后查找所有学院为 该 id 且权限为学生的 用户
        return models.user.find({
          faculty: data.faculty,
          role: "student"
        });
      } else {
        // 未找到用户
        throw new Error("未找到目标导师");
      }
    })
    .then(data => {
      if (data) {
        // console.log(data);
        // 这里其实应该把 学生和老师 再分别建一个集合
        // 要返回学生 id和 name
        // 这里还要将该导师已经添加的学生剔除掉
        allSameStu = data;
        return models.tutor.findOne({
          tutorInfo: userId
        });
      } else {
        throw new Error("未找到目标学生");
      }
    })
    .then(data => {
      if (data) {
        hasStu = data.students;
        // 过滤处理
        // console.log("allSameStu:", allSameStu);
        // console.log("hasStu:", hasStu);
        let results = allSameStu.filter(item => {
          // 只返回 hasStu中找不到的学生信息
          return hasStu.indexOf(item._id) === -1;
        });
        // console.log("results:", results);
        // 然后将所需要的数据返回
        let target = [];
        results.map(item => {
          let temp = {
            _id: item.id,
            name: item.name
          };
          target.push(temp);
        });
        res.json({
          code: 0,
          msg: "获取同学院且未添加所有学生成功",
          data: target
        });
      } else {
        // 所以这里直接处理 allSameStu
        let target = [];
        allSameStu.map(item => {
          let temp = {
            _id: item.id,
            name: item.name
          };
          target.push(temp);
        });
        res.json({
          code: 0,
          msg: "获取同学院且未添加所有学生成功",
          data: target
        });
      }
    })
    .catch(err => {
      // console.log(err);
      res.json({ code: 2, msg: err.message || err });
    });
});

// 导师 添加学生
router.post("/addStu", hasSession, isTutor, (req, res, next) => {
  let userId = req.session.userId;
  const { selectStudent } = req.body;

  // 向 tutor集合 插入数据
  // 先要查找目标集合是否建立，如果建立则更新，没有则 create
  models.tutor
    .findOne({
      tutorInfo: userId
    })
    .then(data => {
      if (data) {
        // 已经存在该 tutor文档，则直接插入数组
        // console.log(data);
        const { students } = data;
        let newStu = [...students, ...selectStudent];
        console.log("students:", students);
        console.log("selectStudent:", selectStudent);
        console.log("newStu:", newStu);
        return models.tutor.findByIdAndUpdate(data._id, {
          students: newStu
        });
      } else {
        // 还未存在，则要创建
        return models.tutor.create({
          tutorInfo: userId,
          students: selectStudent
        });
      }
    })
    .then(data => {
      if (data) {
        // 添加成功
        res.json({ code: 0, msg: "添加学生成功" });
      }
    })
    .catch(err => {
      // console.log(err);
      res.json({ code: 2, msg: err.message || err });
    });
});

// 导师 删除学生
router.post("/deleteStu", hasSession, isTutor, (req, res, next) => {
  let userId = req.session.userId;
  const { studentId } = req.body;

  // 向 tutor集合 插入数据
  // 先要查找目标集合是否建立，如果建立则更新，没有则 create
  models.tutor
    .findOne({
      tutorInfo: userId
    })
    .then(data => {
      console.log(data);
      if (data) {
        // console.log(data);
        let { students } = data;
        let index = students.indexOf(studentId);
        if (index !== -1) {
          students.splice(index, 1);
          return models.tutor.findByIdAndUpdate(data._id, {
            students
          });
        } else {
          throw new Error("未找到要删除的学生");
        }
      } else {
        throw new Error("未找到导师");
      }
    })
    .then(data => {
      if (data) {
        // 添加成功
        res.json({ code: 0, msg: "删除学生成功" });
      }
    })
    .catch(err => {
      // console.log(err);
      res.json({ code: 2, msg: err.message || err });
    });
});

// 导师获取已经添加的学生
router.get("/getStu", hasSession, isTutor, (req, res, next) => {
  let userId = req.session.userId;

  models.tutor
    .findOne({
      tutorInfo: userId
    })
    .populate("students")
    .then(data => {
      if (data) {
        // 已经找到
        // console.log(data);
        let target = [];
        data.students.map(item => {
          let temp = {
            _id: item.id,
            name: item.name
          };
          target.push(temp);
        });
        res.json({
          code: 0,
          msg: "获取指导学生成功",
          data: target
        });
      } else {
        // 说明没有找到该文档，即该教师还没有添加学生
        res.json({ code: 2, msg: "导师还未添加学生" });
      }
    })
    .catch(err => {
      // console.log(err);
      res.json({ code: 2, msg: err.message || err });
    });
});

module.exports = router;
