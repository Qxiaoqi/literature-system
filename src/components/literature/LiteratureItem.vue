<template>
  <div class="literature-item">
    <!-- 翻转效果 -->
    <div class="flip">
      <!-- 正面 -->
      <div class="front">
        <div class="front-top">
          <div
            class="collection"
            :class="{
              'collection-star': literature.star
            }"
          >
            <img src="@/assets/star.png" alt="collection" />
          </div>
        </div>
        <div class="front-bottom">
          <p>{{ literature.title }}</p>
        </div>
      </div>
      <!-- 反面 -->
      <div class="back">
        <ul>
          <li v-if="isDetailButton" class="back-item" @click="$emit('model-click', index)">详情</li>
          <li class="back-item" @click="downloadFile">下载</li>
          <li v-if="isAddButton" class="back-item" @click="$emit('add-click', index)">收藏</li>
          <li v-if="isReleaseButton" class="back-item" @click="$emit('release-click', index)">布置</li>
          <li v-if="isDeleteButton" class="back-item" @click="$emit('delete-click', index)">移除</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LiteratureItem",
  props: {
    literature: Object,
    index: Number,
    type: {
      type: String,
      default: "other"
    }
  },
  // data() {
  //   return {
  //     role: this.$store.state.user.role
  //   };
  // },
  computed: {
    // 详情、下载是三个权限都有的
    // 发布按钮，个人文献路径下：导师   可使用
    isReleaseButton() {
      return this.$store.state.user.role === "tutor" && this.$route.name === "personal" ? true : false;
    },

    // 添加按钮，公共文献路径下：导师 研究生可使用，个人文献路径下不可使用
    isAddButton() {
      return this.$route.name === "public" ? (this.$store.state.user.role === "tutor" || this.$store.state.user.role === "student"): false;
    },

    // 移除按钮，个人文献路径下：都可使用 (还要改，只有研究生的个人收藏才可移除，导师推送 系统推送 都不可移除)
    // 公共文献路径下：管理员 可使用
    isDeleteButton() {
      if (this.type === "tutorPush") {
        return false;
      } else {
        return this.$route.name === "personal" || (this.$route.name === "public" && this.$store.state.user.role === "admin") ? true : false;
      }
    },

    // 详情按钮，路由在 任务详情时不显示
    isDetailButton() {
      return this.$route.name !== "taskDetail" ? true : false;
    }
  },
  methods: {
    downloadFile() {
      console.log("下载:", this.literature);
      const { literatureId } = this.literature;
      this.$api.file.download({
        literatureId: literatureId
      })
        .then(res => {
          // 先判断是正常返回 blob，还是错误返回 json
          if (res.data.type === "application/json") {
            // 错误处理逻辑
            let reader = new FileReader();
            reader.onload = event => {
              console.log(JSON.parse(event.target.result));
              let result = JSON.parse(event.target.result);
              if (result.code === 4) {
                this.$Message.error(result.msg);
                this.$router.push({
                  name: "login"
                });
              }
            };
            reader.readAsText(res.data);
          } else {
            // 文件下载流程逻辑
            let content = res.data;
            let blob = new Blob([content]);
            // console.log(res);
            let fileName = decodeURI(res.headers["content-disposition"].split(";")[1].split("=")[1].split('"')[1]);
            // let fileName = "test.caj";
            // console.log(fileName);
            // console.log(blob);
            
            if ("download" in document.createElement("a")) {
              // 非IE下载
              let elink = document.createElement("a");
              elink.download = fileName;
              elink.style.display = "none";
              // let url = URL.createObjectURL(blob);
              elink.href = URL.createObjectURL(blob);
              console.log(elink);
              document.body.appendChild(elink);
              elink.click();
              URL.revokeObjectURL(elink.href);
            } else {
              // IE 10+ 下载
              navigator.msSaveBlob(blob, fileName);
            }
          }

        })
        .catch(err => {
          console.log(err);
        })
    }
  }
};
</script>

<style lang="less" scoped>
@book-color: #2b85e4;
@star-color: rgb(255, 209, 59);

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
      justify-content: space-evenly;
      height: 100%;
      padding: 50px 0;
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
    background-color: @book-color;
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
      background-color: @star-color;
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
