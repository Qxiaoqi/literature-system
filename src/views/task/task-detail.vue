<template>
  <div class="detail">
    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-book"></Icon>
        任务打分
      </p>
      <div class="scoring-bar">
        <Row>
          <i-col span="16">
            <div class="literature-book">
              <!-- 单个文献组件 -->
              <LiteratureItem
                :literature="literature"
              ></LiteratureItem>
            </div>

            <!-- 文献介绍 -->
            <ul class="literature-introduce">
              <li>
                标题：<span>{{ literature.title }}</span>
              </li>
              <li>
                作者：<span>{{ literature.author }}</span>
              </li>
              <!-- <li>
                来源：<span>{{ literature.source }}</span>
              </li>
              <li>
                发表时间：<span>{{ literature.time }}</span>
              </li> -->
              <li>
                分类：<span>{{ categoryName }}</span>
              </li>
              <li>
                布置时间：<span>{{ taskData.releaseTime }}</span>
              </li>
              <li>
                截至时间：<span>{{ taskData.deadline }}</span>
              </li>
            </ul>
          </i-col>
          <i-col span="8">
            <Card
              dis-hover
              :style="{
                textAlign: 'center'
              }"
            >
              <p slot="title">
                打分情况
              </p>
              <div class="score score-time">
                <span>完成时间</span>
                <Rate :disabled="$store.state.user.role === 'student'" show-text allow-half v-model="score.timeScore">
                  <span style="color: #f5a623">{{ score.timeScore }}</span>
                </Rate>
              </div>
              <div class="score score-quality">
                <span>报告质量</span>
                <Rate :disabled="$store.state.user.role === 'student'" show-text allow-half v-model="score.qualityScore">
                  <span style="color: #f5a623">{{ score.qualityScore }}</span>
                </Rate>
              </div>
              <div class="score score-quality">
                <span>学习态度</span>
                <Rate :disabled="$store.state.user.role === 'student'" show-text allow-half v-model="score.attitudeScore">
                  <span style="color: #f5a623">{{ score.attitudeScore }}</span>
                </Rate>
              </div>
              <div v-if="$store.state.user.role === 'tutor'" class="submit score-submit">
                <Button type="primary" @click="submitScore">提交打分</Button>
              </div>
            </Card>
          </i-col>
        </Row>
      </div>
    </Card>

    <!-- 任务详情 -->
    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-list-box"></Icon>
        任务要求
      </p>
      <div class="task-content">
        <div v-html="taskData.requirement"></div>
      </div>
    </Card>

    <!-- 任务交流 -->
    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-chatboxes"></Icon>
        任务交流
      </p>
      <div class="task-communication">
        <List item-layout="vertical">
          <ListItem v-for="(item, index) in communicationData" :key="index">
            <ListItemMeta
              :avatar="item.avatar"
              :title="item.title"
              :description="item.description"
            />
            {{ item.content }}
          </ListItem>
        </List>
      </div>
    </Card>

    <!-- 发表交流 -->
    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-text"></Icon>
        留言
      </p>
      <div>
        <div ref="talkEditor" style="text-align:left"></div>
        <div class="submit communication-submit">
          <Button
            type="primary"
            :style="{
              padding: '0 40px'
            }"
            @click="submitCommunication"
            >提交</Button
          >
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { categoryData } from "@/data/category";
import LiteratureItem from "@/components/Literature/LiteratureItem.vue";
import E from "wangeditor";

export default {
  name: "TaskDetail",
  components: {
    LiteratureItem
  },
  created() {
    console.log(this.$route.params.taskId);
    // 根据 taskId 获取任务信息
    this.$api.task.getTaskDetail({
      taskId: this.$route.params.taskId
    })
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.literature = {
            literatureId: res.data.data.literatureId,
            title: res.data.data.title,
            author: res.data.data.author,
            category: res.data.data.category,
            star: true
          }
          this.categoryName = categoryData[res.data.data.category - 1].value;
          // console.log(this.categoryName);
          this.taskData = res.data.data;
          this.score = {
            timeScore: res.data.data.score[0],
            qualityScore: res.data.data.score[1],
            attitudeScore: res.data.data.score[2]
          }
        }
      })
      .catch(err => {
        console.log(err);
      })

    // 获取留言信息
    this.getCommunicationList(this.$route.params.taskId);
  },
  data() {
    return {
      categoryData,
      categoryName: "",
      // scoreText: 3,
      // editorContent: "",
      editor: undefined,
      score: {
        timeScore: 0,
        qualityScore: 0,
        attitudeScore: 0
      },
      literature: {
        // literatureId: 1001,
        // title: "基于门控递归单元神经网络的高速公路行程时间预测_刘松",
        // author: "author1",
        // category: 1, // 一一对应22个学科
        // star: true
      },
      taskData: {},
      communicationData: [
        // {
        //   title: "This is title 1",
        //   description: "This is description, this is description, this is description.",
        //   avatar: "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
        //   content: "This is the content, this is the content, this is the content, this is the content."
        // }
      ]
    };
  },
  mounted() {
    this.editor = new E(this.$refs.talkEditor);
    this.editor.customConfig.zIndex = 100;
    this.editor.create();
  },
  methods: {
    getContent() {
      // console.log(this.editorContent);
    },

    // 提交打分
    submitScore() {
      const { score } = this;
      const taskId = this.$route.params.taskId;
      console.log(score);
      let scoreArr = [score.timeScore, score.qualityScore, score.attitudeScore];
      this.$api.task.submitTaskScore({
        taskId,
        scoreArr
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    // 提交交流内容
    submitCommunication() {
      const taskId = this.$route.params.taskId;
      let content = this.editor.txt.text();
      if (content === "") {
        this.$Message.info("请填写留言");
      } else {
        this.$api.task.submitCommunication({
          taskId,
          content
        })
          .then(res => {
            console.log(res);
            if (res.data.code === 0) {
              this.$Message.success(res.data.msg);
              // 重新请求留言列表
              this.getCommunicationList(taskId);
              // 提交完后，清空 富文本内 内容
              this.editor.txt.clear();
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    },

    // 获取留言信息
    getCommunicationList(taskId) {
    this.$api.task.getCommunication({
      taskId: taskId
    })
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          let data = res.data.data;
          // console.log(data);
          let target = [];
          data.map(item => {
            let temp = {
              title: item.username,
              description: item.time,
              avatar: "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
              content: item.content
            };
            target.push(temp);
          })
          this.communicationData = target;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style lang="less" scoped>
.literature-book {
  display: inline-block;
}

.literature-introduce {
  display: inline-block;
  vertical-align: top;
  padding-left: 40px;

  li {
    padding: 10px 0;
  }
}

.score {
  span {
    padding-right: 30px;
    vertical-align: middle;
  }
}

.submit {
  padding-top: 20px;
  text-align: center;
}

.communication-submit {
  text-align: right;
}
</style>
