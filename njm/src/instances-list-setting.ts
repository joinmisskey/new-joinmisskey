import { reactive } from "vue";
import { lang } from "./locale";

export const repositories = [
	"misskey-dev/misskey"
] as const;
export const orderOptions = ['default', 'originalNotesCount', 'originalUsersCount'] as const;
export const registrationStatuses = ['open', 'close'] as const;
export const instanceLanguages = ['ja', 'en', 'de', 'fr', 'zh', 'ko', 'ru', 'th', 'es', 'nl', 'bh', 'sv', 'it', 'cs', 'id', 'uk', 'pt'] as const;

export const languageLookup: { [x: string]: typeof instanceLanguages[number][] } = {
    'ja-JP': ['ja'],
    'en-US': ['en', 'fr', 'th', 'nl', 'bh', 'sv', 'cs', 'id', 'uk', 'pt'],
    'de-DE': ['de'],
    'ko-KR': ['ko'],
    'zh-TW': ['zh'],
    'zh-CN': ['zh'],
    'ru-RU': ['ru'],
    'it-IT': ['it'],
    'es-ES': ['es']
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
