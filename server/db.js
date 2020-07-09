let mongoose = require("mongoose");
let user = require("./models/user");
let literature = require("./models/literature");
let tutor = require("./models/tutor");
let task = require("./models/task");
let communication = require("./models/communication");
// let star = require("./models/star");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

// 禁用操作缓存
// mongoose.set("bufferCommands", false);
mongoose.connect("mongodb://localhost:27017/literature_system_project"); //连接本地数据库blog

const db = mongoose.connection;

db.once("error", () => console.log("Mongo connection error"));
db.once("open", () => {
  console.log("Mongo connection successed");
});

// 定义模型
const Models = {
  user,
  literature,
  tutor,
  task,
  communication
  // star
};

module.exports = Models;
