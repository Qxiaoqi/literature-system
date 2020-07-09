let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// 声明一个数据集 对象
let literatureSchema = new Schema(
  {
    filename: String, // 文件名，与本地存的名字对应起来
    author: String,
    category_id: Number, // 一一对应22个学科
    fans: [{ type: Schema.Types.ObjectId, ref: "user" }]
    // source: String,
    // time: String,
  },
  { collation: "literature" }
);
// 将数据模型暴露出去
module.exports = mongoose.model("literature", literatureSchema);
