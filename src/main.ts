import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 样式
import "@/styles/normal.css"
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

app.use(router)

app.mount('#app')
