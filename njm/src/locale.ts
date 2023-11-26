import extend from 'extend';
const localeMods = import.meta.glob('./locales/*.json') as Record<string, () => Promise<Record<string, any>>>;

export const locales = Object.keys(localeMods).reduce((res, key) => {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  if (matched && matched.length > 1) {
    res[matched[1]] = localeMods[key];
  }
  return res;
}, {} as Record<string, () => Promise<Record<string, any>>>);

const supportedLangs = Object.keys(locales);
export const localeNames = [
  ['ja-JP', '日本語'],
  ['en-US', 'English'],
  ['de-DE', 'Deutsch'],
  ['ko-KR', '한국어'],
  ['zh-TW', '繁體中文'],
  ['zh-CN', '简体中文'],
  ['ru-RU', 'Русский'],
  ['it-IT', 'Italiano'],
  ['es-ES', 'Español (ES)'],
  ['uz-UZ', 'O`zbek'],
];

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
export const locale = extend({}, (await localeMods['./locales/ja-JP.json']()).default, (await locales[lang]()).default);
export const langNumber = new Intl.NumberFormat(_lang);
