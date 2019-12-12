<template>
  <!-- 搜索区域 -->
  <SearchCard :selectData="studentsData"></SearchCard>
</template>

<script>
import SearchCard from "@/components/search/SearchCard.vue";

export default {
  name: "Task",
  components: {
    SearchCard
  },
  data() {
    return {
      // 分类从 0开始，学生从 100开始
      studentsData: [
        {
          id: 100,
          value: "学生0"
        },
        {
          id: 101,
          value: "学生1"
        },
        {
          id: 102,
          value: "学生2"
        },
        {
          id: 103,
          value: "学生3"
        },
        {
          id: 104,
          value: "学生4"
        },
        {
          id: 105,
          value: "学生5"
        },
        {
          id: 106,
          value: "学生6"
        }
      ]
    };
  }
};
</script>
