import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docRef: "",
    currentProduct: {},
    currentProductVariant: [],
    currentUser: {} as firebase.User
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
    },
    getCurrentUser:state=>{
      return state.currentUser;
    },
    isLoggedIn:state=>{
      if (state.currentUser.email) {
        return true;
      }
      return false;
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
    },
    setCurrentUser(state,user){
      state.currentUser = user;
    }
  },
  actions: {}
});
