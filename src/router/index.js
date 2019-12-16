import Vue from "vue";
import VueRouter from "vue-router";
import Personal from "../views/Personal.vue";
import Public from "../views/Public.vue";
import Task from "../views/Task.vue";
import TaskDetail from "../views/TaskDetail";

Vue.use(VueRouter);

const routes = [
  // 根目录重定向
  {
    path: "/",
    name: "home",
    redirect: "/personal"
  },
  {
    path: "/personal",
    name: "personal",
    component: Personal
  },
  {
    path: "/public",
    name: "public",
    component: Public
  },
  {
    path: "/task",
    name: "task",
    component: Task
  },
  {
    path: "/task/detail",
    name: "taskDetail",
    component: TaskDetail
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
