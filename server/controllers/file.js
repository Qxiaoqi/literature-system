//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 文件上传中间件
const multer = require("multer");
// 数据库模型
const models = require("../db");
// 引入文件系统
const fs = require("fs");
// session认证
const { hasSession, canUpload } = require("../utils/session");
const categoryData = require("../data/category");

const createFolder = folder => {
  try {
    fs.accessSync(folder);
  } catch (err) {
    fs.mkdirSync(folder);
  }
};

const uploadFolder = "uploads/";
// 每次启动服务器都要检查文件夹是否建立
categoryData.map(item => {
  let path = `${uploadFolder}${item.id}/`;
  createFolder(path);
  // console.log(path);
});

// 【需要将学科存文件】  ok
// 【然后修改文件存储路径】 ok
// 【上传文件的加载状态】 ok
// 【权限验证】 ok

// 通过 filename 属性定制
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // console.log(req.body);
    let id = req.body.category;
    // let index = req.body.category - 1;
    // let category = categoryData[index].value;
    cb(null, `${uploadFolder}${id}/`); // 保存的路径，需要自己创建
  },
  filename(req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    // console.log(file);
    // console.log(1);
    cb(null, file.originalname);
  }
});

// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({
  storage: storage
});

router.post(
  "/upload",
  [hasSession, canUpload, upload.single("file")],
  (req, res, next) => {
    // console.log(req.session.user);
    // console.log(req.file);
    console.log(req.body);
    // 此时已经上传成功

    // 先在数据库中查目标是否存在
    models.literature
      .findOne({
        filename: req.body.title
      })
      .then(data => {
        if (data) {
          // 找到目标
          return models.literature.findByIdAndUpdate(data._id, {
            filename: req.body.title, // 文件名，与本地存的名字对应起来
            author: req.body.author,
            // source: req.body.source,
            // time: req.body.time,
            category_id: req.body.category // 一一对应22个学科
          });
        } else {
          // 未找到目标，直接添加一个新的
          return models.literature.create({
            filename: req.body.title, // 文件名，与本地存的名字对应起来
            author: req.body.author,
            // source: req.body.source,
            // time: req.body.time,
            category_id: req.body.category // 一一对应22个学科
          });
        }
      })
      .then(data => {
        // console.log("返回新的文献数据:", data);
        res.json({ code: 0, msg: "文件上传成功" });
      })
      .catch(err => {
        console.log(err);
        // 这里要将已经上传的文件删除（为了方便没写）
        res.json({ code: 2, msg: "文件上传失败" });
      });
  }
);

// 文献下载
router.post("/download", hasSession, (req, res, next) => {
  console.log("文件下载请求");
  let { literatureId } = req.body;
  // 根据文件 id 查找目标文件路径
  models.literature
    .findOne({
      _id: literatureId
    })
    .then(data => {
      if (data) {
        // 找到目标文件
        console.log(data);
        let path = `./uploads/${data.category_id}/${data.filename}`;
        res.download(path, encodeURI(data.filename));
      } else {
        // 未找到文件
        throw new Error("未找到文件");
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ code: 2, msg: err.message || err });
    });
  // res.download("")
});

module.exports = router;
