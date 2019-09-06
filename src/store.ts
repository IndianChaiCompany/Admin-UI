import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docRef: "",
    currentProduct: {}
  },
  getters: {
    getDocRef: state => {
      return state.docRef;
    },
    getCurrentProduct: state => {
      return state.currentProduct;
    }
  },
  mutations: {
    setDocRef(state, value) {
      state.docRef = value;
    },
    resetProduct(state) {
      state.docRef = "";
      state.currentProduct = {};
      console.log("currentProductCleared");
    },
    setCurrentProduct(state, product) {
      state.currentProduct = product;
    }
  },
  actions: {}
});
