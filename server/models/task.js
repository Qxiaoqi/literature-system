let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// 声明一个数据集 对象
let taskSchema = new Schema(
  {
    literatureId: { type: Schema.Types.ObjectId, ref: "literature" },
    releaseTime: String,
    deadline: String,
    tutor: { type: Schema.Types.ObjectId, ref: "user" },
    student: { type: Schema.Types.ObjectId, ref: "user" },
    requirement: String,
    score: Array
  },
  { collation: "task" }
);
// 将数据模型暴露出去
module.exports = mongoose.model("task", taskSchema);
