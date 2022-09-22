import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 样式
import "@/styles/normal.css"
import "@/styles/dark.less"


const app = createApp(App)

app.use(router)

app.mount('#app')
