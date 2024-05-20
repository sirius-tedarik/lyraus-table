import Vue from "vue";

import LyrausTable from "./LyrausTable/index.vue";

import "./assets/index.css";

// Define the type for the Components object
type Components = {
  [key: string]: typeof Vue;
};

const Components: Components = {
  LyrausTable,
};

Object.keys(Components).forEach((name: string) => {
  Vue.component(name, Components[name]);
});

export default Components;
