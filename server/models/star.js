let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// 声明一个数据集 对象
let starSchema = new Schema(
  {
    username: String,
    stars: [{ type: Schema.Types.ObjectId, ref: "literature" }]
  },
  { collation: "star" }
);
// 将数据模型暴露出去
module.exports = mongoose.model("star", starSchema);
