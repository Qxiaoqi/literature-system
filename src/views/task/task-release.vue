<template>
  <div class="release">
    <!-- 任务结果区域 -->
    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-add-circle"></Icon>
        任务发布
      </p>
      <div class="release-content">
        <ul class="release-select">
          <li class="select-item">
            <span class="item-title">标题：</span><span>{{ $route.params.title }}</span>
          </li>
          <li class="select-item">
            <span class="item-title">作者：</span><span>{{ $route.params.author }}</span>
          </li>
          <!-- <li class="select-item">
            来源：<span>{{ $route.params.source }}</span>
          </li>
          <li class="select-item">
            发表时间：<span>{{ $route.params.time }}</span>
          </li> -->
          <li class="select-item">
            <span class="item-title">分类：</span><span>{{ $route.params.category }}</span>
          </li>
          <li class="select-item select-require">
            <span class="item-title">选择学生：</span>
            <CheckboxGroup
              v-model="selectStudents"
              :style="{
                display: 'inline-block'
              }"
            >
              <Checkbox
                v-for="item in studentsData"
                :key="item.id"
                :label="item.id"
              >{{ item.name }}</Checkbox>
            </CheckboxGroup>
          </li>
          <li class="select-item select-require">
            <span class="item-title">最后期限：</span>
            <DatePicker
              type="date"
              v-model="deadline"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </li>
        </ul>
      </div>
      <!-- 详细要求 -->
      <div>
        <div ref="editor" style="text-align:left"></div>
        <div class="submit release-submit">
          <Button
            type="primary"
            :style="{
              padding: '0 40px'
            }"
            @click="releaseButton"
            >发布</Button
          >
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import E from "wangeditor";


export default {
  name: "TaskRelease",
  created() {
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
              name: item.name
            }
            target.push(temp);
          })
          this.studentsData = target;
        }
      })
      .catch(err => {
        console.log(err);
      })
  },
  data() {
    return {
      studentsData: [],
      selectStudents: [],
      deadline: "",
      // editorContent: "",
      editor: undefined
    };
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    // editor.customConfig.onchange = html => {
    //   this.editorContent = html;
    // };
    this.editor.customConfig.zIndex = 100;
    this.editor.create();
  },
  methods: {
    releaseButton() {
      const { selectStudents } = this;
      const literatureId = this.$route.params.literatureId;
      let deadlineData = this.deadline;
      let requirement = this.editor.txt.html();

      if (selectStudents.length === 0) {
        this.$Message.info("请选择学生");
      } else if (deadlineData === "") {
        this.$Message.info("请选择最后期限");
      } else if (requirement === "") {
        this.$Message.info("请填写任务要求");
      } else {
        let deadline = deadlineData.getFullYear() + "." + (deadlineData.getMonth() + 1) + "." + deadlineData.getDate();
        let releaseTimeData = new Date();
        let releaseTime = releaseTimeData.getFullYear() + "." + (releaseTimeData.getMonth() + 1) + "." + releaseTimeData.getDate();
        this.$api.task.releaseTask({
          literatureId,
          releaseTime,
          deadline,
          students: selectStudents,
          requirement
        })
          .then(res => {
            console.log(res);
            if (res.data.code === 0) {
              this.$Message.success(res.data.msg);
              // 布置成功后跳转到个人收藏页面
              this.$router.push({
                name: "personal"
              });
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          })
      }

    }
  }
};
</script>

<style lang="less" scoped>
.release-select {

  li {
    padding-bottom: 20px;
    list-style: none;
  }

  .item-title {
    font-weight: 700;
  }

  .select-require:before {
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 14px;
    color: #ed4014;
  }
}

.submit {
  padding-top: 20px;
  text-align: center;
}
</style>
