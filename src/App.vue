<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import "./utils/getUser";

export default {
  name: "App"
};
</script>

<style lang="less">
@font-color: #2c3e50;

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @font-color;
}
</style>
