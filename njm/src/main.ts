import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { router } from './router'
import store from './store'
import { createI18n } from 'vue-i18n'
import { loadLocaleMessages } from './i18n'

const redirect = sessionStorage.redirect
delete sessionStorage.redirect
if (redirect && redirect !== location.href) {
    history.replaceState(null, '', redirect)
}

const supportedLangs = ['ja-JP', 'en-US'];
const path = location.pathname.split('/');
let lang: string | null | undefined = localStorage.getItem('lang');

if (path[1]) path[1] = path[1].replace('_', '-');

if (path[1] && supportedLangs.includes(path[1])) {
    lang = path[1];
    localStorage.setItem('lang', lang);
} else if (path[1] && supportedLangs.some(v => v.startsWith(path[1]))) {
    lang = supportedLangs.find(v => v.startsWith(path[1])) as string;
    localStorage.setItem('lang', lang);
    path[1] = lang;
    history.replaceState('locale overwrite', '', path.join('/'));
} else {
    if (!lang || !supportedLangs.includes(lang)) {
        if (supportedLangs.includes(navigator.language)) {
            lang = navigator.language;
        } else {
            lang = supportedLangs.find(x => x.split('-')[0] === navigator.language);
    
            // Fallback
            if (lang == null) lang = 'en-US';
        }
    }

    path[0] = lang;
    history.replaceState('locale overwrite', '', [""].concat(...path).join('/'));
}

const i18n = createI18n({
    legacy: false,
    locale: lang,
    fallbackLocale: 'ja-JP',
    messages: loadLocaleMessages()
});

createApp(App).use(i18n).use(store).use(router(lang)).mount('#app')
