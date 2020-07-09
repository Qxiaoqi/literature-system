<template>
  <div class="task">
    <!-- 搜索区域 -->
    <SearchCard
      v-if="this.$store.state.user.role === 'tutor'"
      :selectData="studentsData"
      title="搜索任务"
      @search="searchButton"
    ></SearchCard>

    <!-- 任务结果区域 -->
    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-book"></Icon>
        任务列表
      </p>
      <!-- <Button type="primary" slot="extra" size="small" @click.prevent="taskRelease">发布任务</Button> -->
      <div class="results-content">
        <List>
          <ListItem 
            v-for="item in taskListData"
            :key="item.taskId"
          >
            <ListItemMeta
              avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
              :title="`${item.title} [${item.student}]`"
              :description="`发布时间：${item.releaseTime}   截止时间：${item.deadline}`" />
            <template slot="action">
              <li>
                <a href="" @click.prevent="taskDetail(item.taskId)">详情</a>
              </li>
              <li v-if="$store.state.user.role === 'tutor'" >
                <a href="" @click.prevent="taskDelete(item.taskId)">删除</a>
              </li>
            </template>
          </ListItem>
        </List>

        <!-- 分页 -->
        <div class="page-bar">
          <Page :total="pageTotal" :page-size="pageSize" @on-change="pageJump" show-total />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import SearchCard from "@/components/Search/SearchCard.vue";

export default {
  name: "Task",
  components: {
    SearchCard
  },
  created() {
    const { pageIndex, pageSize } = this;
    // 默认获取全部任务
    this.getTaskList([], pageIndex, pageSize);

    // 若是导师，则获取所有管理的学生
    if (this.$store.state.user.role === 'tutor') {
      this.$api.student.getStu()
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            let data = res.data.data;
            let target = [];
            console.log(data);
            data.map(item => {
              let temp = {
                id: item._id,
                value: item.name
              }
              target.push(temp);
            })
            this.studentsData = target;
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  data() {
    return {
      // 分类从 0开始，学生从 100开始
      studentsData: [
        // {
        //   id: 100,
        //   value: "学生0"
        // }
      ],
      check: [],
      pageIndex: 1,
      pageSize: 10,
      pageTotal: 0,

      taskListData: []
    };
  },
  methods: {
    taskDetail(taskId) {
      console.log(taskId);
      this.$router.push({
        name: "taskDetail",
        params: { taskId },
        props: true
      });
    },

    // 删除任务
    taskDelete(taskId) {
      console.log(taskId);
      // this.$api.task.deleteTask({
      //   taskId
      // })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    },

    // 点击查找文献
    searchButton(check) {
      // 点击查找文献必然从第一页开始查
      const { pageSize } = this;
      // 将查询条件赋值给当前页面
      this.check = check;
      console.log(check);
      this.getTaskList(check, 1, pageSize);
    },

    // 获取任务列表
    getTaskList(check, pageIndex, pageSize) {
      this.$api.task.getTaskList({
        check,
        pageIndex,
        pageSize
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.taskListData = res.data.data;
            this.pageIndex = res.data.pageIndex;
            this.pageTotal = res.data.pageTotal;

          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    // 分页跳转
    pageJump(index) {
      console.log(index);
      const { check, pageSize } = this;
      // 获取页码文献
      this.getTaskList(check, index, pageSize);
    }
  }
};
</script>

<style lang="less" scoped>
// 分页
.page-bar {
  padding: 0 0 40px 30%;
}
</style>
