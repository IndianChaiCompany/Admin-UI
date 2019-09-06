import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { IProduct, IVariant } from "../../Common/IProducts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docRef: "",
    currentProduct: {},
    currentProductVariant: []
  },
  getters: {
    getDocRef: state => {
      return state.docRef;
    },
    getCurrentProduct: state => {
      return state.currentProduct;
    },
    getCurrentProductVariant: state => {
      return state.currentProductVariant;
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
    },
    setCurrentProductVariants(state, variant) {
      state.currentProductVariant = variant;
    }
  },
  actions: {}
});
