import { InstancesSetting } from '@/instances-list-setting';
import { createStore } from 'vuex'

export default createStore({
  state: {
    feature: null as string | null,
    instancesSetting: {} as InstancesSetting,
  },
  mutations: {
    feature(state, n: string | null) {
      state.feature = n;
    },
    instancesSetting(state, n: any) {
      state.feature = n;
    },
  },
  actions: {
  },
  modules: {
  }
});
