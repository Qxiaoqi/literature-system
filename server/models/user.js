let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// 声明一个数据集 对象
let userSchema = new Schema(
  {
    username: String, // 学号 or 工号
    password: String,
    role: String, // 角色
    name: String, // 姓名
    gender: Number, // 1: 男，2：女
    faculty: Number // 院系
  },
  { collation: "user" }
);
// 将数据模型暴露出去
module.exports = mongoose.model("user", userSchema);
