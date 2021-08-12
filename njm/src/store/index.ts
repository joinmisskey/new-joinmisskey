import { defaultInstancesSetting, InstancesSetting } from '@/instances-list-setting';
import { createStore } from 'vuex';
import { reactive } from "vue";

export default createStore({
  state: {
    feature: null as string | null,
    instancesSetting: defaultInstancesSetting,
  },
  mutations: {
    feature(state, n: string | null) {
      state.feature = n;
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
