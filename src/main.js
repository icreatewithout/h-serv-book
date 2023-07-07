import {createApp} from 'vue'
import App from './App.vue'
import {pinia} from "@store/index.js";
import {router} from './router/index.js'
import ElementPlus from 'element-plus'
import {icons} from "@element-plus/icons-vue/global";
import './styles/style.scss'
import {zhCn} from "element-plus/es/locale/index";


const app = createApp(App)

app.config.globalProperties.$router = router

for (const i in icons) {
    app.component(i, icons[i])
}

app.use(pinia)
app.use(router)


app.use(ElementPlus)
app.mount('#app')
