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
          <li class="back-item" @click="$emit('model-click', index)">详情</li>
          <li class="back-item" @click="$emit('release-click', index)">布置</li>
          <li class="back-item">下载</li>
          <li class="back-item">移除</li>
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
    index: Number
  }
};
</script>

<style lang="less" scoped>
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
