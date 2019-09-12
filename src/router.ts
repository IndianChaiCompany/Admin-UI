import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Product from "./views/Product.vue";
import ProductDetailForm from "./components/ProductManagement/ProductDetailForm.vue";
import store from "./store";

Vue.use(Router);

function requireAuth(to: any, from: any, next: any) {
  store.getters.isLoggedIn ? next() : next({ name: "home" });
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/product",
      name: "product",
      component: Product,
      beforeEnter(to, from, next) {
        requireAuth(to, from, next);
      }
    },
    {
      path: "/product/add",
      name: "product add",
      component: ProductDetailForm,
      beforeEnter(to,from,next){
        requireAuth(to,from,next);
      }
    },
    {
      path: "/product/edit",
      name: "product edit",
      component: ProductDetailForm,
      beforeEnter(to,from,next){
        requireAuth(to,from,next);
      }
    }
  ]
});
