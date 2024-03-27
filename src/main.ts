import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins';
import { router } from './router';
import "./assets/css/cerceis.css"
import '@fortawesome/fontawesome-free/css/all.css'
import icon from './components/global/icon.vue';

const app = createApp(App);
app.component("fi", icon);
registerPlugins(app);
app.use(router);
app.mount('#app');