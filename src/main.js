import Vue from "vue";

import LyrausTable from "./LyrausTable";

import "./assets/index.css";

const Components = {
  LyrausTable,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
