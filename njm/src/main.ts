import '@/default.scss';

if (location.href.includes('wiki/instances')) {
    history.replaceState(null, '', '/instances');
}

import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ScriptX from 'vue-scriptx';
import Ads from 'vue-google-adsense';

import App from './App.vue'
import { router } from './router';
import store from './store';
import { i18n } from './i18n';
import { lang } from './locale';

const app = createApp(App);

app.config.globalProperties = {
	$t: i18n.t,
	$ts: i18n.locale,
};

console.info('App create');

app
.use(store)
.use(router(lang))
.use(ScriptX)
.use(Ads.Adsense)
.use(Ads.InArticleAdsense)
.component('Fa', FontAwesomeIcon)
.mount('#app');

navigator.serviceWorker.register('/sw.js');
