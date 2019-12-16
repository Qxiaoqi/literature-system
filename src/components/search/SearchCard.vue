<template>
  <Card dis-hover>
    <p slot="title">
      <Icon type="md-search"></Icon>
      {{ title }}
    </p>
    <div class="condition-bar">
      <div class="condition-title">分类：</div>
      <div class="condition-select">
        <!-- 全选 -->
        <div class="select-all">
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
            >全选</Checkbox
          >
        </div>
        <!-- 多选栏 -->
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox
            v-for="item in selectData"
            :key="item.id"
            :label="item.id"
            :style="{
              paddingBottom: '10px'
            }"
            >{{ item.value }}</Checkbox
          >
        </CheckboxGroup>
      </div>
    </div>
    <!-- 提交查询条件 -->
    <div class="submit">
      <Button type="primary">查询</Button>
    </div>
  </Card>
</template>

<script>
export default {
  name: "SearchCard",
  props: {
    selectData: Array,
    title: String
  },
  data() {
    return {
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [] // 默认没选就是全选
    };
  },
  computed: {
    // 多选选项 id
    selectIdArray() {
      let res = this.selectData.map(item => {
        return item.id;
      });
      return res;
    },
    // 多选选项 value
    selectValueArray() {
      let res = this.selectData.map(item => {
        return item.value;
      });
      return res;
    }
  },
  methods: {
    handleCheckAll() {
      // console.log(selectData);
      console.log(this.selectValueArray);
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = this.selectIdArray;
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === this.selectData.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.condition-bar {
  padding: 0 20px 20px 20px;
  // padding-bottom: 20px;
}

.condition-title {
  width: 50px;
  display: table-cell;
}

.condition-select {
  display: table-cell;
  padding-left: 20px;
}

.select-all {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 6px;
  margin-bottom: 6px;
}

.submit {
  text-align: center;
}
</style>
