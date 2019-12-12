<template>
  <div class="personal">
    <!-- 搜索部分 -->
    <SearchCard :selectData="categoryData"></SearchCard>

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
          <!-- 单个文献组件 -->
          <LiteratureItem
            v-for="(literature, index) in literatureData"
            :key="literature.literatureId"
            :literature="literature"
            :index="index"
            @model-click="modelClick"
          ></LiteratureItem>
        </div>

        <!-- 分页 -->
        <div class="page-bar">
          <Page :total="100" show-total />
        </div>

        <!-- 文献详情页弹窗 -->
        <Modal v-model="literatureModel" title="文献详情" footer-hide>
          <ul class="literature-model">
            <li>
              标题：<span>{{ literatureModelData.title }}</span>
            </li>
            <li>
              作者：<span>{{ literatureModelData.author }}</span>
            </li>
            <li>
              来源：<span>{{ literatureModelData.source }}</span>
            </li>
            <li>
              发表时间：<span>{{ literatureModelData.time }}</span>
            </li>
            <li>
              分类：<span>{{ literatureModelData.category }}</span>
            </li>
          </ul>
        </Modal>
      </div>
    </Card>
  </div>
</template>

<script>
// @ is an alias to /src
import { categoryData } from "@/data/category";
import LiteratureItem from "@/components/literature/LiteratureItem.vue";
import SearchCard from "@/components/search/SearchCard.vue";

export default {
  name: "Personal",
  components: {
    LiteratureItem,
    SearchCard
  },
  data() {
    return {
      categoryData: categoryData,
      literatureModel: false,
      literatureModelData: {
        title: null,
        author: null,
        source: null,
        time: null,
        category: null
      },
      literatureData: [
        {
          literatureId: 1001,
          title: "基于门控递归单元神经网络的高速公路行程时间预测_刘松",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1, // 一一对应22个学科
          star: true
        },
        {
          literatureId: 1002,
          title: "单片机与嵌入式系统课程模块化教学方案在高职本科教育中的实施_甄久军",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1, // 一一对应22个学科
          star: true
        },
        {
          literatureId: 1003,
          title: "基于逆透视变换的条播作物早期作物行识别_赵学观",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1, // 一一对应22个学科
          star: true
        },
        {
          literatureId: 1004,
          title: "融合神经网络和指纹的可见光定位算法研究_刘冲",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1, // 一一对应22个学科
          star: true
        },
        {
          literatureId: 1005,
          title: "战斗机嵌入式训练系统中的智能虚拟陪练_陈斌",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1, // 一一对应22个学科
          star: true
        },
        {
          literatureId: 1006,
          title: "一种基于RBF神经网络实现波束形成的方法_周书宇",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1, // 一一对应22个学科
          star: true
        },
        {
          literatureId: 1007,
          title: "考虑区域综合能源系统拓扑特性的能源站和管线规划_徐成司",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 1, // 一一对应22个学科
          star: true
        },
        {
          literatureId: 1011,
          title: "基于射线穿透法的GPU并行阶梯型有限差分网格生成算法_李平",
          author: "author1",
          source: "China",
          time: "2019.01.01",
          category: 12, // 一一对应22个学科
          star: true
        }
      ]
    };
  },
  methods: {
    modelClick(index) {
      // console.log(this.literatureData[index]);
      let data = this.literatureData[index];
      for (let key in this.literatureModelData) {
        this.literatureModelData[key] = data[key];
      }
      // id到 value转换
      this.literatureModelData["category"] = this.categoryData[
        this.literatureModelData.category - 1
      ].value;
      this.literatureModel = true;
      // console.log(this.literatureModelData);
    }
  }
};
</script>

<style lang="less" scoped>
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
