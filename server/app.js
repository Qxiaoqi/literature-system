// 引入文件模块
const fs = require("fs");
// 引入处理路径的模块
const path = require("path");
// 引入Express
const express = require("express");
const app = express();
// 引入处理 post数据的模块
const bodyParser = require("body-parser");
// 引入 express的 session中间件
const session = require("express-session");
// 使用其控制 session
// const cookieParser = require("cookie-parser");
// 本地存 session
const FileStore = require("session-file-store")(session);
// 引入编写好的api
const api = require("./api/api");
const userRouter = require("./controllers/user");
const fileRouter = require("./controllers/file");
const publicRouter = require("./controllers/public");
const personalRouter = require("./controllers/personal");
const informationRouter = require("./controllers/information");
const taskRouter = require("./controllers/task");
const statisticsRouter = require("./controllers/statistics");

// 定义 express-session的 name
const identityKey = "skey";

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser("xiaoqi"));

// 允许所有的请求形式
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  next();
});

app.use(
  session({
    name: identityKey,
    secret: "xiaoqi", // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      maxAge: 1000 * 1000 // 有效期，单位是毫秒
    }
  })
);

app.use(api);
app.use("/user", userRouter);
app.use("/file", fileRouter);
app.use("/public", publicRouter);
app.use("/personal", personalRouter);
app.use("/information", informationRouter);
app.use("/task", taskRouter);
app.use("/statistics", statisticsRouter);

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, "../dist")));
// 因为是单页应用 所有请求都走/dist/index.html
app.get("*", function(req, res) {
  const html = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    "utf-8"
  );
  res.send(html);
});
// 监听3000端口
app.listen(3000);
console.log("success listen…………");
