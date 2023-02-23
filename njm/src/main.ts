import '@/default.scss';

if (location.href.includes('wiki/instances')) {
    history.replaceState(null, '', '/instances');
}

import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ScriptX from 'vue-scriptx';
//import Ads from 'vue-google-adsense';
import { createGtm } from '@gtm-support/vue-gtm';

import App from './App.vue'
import { router } from './router';
import { i18n } from './i18n';
import { lang } from './locale';

const app = createApp(App);

app.config.globalProperties = {
	$t: i18n.t,
	$ts: i18n.locale,
};

console.info('App create');

app
.use(router(lang))
.use(ScriptX)
// REMOVE_GAD_$2000
//.use(Ads.Adsense)
//.use(Ads.InArticleAdsense)
//.use(Ads.InFeedAdsense)
.use(
	createGtm({
		id: 'GTM-M98RX87'
	})
)
.component('Fa', FontAwesomeIcon)
.mount('#app');

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
