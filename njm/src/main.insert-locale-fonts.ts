const f = {
    'ja-JP': [
        'https://cdn.jsdelivr.net/npm/yakuhanjp@3.3.0/dist/css/yakuhanjp.min.css',
        'https://cdn.jsdelivr.net/gh/tamaina/The-Japanese-Web-Fonts@v7.2.0/dist/SourceHanSans/SourceHanSans.css',
        'https://cdn.jsdelivr.net/gh/tamaina/The-Japanese-Web-Fonts@v7.2.0/dist/NasuM/NasuM.css'
    ]
}

import { lang } from '@/locale';

export function insertLocaleFonts() {
    const html = document.getElementsByTagName('html').item(0);
    if (html) html.lang = lang;
    document.body.lang = lang;

    if (f[lang]) {
        for (const url of f[lang]) {
            const link = document.createElement('link');
            link.href = url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            document.head.appendChild(link);
        }
    }
}
