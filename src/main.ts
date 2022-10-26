import { createApp } from 'vue'
import App from './App.vue'

// 样式
import "@/styles/normal.less"
import "@/styles/dark.less"

const app = createApp(App)

// element plus
import ElementPlus from 'element-plus'
import '@/styles/element-theme-dark.css'
import '@/styles/element.css'
// 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus);

// 路由
import router from './router'
app.use(router);

// vuex
import {store} from "@/store";
app.use(store);

import clickOutside from "@/directives/click-outside";
app.directive('clickOutside', clickOutside);

// vueFlow
import {VueFlow} from "@vue-flow/core";
import '@vue-flow/core/dist/style.css';
import "@vue-flow/core/dist/theme-default.css";
app.component('VueFlow', VueFlow);

app.mount('#app')
