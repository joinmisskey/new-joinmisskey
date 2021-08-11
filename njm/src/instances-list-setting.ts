import { markRaw } from "vue";
import { lang } from "./locale";

export const repositories = ['syuilo/misskey', 'mei23/misskey'] as const;
export const instanceLanguages = ['ja', 'en', 'de', 'fr', 'zh', 'ko', 'ru', 'de', 'th', 'es'] as const;

const languageLookup: { [x: string]: typeof instanceLanguages[number][] } = {
    'ja-JP': ['ja'],
    'en-US': ['en', 'de', 'fr', 'zh', 'ko', 'ru', 'de', 'th', 'es'],
};

export interface InstancesSetting {
    repository: typeof repositories[number][];
    sortCriteria: 'default' | 'version';
    sortDescendingOrder: boolean;
    language: typeof instanceLanguages[number][];
};

export const defaultInstancesSetting: InstancesSetting = markRaw({
    repository: [...repositories],
    sortCriteria: 'default',
    sortDescendingOrder: true,
    language: languageLookup[lang] || [...instanceLanguages],
});
