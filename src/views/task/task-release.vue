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
            标题：<span>{{ $route.params.title }}</span>
          </li>
          <li class="select-item">
            作者：<span>{{ $route.params.author }}</span>
          </li>
          <li class="select-item">
            来源：<span>{{ $route.params.source }}</span>
          </li>
          <li class="select-item">
            发表时间：<span>{{ $route.params.time }}</span>
          </li>
          <li class="select-item">
            分类：<span>{{ $route.params.category }}</span>
          </li>
          <li class="select-item select-require">
            选择学生：
            <CheckboxGroup
              v-model="students"
              :style="{
                display: 'inline-block'
              }"
            >
              <Checkbox label="1">学生1</Checkbox>
              <Checkbox label="2">学生2</Checkbox>
              <Checkbox label="3">学生3</Checkbox>
            </CheckboxGroup>
          </li>
          <li class="select-item select-require">
            最后期限：
            <DatePicker
              type="date"
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
  data() {
    return {
      students: [],
      editorContent: ""
    };
  },
  mounted() {
    let editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
  }
};
</script>

<style lang="less" scoped>
.release-select {

  li {
    padding-bottom: 20px;
    list-style: none;
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
