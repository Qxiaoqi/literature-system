import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "../layout/index.vue";
import Login from "../views/login/index.vue";
import Personal from "../views/personal/index.vue";
import Public from "../views/public/index.vue";
import TaskList from "../views/task/task-list.vue";
import TaskDetail from "../views/task/task-detail.vue";
import TaskRelease from "../views/task/task-release.vue";

// import { getLogin } from "../lib/getLogin";

Vue.use(VueRouter);

const routes = [
  // 根目录重定向
  {
    path: "/",
    name: "home",
    redirect: "/personal/index"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/personal",
    component: Layout,
    children: [
      {
        path: "index",
        name: "personal",
        component: Personal
      }
    ]
  },
  {
    path: "/public",
    component: Layout,
    children: [
      {
        path: "index",
        name: "public",
        component: Public
      }
    ]
  },
  {
    path: "/task-list",
    component: Layout,
    children: [
      {
        path: "index",
        name: "taskList",
        component: TaskList
      }
    ]
  },
  {
    path: "/task",
    component: Layout,
    children: [
      {
        path: "detail",
        name: "taskDetail",
        component: TaskDetail
      }
    ]
  },
  {
    path: "/task",
    component: Layout,
    children: [
      {
        path: "release",
        name: "taskRelease",
        component: TaskRelease
      }
    ]
  },
  {
    path: "/information",
    component: Layout,
    children: [
      // {
      //   path: "release",
      //   name: "taskRelease",
      //   component: TaskRelease
      // }
    ]
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

// router.beforeEach((to, from, next) => {
//   if (!getLogin) {
//     // 未登录

//   }
// });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
