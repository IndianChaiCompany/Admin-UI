<template>
  <v-container>
    <v-row wrap>
      <v-col sm="12" md="4" v-for="(product, key) in productList" :key="key">
        <ProductTile :product="product[0]" :refID="product[1]"></ProductTile>
      </v-col>
    </v-row>
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
  productList: [IProduct, string][] = [];
  getProductsOf(type: ProductType) {
    let db = firebase.firestore();
    db.collection("Product")
      .where("type", "==", type)
      .onSnapshot(snapshot => {
        this.productList = [];
        snapshot.forEach(product => {
          this.productList.push([product.data() as IProduct, product.id]);
        });
      });
  }
  mounted() {
    this.getProductsOf("tea");
  }

  destroyed() {
    console.log("List destroyed");
  }
}
</script>

<style></style>
