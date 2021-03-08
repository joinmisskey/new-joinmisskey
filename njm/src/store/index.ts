import { createStore } from 'vuex'

export default createStore({
  state: {
    feature: null as string | null,
  },
  mutations: {
    feature(state, n: string | null) {
      state.feature = n;
    },
  },
  actions: {
  },
  modules: {
  }
});
