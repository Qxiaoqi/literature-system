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
                index="1"
              ></LiteratureItem>
            </div>

            <!-- 文献介绍 -->
            <ul class="literature-list">
              <li>
                标题：<span>{{ literature.title }}</span>
              </li>
              <li>
                作者：<span>{{ literature.author }}</span>
              </li>
              <li>
                来源：<span>{{ literature.source }}</span>
              </li>
              <li>
                发表时间：<span>{{ literature.time }}</span>
              </li>
              <li>
                分类：<span>{{ literature.category }}</span>
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
                <Rate show-text allow-half v-model="scoreText">
                  <span style="color: #f5a623">{{ scoreText }}</span>
                </Rate>
              </div>
              <div class="score score-quality">
                <span>报告质量</span>
                <Rate show-text allow-half v-model="scoreText">
                  <span style="color: #f5a623">{{ scoreText }}</span>
                </Rate>
              </div>
              <div class="score score-quality">
                <span>学习态度</span>
                <Rate show-text allow-half v-model="scoreText">
                  <span style="color: #f5a623">{{ scoreText }}</span>
                </Rate>
              </div>
              <div class="submit score-submit">
                <Button type="primary">提交打分</Button>
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
      <div class="task-content"></div>
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
          <ListItem v-for="item in communicationData" :key="item.title">
            <ListItemMeta
              :avatar="item.avatar"
              title="用户名"
              description="发表时间"
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
        <div ref="editor" style="text-align:left"></div>
        <div class="submit communication-submit">
          <Button
            type="primary"
            :style="{
              padding: '0 40px'
            }"
            >提交</Button
          >
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import LiteratureItem from "@/components/literature/LiteratureItem.vue";
import E from "wangeditor";

export default {
  name: "TaskDetail",
  components: {
    LiteratureItem
  },
  data() {
    return {
      scoreText: 3,
      editorContent: "",
      literature: {
        literatureId: 1001,
        title: "基于门控递归单元神经网络的高速公路行程时间预测_刘松",
        author: "author1",
        source: "China",
        time: "2019.01.01",
        category: 1, // 一一对应22个学科
        star: true
      },
      communicationData: [
        {
          title: "This is title 1",
          description: "This is description, this is description, this is description.",
          avatar: "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content: "This is the content, this is the content, this is the content, this is the content."
        },
        {
          title: "This is title 2",
          description: "This is description, this is description, this is description.",
          avatar: "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content: "This is the content, this is the content, this is the content, this is the content."
        },
        {
          title: "This is title 3",
          description: "This is description, this is description, this is description.",
          avatar: "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content: "This is the content, this is the content, this is the content, this is the content."
        }
      ]
    };
  },
  mounted() {
    let editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
  },
  methods: {
    getContent() {
      console.log(this.editorContent);
    }
  }
};
</script>

<style lang="less" scoped>
.literature-book {
  display: inline-block;
}

.literature-list {
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
