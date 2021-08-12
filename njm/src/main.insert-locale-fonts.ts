import { lang } from '@/locale';

export function injectLang() {
    const html = document.getElementsByTagName('html').item(0);
    if (html) html.lang = lang;
    document.body.lang = lang;
}
