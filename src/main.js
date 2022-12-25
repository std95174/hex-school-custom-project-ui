import { createApp } from 'vue'
import {router} from "./routers/index.js";
import {pinia} from "./stores/index.js";
import './style.css'
import App from './App.vue'

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
