## 提纲
* cookie-session
* Mongoose model模块化
* express router模块化
* Mongoose增删查改 promise处理 解决回调地狱
* 如果重复上传文件，会将之前的更新
* 每次操作权限验证
* 业务状态码约定
* 接口封装
* 文件上传 和 存入数据库是两个过程，任意一个出现问题，都需要同时取消操作，假如文件上传成功，但是存入数据库失败，要将已经上传的文件删除。目前文件上传处于存数据库过程的前提，因此不需考虑文件上传失败但是存入数据库的情况。
* 中间件处理
* mongoose多对多关系处理，mongodb关联查询很麻烦
* 异步请求文件下载，校验权限
* 文件公共逻辑 使用Promise抽离
* 分页方案
* axios统一处理返回请求，以及发送请求
* 权限划分，功能不同
* 导师对学生的增删查改，添加学生时只会显示还没有添加的同学院学生
* 只有导师才可以在任务列表根据学生来查询任务
* 布置任务选择多个学生，并且分别为每个学生创建一个不同的任务
* 评分只有老师能打分，学生只能查看分数
* 只有导师有资格删除任务
* 管理者可以看到所有任务的细节


## 待解决问题

【session过期，多个回调跳转登录页，考虑在拦截地方写flag】 ok
【公共文献 点击收藏后 需要更新 star】 ok
【个人文献移除】 ok
【按学科检索文献】 ok
【分页功能】 ok
【下载功能】 ok

【mongoose删除有问题，不知道是什么问题】
【如何根据填充后并且match后 查找 count总数】 ？？？
【个人文献下导师推送需要重新考虑，这里不能根据学科过滤】




## cookie-session 出现的问题

#### 1.set-cookie正常返回 但是 浏览器cookie中并没有存入

原因：跨域时并不能正常存入，虽然后端设置了`res.header("Access-Control-Allow-Origin", "*");`但是根据跨域的cookie文档显示，跨域情况必须设置`res.header("Access-Control-Allow-Credentials", true);`，但是这与 `*` 冲突，因此需要将其 `res.header("Access-Control-Allow-Origin", "http://localhost:8080");`特定设置的请求ip，同时请求也要加上`withCredentials: true`

当使用localhost:3000直接运行接口时（此时同源）是可以正常进行的，但是不方便开发调试，因此不能解决问题。之前的思路是让其同源，因此考虑让其同源，使用了webpack的`devServer`中的`proxy`代理来尝试让其同源，但结果失败，考虑其原因（经测试并未想明白其中缘由），经测试设置同源代理，但是不设置`withCredentials`的时候并不能让其成功存入，后面要尝试nginx代理寻找其中缘由


## Mongoose

方便使用 Mongodb业务逻辑

### 操作

1、增`save(new对象后的方法)`或者`create(model的方法)`

```js
var Tank = mongoose.model('Tank', yourSchema);

var small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
})

// or

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
})
```

2、删`remove`

3、查`find, findById, findOne, where`

4、改`update`

### 关于Models （重要）

```js
var Tank = mongoose.model('Tank', schema);
```

第一个参数是跟 model 对应的集合（ collection ）名字的 单数 形式。 Mongoose 会自动找到名称是 model 名字 复数 形式的 collection 。 对于上例，Tank 这个 model 就对应数据库中 tanks 这个 collection。



## 建表分析

### 用户添加收藏

一个用户对应多个文献，一个文献对应多个用户，如何组织这一关系就成了一个问题。

最初新建了一个 star集合，用来保存用户对应stars的关系，并且使用mongoose的填充，但是发现并不合适。因为从功能上考虑，个人文献库可以方便实现，但是公共文献库的star并不方便查找到用户是否star。

其实是一个 refs（根）和 children（子）的对应关系，关键是找到合适的 根，最开始我找错了。找错了的情况下要想从 文献（子）找到根（用户），还需要双向填充，但是可能会出现数据不同步的问题。

因此单向更加合适，因此调整思路，删掉stars集合，在literature集合中添加一个fans字段，代表点击star的用户，然后个人文献库就直接检索 literature集合中的 满足fans数组中存在 userId的文献，从而实现功能。



### 文件下载

* 有可能返回 blob 也有可能返回 json情况，此时要检查 header头，判断状态。如果是 blob，则将其下载，如果是 json，则要将其`let reader = new FileReader();`读取，并转称 json格式

* content-disposition 找不到，需要后端进行设置`res.header("Access-Control-Expose-Headers", "Content-Disposition");`


### 分析任务布置功能

以任务信息为 model建立集合
任务包含
任务名 （文献名为任务名）（不要了，只要Id就行）
文献Id  （任务页面带上，需要关联到 literature，方便后面 填充 查找）
发布时间 （系统确定发布时间）
截止时间 （用户选择）
布置导师  （发布时请求的userId）
接受学生 （发布时选择的学生）
任务要求  （发布时富文本）

打分情况： [完成时间评分, 报告质量, 学习态度]


### 分析任务交流功能

包含
任务集合的 Id
交流内容数组[{
  用户名
  发表时间
  内容
}]


## 统计图表数据查询分析

### 学院
分别将 学院是 同一学院 的 导师 的 Id 查出来 存入数组

然后再查 task集合中 导师 Id在数组中的所有 count

### 导师

以教师的话同理，查出所有导师 数组

然后依次查出每个导师的任务数量

### 学生 

同导师

