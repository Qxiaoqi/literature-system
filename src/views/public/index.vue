<template>
  <div class="public">
    <!-- 搜索区域 -->
    <SearchCard :selectData="categoryData" title="搜索文献" @search="searchButton"></SearchCard>

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
      <Button
        v-if="isUploadButton"
        type="primary"
        slot="extra"
        size="small"
        @click="uploadModel = true"
      >上传文献</Button>
      <!-- tabs -->
      <!-- 个人结果栏 -->
      <div class="results-content">
        <div class="literature-content">
          <!-- 单个文献组件 -->
          <LiteratureItem
            v-for="(literature, index) in literatureData"
            :key="literature.literatureId"
            :literature="literature"
            :index="index"
            @model-click="modelClick"
            @add-click="addClick"
          ></LiteratureItem>
        </div>

        <!-- 分页 -->
        <div class="page-bar">
          <Page :total="pageTotal" :page-size="pageSize" @on-change="pageJump" show-total />
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
            <!-- <li>
              来源：<span>{{ literatureModelData.source }}</span>
            </li>
            <li>
              发表时间：<span>{{ literatureModelData.time }}</span>
            </li> -->
            <li>
              分类：<span>{{ literatureModelData.category }}</span>
            </li>
          </ul>
        </Modal>

        <!-- 上传文献弹窗 -->
        <Modal
          v-model="uploadModel"
          title="文献上传"
          width="70"
          footer-hide
        >
          <ul class="literature-model upload-model">
            <li>
              <span class="model-title">标题：</span>
              <div class="model-input">
                <!-- <Input v-model="uploadTitle" placeholder="请输入文献标题..." /> -->
                <span style="color: #2d8cf0">{{ uploadFile === null ? "**上传文件后显示**" : uploadFile.name }}</span>
              </div>
            </li>
            <li>
              <span class="model-title">作者：</span>
              <div class="model-input">
                <!-- <Input v-model="uploadAuthor" placeholder="请输入文献作者..." /> -->
                <span style="color: #2d8cf0">{{ uploadFile === null ? "**上传文件后显示**" : uploadFile.name.split('_')[uploadFile.name.split('_').length - 1].split('.')[0] }}</span>
              </div>
            </li>
            <!-- <li>
              <span class="model-title">来源：</span>
              <div class="model-input">
                <Input v-model="uploadSource" placeholder="请输入文献来源..." />
              </div>
            </li>
            <li>
              <span class="model-title">发表时间：</span>
              <div class="model-input">
                <Input v-model="uploadTime" placeholder="请输入文献发表时间..." />
              </div>
            </li> -->
            <li>
              <span class="model-title top-title">分类：</span>
              <div class="model-input">
                <RadioGroup v-model="uploadCategory">
                  <Radio
                    v-for="item in categoryData"
                    :key="item.id"
                    :label="item.id"
                    border
                  >{{ item.value }}</Radio>
                </RadioGroup>
              </div>
            </li>
            <li>
              <span class="model-title top-title">文件：</span>
              <div class="model-input">
                <Upload
                  :before-upload="handleUpload"
                  type="drag"
                  action="http://localhost:3000/file/upload/"
                >
                  <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽文件上传</p>
                  </div>
                </Upload>
                <!-- <div v-if="uploadFile !== null">文件名: {{ uploadFile.name }}</div> -->
              </div>
            </li>
          </ul>
          <div class="upload-button">
            <Button type="primary" long @click="upload" :loading="uploadLoading">上传文献</Button>
          </div>
        </Modal>
      </div>
    </Card>
  </div>
</template>

<script>
import { categoryData } from "@/data/category";
import LiteratureItem from "@/components/Literature/LiteratureItem.vue";
import SearchCard from "@/components/Search/SearchCard.vue";

