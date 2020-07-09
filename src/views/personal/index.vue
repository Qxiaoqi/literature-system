<template>
  <div class="personal">
    <!-- 搜索部分 -->
    <SearchCard 
      :selectData="categoryData"
      title="搜索文献"
      @search="searchButton"
      :type="type"
    ></SearchCard>

    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-book"></Icon>
        文献列表
      </p>
      <!-- <Button type="primary" slot="extra" size="small">上传文献</Button> -->
      <Tabs v-model="type">
        <TabPane label="个人收藏" name="star">
          <!-- 个人结果栏 -->
          <div class="results-content">
            <div class="literature-content">
              <!-- 单个文献组件 -->
              <LiteratureItem
                v-for="(literature, index) in literatureData"
                :key="literature.literatureId"
                :literature="literature"
                :index="index"
                @model-click="modelClick"
                @release-click="releaseClick"
                @delete-click="deleteClick"
              ></LiteratureItem>
            </div>

            <!-- 分页 -->
            <div class="page-bar">
              <Page :total="pageTotal" :page-size="pageSize" @on-change="pageJump" show-total />
            </div>

          </div>
        </TabPane>
        <TabPane
          v-if="this.$store.state.user.role === 'student'"
          label="导师推送"
          name="task"
        >
          <div class="results-content">
            <div class="literature-content">
              <!-- 单个文献组件 -->
              <LiteratureItem
                v-for="(literature, index) in taskLiteratureData"
                :key="literature.literatureId"
                :literature="literature"
                :index="index"
                type="tutorPush"
                @model-click="modelClick"
              ></LiteratureItem>
            </div>

            <!-- 分页 -->
            <div class="page-bar">
              <Page :total="taskPageTotal" :page-size="taskPageSize" @on-change="taskPageJump" show-total />
            </div>

          </div>
        </TabPane>
        <!-- <TabPane v-if="this.$store.state.user.role === 'student'" label="系统推荐" name="system">标签三的内容</TabPane> -->
      </Tabs>

      <!-- 文献详情页弹窗 -->
      <Modal v-model="literatureModel" title="文献详情" footer-hide>
        <ul class="literature-model">
          <li>
            标题：<span>{{ literatureModelData.title }}</span>
          </li>
          <li>
            作者：<span>{{ literatureModelData.author }}</span>
          </li>
          <!-- <li>
            来源：<span>{{ literatureModelData.source }}</span>
          </li>
          <li>
            发表时间：<span>{{ literatureModelData.time }}</span>
          </li> -->
          <li>
            分类：<span>{{ literatureModelData.category }}</span>
          </li>
        </ul>
      </Modal>
    </Card>
  </div>
</template>

<script>
// @ is an alias to /src
import { categoryData } from "@/data/category";
import LiteratureItem from "@/components/Literature/LiteratureItem.vue";
import SearchCard from "@/components/Search/SearchCard.vue";

export default {
  name: "Personal",
  components: {
    LiteratureItem,
    SearchCard
  },
  created() {
    // console.log(this.type);
    const { pageIndex, pageSize, taskPageIndex, taskPageSize } = this;
    // 默认获取全部文献
    this.getPersonal([], pageIndex, pageSize, "star");
    // 默认获取全部导师推送
    this.getPersonal([], taskPageIndex, taskPageSize, "task");


    // // 获取个人收藏的数据，后面考虑三个 tab懒加载
    // this.$api.literature.getPersonal({
    //   type,
    //   subject: "all"
    // })
    //   .then(res => {
    //     console.log(res);
    //     if (res.data.code === 0) {
    //       this.literatureData = res.data.data;
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  },
  data() {
    return {
      // 页码相关
      type: "star",
      pageIndex: 1,
      pageSize: 12,
      pageTotal: 0,

      taskPageIndex: 1,
      taskPageSize: 12,
      taskPageTotal: 0,
      // pageLastId: "",
      // 学科分类条件
      check: [],

      categoryData: categoryData,
      literatureModel: false,
      literatureModelData: {
        title: null,
        author: null,
        // source: null,
        // time: null,
        category: null
      },
      literatureData: [
        // {
        //   literatureId: 1001,
        //   title: "基于门控递归单元神经网络的高速公路行程时间预测_刘松",
        //   author: "author1",
        //   category: 1, // 一一对应22个学科
        //   star: true
        // }
      ],
      taskLiteratureData: []
    };
  },
  computed: {
    // isStudent() {
    //   return this.$store.state.user.role === "student";
    // },
  },
  methods: {
    // 点击详情
    modelClick(index) {
      // console.log(this.literatureData[index]);
      let data;
      if (this.type === "star") {
        data = this.literatureData[index];
      } else if (this.type === "task") {
        data = this.taskLiteratureData[index];
      }
      this.literatureModelData = {
        title: data.title,
        author: data.author,
        // source: data.source,
        // time: data.time,
        category: this.categoryData[data.category - 1].value
      };
      this.literatureModel = true;
    },

    // 点击布置任务
    releaseClick(index) {
      let data = this.literatureData[index];
      console.log(data);
      let params = {
        literatureId: data.literatureId,
        title: data.title,
        author: data.author,
        // source: data.source,
        // time: data.time,
        category: this.categoryData[data.category - 1].value
      };
      // 跳转路由
      this.$router.push({
        // path: "/task/release",
        // query: params,
        name: "taskRelease",
        params: params,
        props: true
      });
      // console.log(res);
    },

    // 删除个人收藏
    deleteClick(index) {
      const { check, pageIndex, pageSize, type } = this;
      let data = this.literatureData[index];

      console.log("删除:", data);
      const { literatureId } = data;
      this.$api.literature.deletePersonalStar({
        literatureId: literatureId
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$Message.success("删除成功");
            // this.literatureData.splice(index, 1);
            // 删除成功需要重新请求当页数据
            this.getPersonal(check, pageIndex, pageSize, type);
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    // 点击查找文献
    searchButton(check) {
      // 点击查找文献必然从第一页开始查
      const { pageSize, type } = this;
      // 将查询条件赋值给当前页面
      this.check = check;
      console.log(check);
      this.getPersonal(check, 1, pageSize, type);
    },

    pageJump(index) {
      console.log(index);
      const { check, pageSize, type } = this;
      // 获取页码文献
      this.getPersonal(check, index, pageSize, type);
    },

    taskPageJump(index) {
      console.log(index);
      const { check, taskPageSize, type } = this;
      // 获取页码文献
      this.getPersonal(check, index, taskPageSize, type);
    },

    // 获取个人文献
    getPersonal(check, pageIndex, pageSize, type) {
      this.$api.literature.getPersonal({
        type,
        data: {
          check,
          pageIndex,
          pageSize,
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            if (type === "star") {
              this.literatureData = res.data.data;
              this.pageIndex = res.data.pageIndex;
              this.pageTotal = res.data.pageTotal;
            } else if (type === "task") {
              console.log(res.data);
              this.taskLiteratureData = res.data.data;
              this.taskPageIndex = res.data.pageIndex;
              this.taskPageTotal = res.data.pageTotal;
            }
          } else {
            this.$Message.info("未找到指定类别文献");
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
  }
};
</script>

<style lang="less" scoped>
// 搜索结果区域
.literature-content {
  // display: flex;
  // flex-flow: row wrap;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-gap: 10px;
  padding-bottom: 40px;
}

// 分页
.page-bar {
  padding: 0 0 40px 30%;
}

// 弹窗样式
.literature-model {
  padding: 20px;

  li {
    padding: 10px 0;
  }
}
</style>
