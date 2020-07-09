<template>
  <div class="information">
    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-contact"></Icon>
        个人信息
      </p>
      <div class="information-content">
        <ul class="information-list">
          <li class="list-item">
            <span class="item-title">用户名：</span>
            <span>{{ info.username }}</span>
          </li>
          <li class="list-item">
            <span class="item-title">角色：</span>
            <span>{{ info.role }}</span>
          </li>
          <li class="list-item">
            <span class="item-title">姓名：</span>
            <span>{{ info.name }}</span>
          </li>
          <li class="list-item">
            <span class="item-title">性别：</span>
            <span>{{ info.gender === 1 ? "男" : "女" }}</span>
          </li>
          <li class="list-item">
            <span class="item-title">学院：</span>
            <span>{{ categoryName }}</span>
          </li>
          <li v-if="this.$store.state.user.role === 'tutor'" class="list-item">
            <span class="item-title">学生：</span>
            <Tag
              v-for="item in hasAddStudent"
              :key="item._id"
              :name="item._id"
              type="dot"
              closable
              color="primary"
              @on-close="deleteStudent"
            >{{ item.name }}</Tag>
            <Button icon="md-add" @click="addButton" type="primary">添加</Button>
          </li>
        </ul>
      </div>
      <Modal
        v-model="addStudentModel"
        title="添加学生"
        @on-ok="addStudent"
      >
        <CheckboxGroup v-model="selectStudent">
          <Checkbox
            v-for="item in allSameStu"
            :key="item._id"
            :label="item._id"
          >{{ item.name }}</Checkbox>
        </CheckboxGroup>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { categoryData } from "@/data/category";

export default {
  name: "Information",
  created() {
    // console.log("createdcreatedcreatedcreatedcreatedcreated");
    console.log(this.$store.state.user.username);
    this.$api.user.getUserInfo({
      username: this.$store.state.user.username
    })
      .then(res => {
        // console.log(res);
        if (res.data.code === 0) {
          this.info = res.data.data;
          this.categoryName = categoryData[res.data.data.faculty - 1].value;
        }
      })
      .catch(err => {
        console.log(err);
      })
    // 获取所有已经添加的学生
    if (this.$store.state.user.role === "tutor") {
      this.getAddStudent();
    }
  },
  data() {
    return {
      categoryData,
      categoryName: "",
      info: {},
      addStudentModel: false,
      // 相同学院学生
      allSameStu: [],
      // 选择学生
      selectStudent: [],
      // 已经添加的学生
      hasAddStudent: []
    }
  },
  methods: {
    // 点击添加按钮
    addButton() {
      console.log("点击添加学生按钮");
      this.addStudentModel = true;
      // 获取同学院的所有学生
      this.$api.student.getSameCollegeStu()
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            this.allSameStu = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    // 添加学生
    addStudent() {
      console.log("添加学生:", this.selectStudent);
      const { selectStudent } = this;
      this.$api.student.addStu({
        selectStudent
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            // this.allSameStu = res.data.data;
            this.$Message.success(res.data.msg);
            // 添加成功后重新请求学生数据
            this.getAddStudent();
            // 添加成功后，要将 this.selectStudent 置空
            this.selectStudent = [];
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    // 删除学生
    deleteStudent(event, name) {
      console.log(name);
      const { hasAddStudent } = this;
      
      // let idx = -1;
      // hasAddStudent.map((item, index) => {
      //   if (item._id === name) {
      //     idx = index;
      //   }
      // })
      // let index = hasAddStudent.indexOf(name);
      console.log(hasAddStudent);
      // console.log(index);
      this.$api.student.deleteStu({
        studentId: name
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
            // 添加成功后将当前已添加学生数据改动
            this.getAddStudent();
          }
        })
    },

    // 获取已经添加的学生
    getAddStudent() {
      this.$api.student.getStu()
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            this.hasAddStudent = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>


<style lang="less" scoped>
.information-list {

  li {
    padding-bottom: 20px;
    list-style: none;
  }

  .item-title {
    font-weight: 700;
  }
}

</style>