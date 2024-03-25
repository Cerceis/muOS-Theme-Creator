import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins';
import { router } from './router';
import "./assets/css/cerceis.css"


const app = createApp(App);

registerPlugins(app);
app.use(router);
app.mount('#app');