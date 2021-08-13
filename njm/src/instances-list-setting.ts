import { reactive } from "vue";
import { lang } from "./locale";

export const repositories = ['syuilo/misskey', 'mei23/misskey'] as const;
export const orderOptions = ['default', 'originalNotesCount', 'originalUsersCount', 'reactionsCount'] as const;
export const registrationStatuses = ['open', 'close'] as const;
export const instanceLanguages = ['ja', 'en', 'de', 'fr', 'zh', 'ko', 'ru', 'th', 'es'] as const;

export const languageLookup: { [x: string]: typeof instanceLanguages[number][] } = {
    'ja-JP': ['ja'],
    'en-US': ['en', 'fr', 'zh', 'ko', 'ru', 'th', 'es'],
    'de-DE': ['de'],
};

export interface InstancesSetting {
    repository: typeof repositories[number][];
    orderBy: typeof orderOptions[number];
    orderDesc: boolean;
    registrationStatus: typeof registrationStatuses[number][];
    language: typeof instanceLanguages[number][];
}

export const defaultInstancesSetting: InstancesSetting = reactive({
    repository: [...repositories],
    orderBy: 'default',
    orderDesc: true,
    registrationStatus: ['open'],
    language: languageLookup[lang] || [...instanceLanguages],
});
