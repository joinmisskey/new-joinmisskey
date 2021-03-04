import { createApp } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import './registerServiceWorker'
import { router } from './router'
import store from './store'
import { i18n } from './i18n'
import { lang } from './locale'

const redirect = sessionStorage.redirect
delete sessionStorage.redirect
if (redirect && redirect !== location.href) {
    history.replaceState(null, '', redirect)
}

const app = createApp(App);

app.config.globalProperties = {
	$t: i18n.t,
	$ts: i18n.locale,
};

app.use(store).use(router(lang)).component('Fa', FontAwesomeIcon).mount('#app');
