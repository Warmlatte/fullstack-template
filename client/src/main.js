import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

<<<<<<< HEAD
app.mount('#app')
=======
app.mount('#app')
>>>>>>> 038d29b7c025044669326c8d9d5b262c9d06317e
