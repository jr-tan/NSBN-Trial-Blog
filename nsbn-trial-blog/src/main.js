import { createApp } from 'vue'
import App from './App.vue'
import navbar from './components/HeaderNFooter/navbar.vue'
import router from './router'

createApp(App).use(router).mount('#app')
createApp(navbar).use(router).mount('#navbar')
