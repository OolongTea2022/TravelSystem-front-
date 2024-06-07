// 引入需要的模块
import { createRouter, createWebHistory } from "vue-router";

import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";


// 下面使用了es6的对象增强写法，命名必须是routes
const routes = [
  {
    //默认展示，这是主页面路由必须加斜杠 /
    path: "/",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/hello",
    //路由懒加载
    component: () => import("../components/HelloWorld.vue"),
  },

  {
    path: "/ApplyBookView",
    component: () => import("../views/ApplyBookView.vue"),
  },
  {
    path: "/FinanceBookView",
    component: () => import("../views/FinanceBookView.vue"),
  },
  {
    path: "/ApplyInfoView",
    component: () => import("../views/ApplyInfoView.vue"),
  },
  {
    path: "/PathBookView",
    component: () => import("../views/PathBookView.vue"),
  },

];

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出路由
export default router;