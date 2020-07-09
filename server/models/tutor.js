let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// 声明一个数据集 对象
let tutorSchema = new Schema(
  {
    tutorInfo: { type: Schema.Types.ObjectId, ref: "user" },
    students: [{ type: Schema.Types.ObjectId, ref: "user" }]
  },
  { collation: "tutor" }
);
// 将数据模型暴露出去
module.exports = mongoose.model("tutor", tutorSchema);
