// 数据库模型
const models = require("../db");

/* 
  @path: String       路径，比如/public，/star，/task，/system
  @condition: Object  查询条件
  @check: Array       学科过滤选择
  @pageIndex: Number  当前页码
  @pageSize: Number   一页显示文献数量
  @userId: String     用户id
*/
const search = (path, condition, check, pageIndex, pageSize, userId) => {
  return new Promise((resolve, reject) => {
    let countNumber = 0;
    let msg = "";

    models.literature
      .countDocuments(condition)
      .then(count => {
        countNumber = count;
        if (count) {
          return models.literature
            .find(condition)
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize);
        }
      })
      .then(data => {
        if (data) {
          // console.log(data.stars);
          let target = [];
          data.map(item => {
            let temp = {};
            temp.literatureId = item._id;
            temp.title = item.filename.split(".")[0];
            temp.author = item.author;
            temp.category = item.category_id;
            switch (path) {
              case "/star":
                msg = "获取个人文献库成功";
                temp.star = true;
                break;
              case "/public":
                msg = "获取公共文献库成功";
                if (item.fans.indexOf(userId) !== -1) {
                  // 说明该文献是 该用户的个人收藏
                  temp.star = true;
                } else {
                  temp.star = false;
                }
                break;
            }
            target.push(temp);
          });

          resolve({
            code: 0,
            msg,
            pageIndex,
            pageSize,
            pageTotal: countNumber,
            check,
            data: target
          });
        } else {
          switch (path) {
            case "/star":
              reject("未找到个人文献库");
              break;
            case "/public":
              reject("未找到公共文献库");
              break;
          }
        }
      });
  });
};

module.exports = {
  search
};
