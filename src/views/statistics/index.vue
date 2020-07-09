<template>
  <div class="chart">
    <Card
      dis-hover
      :style="{
        margin: '20px 0'
      }"
    >
      <p slot="title">
        <Icon type="md-book"></Icon>
        查询条件
      </p>
      <div class="condition-bar">
        <div>查询方式：
          <RadioGroup v-model="type" @on-change="typeChange">
            <Radio label="tutor">教师</Radio>
            <Radio label="student">学生</Radio>
          </RadioGroup>
        </div>
        <div class="check-bar">
          <div class="condition-title">选择目标：</div>
          <div class="condition-select">
            <!-- 多选栏 -->
            <CheckboxGroup v-model="check">
              <Checkbox
                v-for="item in selectData"
                :key="item.id"
                :label="item.id"
                :style="{
                  paddingBottom: '10px'
                }"
                >{{ item.name }}</Checkbox
              >
            </CheckboxGroup>
          </div>
        </div>
        
      </div>
      <!-- 提交查询条件 -->
      <div class="submit">
        <Button type="primary" @click="searchButton">查询</Button>
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
        结果展示
      </p>
      <div class="results">
        <chart :style="{width: '100%'}" :options="barData"></chart>
      </div>

    </Card>

  </div>
</template>

<script>
export default {
  name: "statistics",
  created() {
    const { type } = this;
    this.getSearchObj(type);
  },
  data() {
    return {
      type: "tutor",
      barData: {},
      check: [],
      selectData: []
    }
  },
  mounted() {
    this.barData = {
      itemStyle: {
        color: "#2d8cf0"
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: []
        }
      ]
    }
  },
  methods: {
    // 查询方式单选改动
    typeChange(type) {
      // console.log(type);
      // 每次修改查询方式，都要将选中的清空
      this.check = [];
      this.getSearchObj(type);
    },

    // 获取要查询的目标对象
    getSearchObj(type) {
      // console.log(type);
      this.$api.chart.getSearch({
        type
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.selectData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    searchButton() {
      const { check, type } = this;
      console.log(check, type);
      this.$api.chart.search({
        check,
        type
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.barData.xAxis.data = res.data.data.targetName;
            this.barData.series[0].data = res.data.data.targetData;
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
.condition-bar {
  padding: 0 20px 20px 20px;
  // padding-bottom: 20px;
}

.check-bar {
  padding-top: 10px;
}

.condition-title {
  width: 80px;
  display: table-cell;
}

.condition-select {
  display: table-cell;
  // padding-left: 20px;
}

.submit {
  text-align: center;
}
</style>

