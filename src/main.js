import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./request/api";
import ViewUI from "view-design";
import ECharts from "vue-echarts";

import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";

import "view-design/dist/styles/iview.css";

Vue.prototype.$api = api;
Vue.use(ViewUI);
Vue.component("chart", ECharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
