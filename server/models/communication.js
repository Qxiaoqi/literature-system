let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// 声明一个数据集 对象
let communicationSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "task" },
    communication: Array
  },
  { collation: "communication" }
);
// 将数据模型暴露出去
module.exports = mongoose.model("communication", communicationSchema);
