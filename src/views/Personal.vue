<template>
  <div class="personal">
    <Card dis-hover>
      <p slot="title">
        <Icon type="md-search"></Icon>
        搜索文献
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
          <CheckboxGroup
            v-model="checkAllGroup"
            @on-change="checkAllGroupChange"
          >
            <Checkbox label="计算机"></Checkbox>
            <Checkbox label="工程科学"></Checkbox>
            <Checkbox label="材料科学"></Checkbox>
            <Checkbox label="生物与生化"></Checkbox>
            <Checkbox label="微生物学"></Checkbox>
            <Checkbox label="分子生物与遗传学"></Checkbox>
            <Checkbox label="一般社会科学"></Checkbox>
            <Checkbox label="经济与商学"></Checkbox>
            <Checkbox label="化学"></Checkbox>
            <Checkbox label="地球科学"></Checkbox>
            <Checkbox label="地球科学"></Checkbox>
            <Checkbox label="地球科学"></Checkbox>
            <Checkbox label="气象学"></Checkbox>
            <Checkbox label="生物学"></Checkbox>
            <Checkbox label="数学"></Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <!-- 提交查询条件 -->
      <div class="submit">
        <Button type="primary">查询</Button>
      </div>
    </Card>

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
      <div class="results-content">
        <div class="results-line">
          <Row :gutter="32">
            <i-col span="4">
              <!-- 单个文献 -->
              <div class="literature-item">
                <!-- 翻转效果 -->
                <div class="flip">
                  <!-- 正面 -->
                  <div class="front">
                    <div class="front-top">
                      <div class="collection collection-star">
                        <img src="../assets/star.png" alt="collection" />
                      </div>
                    </div>
                    <div class="front-bottom">
                      <p>基于门控递归单元神经网络的高速公路行程时间预测_刘松</p>
                    </div>
                  </div>
                  <!-- 反面 -->
                  <div class="back">
                    <ul>
                      <li class="back-item">详情</li>
                      <li class="back-item">下载</li>
                      <li class="back-item">移除</li>
                    </ul>
                  </div>
                </div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection collection-star">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom">
                  <p>单片机与嵌入式系统课程模块化教学方案在高职本科教育中的实施_甄久军</p>
                </div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection collection-star">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom">
                  <p>基于逆透视变换的条播作物早期作物行识别_赵学观</p>
                </div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom">
                  <p>融合神经网络和指纹的可见光定位算法研究_刘冲</p>
                </div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom"></div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom"></div>
              </div>
            </i-col>
          </Row>
        </div>

        <div class="results-line">
          <Row :gutter="32">
            <i-col span="4">
              <!-- 单个文献 -->
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom"></div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom"></div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom"></div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom"></div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom"></div>
              </div>
            </i-col>
            <i-col span="4">
              <div class="literature-item">
                <div class="front-top">
                  <div class="collection">
                    <img src="../assets/star.png" alt="collection" />
                  </div>
                </div>
                <div class="front-bottom"></div>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
    </Card>
  </div>
</template>

<style lang="less" scoped>
.condition-bar {
  padding-bottom: 20px;
}

.condition-title {
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

// 搜索结果区域
.results-line {
  margin-bottom: 20px;
}

.literature-item {
  height: 250px;
  text-align: center;
  border-radius: 4px;

  .flip {
    height: 100%;
  }

  .front {
    height: 100%;
    border: 1px solid #eee;
    box-shadow: rgba(39, 39, 39, 0.08) 3px 3px 5px;
  }

  .back {
    width: 100%;
    height: 100%;
    // background-color: #2b85e4;
    background-image: linear-gradient(135deg, #43cbff 10%, #9708cc 100%);
    border-radius: 4px;
    border: 1px solid #eee;
    box-shadow: rgba(39, 39, 39, 0.08) 3px 3px 5px;

    ul {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      height: 100%;
      padding: 70px 0;
      font-size: 18px;
    }
    .back-item {
      color: #fff;
      list-style: none;
      cursor: pointer;
    }
  }

  .front-top {
    position: relative;
    height: 100px;
    background-color: #2b85e4;
    // background-image: linear-gradient( 135deg, #6B73FF 10%, #000DFF 100%);
    // background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    .collection {
      position: absolute;
      right: 20px;
      bottom: -25px;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: #c5c8ce;
      box-shadow: rgba(41, 41, 41, 0.1) 1px 1px 3px;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -13px;
        margin-left: -13px;
        height: 26px;
      }
    }

    .collection-star {
      background-color: rgb(255, 209, 59);
    }
  }

  .front-bottom {
    padding: 30px 10px 20px;
    font-weight: 700;
  }
}

// 翻转效果
.literature-item {
  perspective: 1000;
  transform-style: preserve-3d;
}

.flip {
  position: relative;
  transition: 0.6s;
  transform-style: preserve-3d;
}

.front,
.back {
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(-180deg);
}

.literature-item:hover .flip {
  transform: rotateY(180deg);
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "personal",
  components: {
    // HelloWorld
  },
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ["计算机"]
    };
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["计算机", "气象学", "生物学", "数学"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 4) {
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
