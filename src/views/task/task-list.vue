<template>
  <div class="task">
    <!-- 搜索区域 -->
    <SearchCard :selectData="studentsData" title="搜索任务"></SearchCard>

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
          <ListItem>
            <ListItemMeta
              avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
              title="任务一"
              description="发布时间：2019.12.12   截止时间：2019.12.29" />
            <template slot="action">
              <li>
                <a href="" @click.prevent="taskDetail">详情</a>
              </li>
              <li>
                <a href="">删除</a>
              </li>
            </template>
          </ListItem>
          <ListItem>
            <ListItemMeta
              avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
              title="任务一"
              description="发布时间：2019.12.12   截止时间：2019.12.29" />
            <template slot="action">
              <li>
                <a href="" @click.prevent="taskDetail">详情</a>
              </li>
              <li>
                <a href="">删除</a>
              </li>
            </template>
          </ListItem>
        </List>

        <!-- 分页 -->
        <div class="page-bar">
          <Page :total="100" show-total />
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
  data() {
    return {
      // 分类从 0开始，学生从 100开始
      studentsData: [
        {
          id: 100,
          value: "学生0"
        },
        {
          id: 101,
          value: "学生1"
        },
        {
          id: 102,
          value: "学生2"
        },
        {
          id: 103,
          value: "学生3"
        },
        {
          id: 104,
          value: "学生4"
        },
        {
          id: 105,
          value: "学生5"
        },
        {
          id: 106,
          value: "学生6"
        }
      ]
    };
  },
  methods: {
    taskDetail() {
      this.$router.push({
        path: "/task/detail"
      });
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
