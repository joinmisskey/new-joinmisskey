export interface InstancesSetting {
    repository: ('syuilo/misskey' | 'mei23/misskey')[];
    sortCriteria: 'default' | 'version';
    sortDescendingOrder: boolean;

};

export const defaultInstancesSetting: InstancesSetting = {
    repository: ['syuilo/misskey', 'mei23/misskey'],
    sortCriteria: 'default',
    sortDescendingOrder: true,
};
