import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes";
import './assets/style/index.css'

// 51: ** HOME COMPONENT & ROUTING SETUP **
createApp(App).use(router).mount('#app')
