import axios from 'axios';
import { createApp, h } from 'vue';

import router from './router';
import store from './store';
import App from './App.vue';
import SvgIcon from '@/components/SvgIcon.vue';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';

const app = createApp({
  render: () => h(App),
});

app.use(router);
app.use(store);
app.component('AppSvgIcon', SvgIcon);
app.mount('#app');

export default app;