export default {
  name: "Public",
  components: {
    LiteratureItem,
    SearchCard
  },
  created() {
    // console.log("create");
    const { pageIndex, pageSize } = this;
    // 默认获取全部公共文献
    this.getPublic([], pageIndex, pageSize);
  },
  data() {
    return {
      // 页码相关
      pageIndex: 1,
      pageSize: 12,
      pageTotal: 0,
      // pageLastId: "",
      // 学科分类条件
      check: [],

      categoryData: categoryData,
      literatureModel: false,
      // 上传数据
      uploadLoading: false,
      uploadModel: false,
      // uploadTitle: "",
      // uploadAuthor: "",
      // uploadSource: "",
      // uploadTime: "",
      uploadCategory: 1,
      uploadFile: null,

      literatureModelData: {
        title: null,
        author: null,
        category: null
      },
      literatureData: [
        // {
        //   literatureId: 1001,
        //   title: "基于门控递归单元神经网络的高速公路行程时间预测_刘松",
        //   author: "author1",
        //   category: 1, // 一一对应22个学科
        //   star: true
        // }
      ]
    };
  },
  computed: {
    isUploadButton() {
      console.log(this.$store.state.user.role);
      return this.$store.state.user.role === "tutor" || this.$store.state.user.role === "admin"  ? true : false;
    }
  },
  methods: {
    // 点击详情弹窗
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
    },

    // 点击收藏文献
    addClick(index) {
      let data = this.literatureData[index];

      console.log("添加:", data);
      const { literatureId } = data;
      this.$api.literature.addPersonalStar({
        literatureId: literatureId
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$Message.success("收藏成功");
            this.literatureData[index].star = true;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    // 点击查找文献
    searchButton(check) {
      // 点击查找文献必然从第一页开始查
      const { pageSize } = this;
      // 将查询条件赋值给当前页面
      this.check = check;
      console.log(check);
      this.getPublic(check, 1, pageSize);
    },

    pageJump(index) {
      console.log(index);
      const { check, pageSize } = this;
      // 获取页码文献
      this.getPublic(check, index, pageSize);
    },

    // 获取公共文献
    getPublic(check, pageIndex, pageSize) {
      this.$api.literature.getPublic({
        check,
        pageIndex,
        pageSize
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            this.literatureData = res.data.data;
            this.pageIndex = res.data.pageIndex;
            this.pageTotal = res.data.pageTotal;

            // 设置 pageLastId
            // this.pageLastId = res.data.data[res.data.data.length - 1].literatureId;
          } else {
            this.$Message.info("未找到指定类别文献");
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    handleUpload(file) {
      this.uploadFile = file;
      return false;
    },

    upload() {
      const { uploadCategory, uploadFile} = this;
      // console.log( uploadAuthor, uploadSource, uploadTime, uploadCategory, uploadFile);
      // console.log("uploadCategory:", uploadCategory);
      if (!uploadFile) {
        this.$Message.warning("请选择文件");
      }  else {
        this.uploadLoading = true;
        let formData = new FormData();
        formData.append("title", uploadFile.name);
        formData.append("author", uploadFile.name.split('_')[uploadFile.name.split('_').length - 1].split('.')[0]);
        // formData.append("source", uploadSource);
        // formData.append("time", uploadTime);
        formData.append("category", uploadCategory);
        formData.append("file", uploadFile);

        // console.log(formData.get("file"));

        this.$api.file.upload(formData)
          .then(res => {
            console.log(res);
            if (res.data.code === 0) {
              // 上传成功
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 4 || res.data.code === 1) {
              // 权限不足
              // 跳转到登录页
              // this.$Message.error(res.data.msg);
              // this.$router.push({
              //   name: "login"
              // })
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            // this.$Message.error(err);
          })
          .finally(() => {
            this.uploadLoading = false;
          })
      }

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

.upload-model {
  li {
    list-style: none;
  }

  .model-title {
    display: table-cell;
    word-break: keep-all;
  }

  .top-title {
    vertical-align: top;
    padding-top: 3px;
  }

  .model-input {
    display: table-cell;
    width: 100%;
  }
}

.upload-button {
  padding: 0 100px;
  text-align: center;
}
</style>
