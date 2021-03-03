
const supportedLangs = ['ja-JP', 'en-US'];
const path = location.pathname.split('/');
let _lang: string | null | undefined = localStorage.getItem('lang');

if (path[1]) path[1] = path[1].replace('_', '-');

if (path[1] && supportedLangs.includes(path[1])) {
    _lang = path[1];
    localStorage.setItem('lang', _lang);
} else if (path[1] && supportedLangs.some(v => v.startsWith(path[1]))) {
    _lang = supportedLangs.find(v => v.startsWith(path[1])) as string;
    localStorage.setItem('lang', _lang);
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

const localeMods = require.context('./locales', true, /\.json$/i)
export const locale = localeMods(`./${lang}.json`);
