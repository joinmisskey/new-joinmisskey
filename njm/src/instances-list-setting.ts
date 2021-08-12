import { reactive } from "vue";
import { lang } from "./locale";

export const repositories = ['syuilo/misskey', 'mei23/misskey'] as const;
export const orderOptions = ['default', 'version', 'originalNotesCount', 'originalUsersCount', 'reactionsCount'] as const;
export const instanceLanguages = ['ja', 'en', 'de', 'fr', 'zh', 'ko', 'ru', 'de', 'th', 'es'] as const;

const languageLookup: { [x: string]: typeof instanceLanguages[number][] } = {
    'ja-JP': ['ja'],
    'en-US': ['en', 'de', 'fr', 'zh', 'ko', 'ru', 'de', 'th', 'es'],
};

export interface InstancesSetting {
    repository: typeof repositories[number][];
    orderBy: typeof orderOptions[number];
    orderDesc: boolean;
    registrationStatus: 'open' | 'close' | 'all';
    language: typeof instanceLanguages[number][];
}

export const defaultInstancesSetting: InstancesSetting = reactive({
    repository: [...repositories],
    orderBy: 'default',
    orderDesc: true,
    registrationStatus: 'open',
    language: languageLookup[lang] || [...instanceLanguages],
});
