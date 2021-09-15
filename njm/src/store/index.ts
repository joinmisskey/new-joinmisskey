import { defaultInstancesSetting } from '@/instances-list-setting';
import { createStore } from 'vuex';

export default createStore({
  state: {
    feature: null as string | null,
    instancesSetting: defaultInstancesSetting,
    splash: true,
  },
  mutations: {
    feature(state, n: string | null) {
      state.feature = n;
    },
    showSplash(state) {
      state.splash = true;
    },
    hideSplash(state) {
      state.splash = false;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    instancesSetting: state => state.instancesSetting,
  },
});
