import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    token: null,
    member: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setMember(state, member) {
      state.member = member;
    }
  },
  actions: {
  },
  modules: {
  }
})
