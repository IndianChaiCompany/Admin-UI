import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docRef: ""
  },
  getters: {
    getDocRef: state => {
      return state.docRef;
    }
  },
  mutations: {
    setDocRef(state, value) {
      state.docRef = value;
    },
    resetDocRef(state) {
      state.docRef = "";
    }
  },
  actions: {}
});
