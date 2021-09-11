import * as extend from 'extend';
const localeMods = require.context('./locales', true, /\.json$/i)
const ja = localeMods('./ja-JP.json');

export const locales = localeMods.keys().reduce((res, key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      res[matched[1]] = extend({}, ja, localeMods(key));
    }
    return res;
}, {} as Record<string, Record<string, any>>);

const supportedLangs = Object.keys(locales);

const path = location.pathname.split('/');
let _lang: string | null | undefined = localStorage ? localStorage.getItem('lang') : null;

if (path[1]) path[1] = path[1].replace('_', '-');

if (path[1] && supportedLangs.includes(path[1])) {
    _lang = path[1];
    if (localStorage) localStorage.setItem('lang', _lang);
} else if (path[1] && supportedLangs.some(v => v.startsWith(path[1]))) {
    _lang = supportedLangs.find(v => v.startsWith(path[1])) as string;
    if (localStorage) localStorage.setItem('lang', _lang);
    path[1] = _lang;
    history.replaceState('locale overwrite', '', path.join('/'));
} else {
    if (!_lang || !supportedLangs.includes(_lang)) {
        if (supportedLangs.includes(navigator.language)) {
            _lang = navigator.language;
        } else {
            _lang = supportedLangs.find(x => x.split('-')[0] === navigator.language);
    
            // Fallback
            if (_lang == null) _lang = 'en-US';
        }
    }

    path[0] = _lang;
    history.replaceState('locale overwrite', '', [""].concat(...path).join('/'));
}

export const lang = _lang;
export const locale = locales[lang];
