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
            <Checkbox
              v-for="item in categoryData"
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
      <!-- <Button type="primary" slot="extra" size="small">上传文献</Button> -->
      <div class="results-content">
        <div class="literature-content">
          <!-- 单个文献 -->
          <div class="literature-item" v-for="literature in literatureData" :key="literature.literatureId">
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
                  <p>{{ literature.title }}</p>
                </div>
              </div>
              <!-- 反面 -->
              <div class="back">
                <ul>
                  <li class="back-item" @click="literatureModel = true">详情</li>
                  <li class="back-item">下载</li>
                  <li class="back-item">移除</li>
                </ul>
              </div>
            </div>
          </div>
        </div>


        <!-- 分页 -->
        <div class="page-bar">
          <Page :total="100" show-total />
        </div>

        <!-- 文献详情页弹窗 -->
        <Modal v-model="literatureModel" title="文献详情" footer-hide>
          <ul class="literature-model">
            <li>标题：<span>基于门控递归单元神经网络的高速公路行程时间预测_刘松</span></li>
            <li>作者：<span>刘松</span></li>
            <li>来源：<span>China</span></li>
            <li>发表时间：<span>2019.12.09</span></li>
            <li>分类：<span>计算机科学</span></li>
          </ul>
        </Modal>
      </div>
    </Card>
  </div>
</template>

<script>
// @ is an alias to /src
import { categoryData } from "@/data/category";

export default {
  name: "personal",
  components: {
    // HelloWorld
  },
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [1],
      literatureModel: false,
      categoryData: categoryData,
      literatureData: [
        {
          literatureId: 1001,
          title: "基于门控递归单元神经网络的高速公路行程时间预测_刘松",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1 // 一一对应22个学科
        },
        {
          literatureId: 1002,
          title: "单片机与嵌入式系统课程模块化教学方案在高职本科教育中的实施_甄久军",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1 // 一一对应22个学科
        },
        {
          literatureId: 1003,
          title: "基于逆透视变换的条播作物早期作物行识别_赵学观",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1 // 一一对应22个学科
        },
        {
          literatureId: 1004,
          title: "融合神经网络和指纹的可见光定位算法研究_刘冲",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1 // 一一对应22个学科
        },
        {
          literatureId: 1005,
          title: "战斗机嵌入式训练系统中的智能虚拟陪练_陈斌",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1 // 一一对应22个学科
        },
        {
          literatureId: 1006,
          title: "一种基于RBF神经网络实现波束形成的方法_周书宇",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1 // 一一对应22个学科
        },
        {
          literatureId: 1007,
          title: "考虑区域综合能源系统拓扑特性的能源站和管线规划_徐成司",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1 // 一一对应22个学科
        },
        {
          literatureId: 1011,
          title: "基于射线穿透法的GPU并行阶梯型有限差分网格生成算法_李平",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 12 // 一一对应22个学科
        }
      ]
    };
  },
  computed: {
    // 学科分类 id
    categoryIdArray() {
      let res = this.categoryData.map(item => {
        return item.id;
      });
      return res;
    },
    // 学科分类 value
    categoryValueArray() {
      let res = this.categoryData.map(item => {
        return item.value;
      });
      return res;
    }
  },
  methods: {
    handleCheckAll() {
      // console.log(categoryData);
      console.log(this.categoryValueArray);
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = this.categoryIdArray;
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 22) {
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

// 搜索结果区域
.literature-content {
  // display: flex;
  // flex-flow: row wrap;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-gap: 10px;
  padding-bottom: 40px;
}

// .literature-content::after {
//   content: "";
//   flex: 1;
// }

.literature-item {
  height: 250px;
  width: 180px;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 4px;

  .flip {
    height: 100%;
  }

  .front {
    height: 100%;
    border: 1px solid #eee;
    border-radius: 4px;
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

// 分页
.page-bar {
  padding: 0 0 40px 30%;
}

// 弹窗样式
.literature-model {
  padding: 20px;

  li {
    padding: 10px 0;
  }
}
</style>
