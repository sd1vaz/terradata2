import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$changePage = function(pageName, pageUrl ) 
{
    console.log("Alterando página para:", pageName, "url:", pageUrl);
    router.push(pageUrl);
}

app.mount('#app')
