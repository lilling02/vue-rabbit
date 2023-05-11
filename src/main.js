import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getCategory } from '@/apis/testAPI';

import App from './App.vue'
import router from './router'

async function testAPI(params) {
    let result = await getCategory()
    console.log(result.data)
}

testAPI()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
