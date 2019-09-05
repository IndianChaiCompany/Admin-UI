<template>
  <v-container grid-list-xs>
    <ProductTile
      v-for="(product, key) in productList"
      :key="key"
      :product="product"
    ></ProductTile>
  </v-container>
</template>

<script lang="ts">
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Vue, Prop, Component } from "vue-property-decorator";
import { ProductType, IProduct } from "../../../../Common/IProducts";
import ProductTile from "./ProductTile.vue";

@Component({
  components: {
    ProductTile
  }
})
export default class ProductVue extends Vue {
  productList: IProduct[] = [];
  getProductsOf(type: ProductType) {
    let db = firebase.firestore();
    db.collection("Product")
      .where("type", "==", type)
      .onSnapshot(snapshot => {
        this.productList = [];
        snapshot.forEach(product => {
          this.productList.push(product.data() as IProduct);
        });
      });
  }
  mounted() {
    this.getProductsOf("tea");
  }
}
</script>

<style></style>
