import { createRouter, createWebHistory } from "vue-router";
import SuperheroList from "./components/SuperheroList.vue";
import Detail from "./components/Detail.vue";
import SuperPowerMatcher from "./components/SuperPowerMatcher.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: SuperheroList,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
    props: true,
  },
  {
    path:"/SuperPowerMatcher",
    name:"SuperPowerMatcher",
    component: SuperPowerMatcher,

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
