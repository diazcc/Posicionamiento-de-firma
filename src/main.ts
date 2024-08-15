// main.js o main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router.ts';
import './style.scss';
import { createPinia } from 'pinia'; // Importa createPinia desde Pinia


import { createI18n } from 'vue-i18n';
import lang  from './locales/lang.js';


const i18n = createI18n({
    legacy: false,
    messages: lang,
    fallbackFormat: 'en',
    locale: navigator.language.startsWith('es') ? 'es' : 'en'
});
const app = createApp(App);
const pinia = createPinia();
// Use calendar defaults (optional)
app.use(router);
app.use(i18n);
app.use(pinia);
app.mount('#app');
