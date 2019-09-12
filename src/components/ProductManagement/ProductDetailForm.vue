<template>
  <div v-if="dataDownloaded">
    <v-container v-if="isExistingProduct">
      <v-row align="center" justify="center">
        <v-col>
          <h2 class="text-center display-1">You are editing</h2>
        </v-col>
        <v-col md="6" cols="12">
          <ProductTile :product="currentProduct"></ProductTile>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-stepper v-model="stage" vertical>
        <v-stepper-step :complete="stage > 1" step="1">
          Basic Details
          <small>Product Name and Category</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <Stage1
            :givenData="currentProduct"
            @submit="stage = 2"
            @cancel="$router.back()"
          ></Stage1>
        </v-stepper-content>

        <v-stepper-step :complete="stage > 2" step="2"
          >Description</v-stepper-step
        >
        <v-stepper-content step="2">
          <Stage2 @submit="stage = 3" @cancel="stage = 1"></Stage2>
        </v-stepper-content>

        <v-stepper-step :complete="stage > 3" step="3"
          >Inventory and Pricing</v-stepper-step
        >
        <v-stepper-content step="3">
          <Stage3 @submit="stage = 4" @cancel="stage = 2"></Stage3>
        </v-stepper-content>

        <v-stepper-step step="4">Pictures</v-stepper-step>
        <v-stepper-content step="4">
          <Stage4
            @submit="$router.push('/product')"
            @cancel="stage = 3"
          ></Stage4>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import Stage1 from "./ProductForm/Stage1.vue";
import Stage2 from "./ProductForm/Stage2.vue";
import Stage3 from "./ProductForm/Stage3.vue";
import Stage4 from "./ProductForm/Stage4.vue";
import ProductTile from "./ProductTile.vue";
import { IProduct, IVariant } from "../../../Common/IProducts";
import * as firestore from "firebase/app";
import "firebase/firestore";

@Component({
  components: { ProductTile, Stage1, Stage2, Stage3, Stage4 }
})
export default class ProductDetailForm extends vue {
  stage = 1;
  dataDownloaded = false;

  get currentProductID(): string {
    return this.$store.getters.getDocRef;
  }
  get isExistingProduct(): boolean {
    const res = !!this.currentProductID;
    if (res) this.getProductDetails();
    return res;
  }

  currentProduct: IProduct = {} as IProduct;

  getProductDetails() {
    const db = firestore.firestore();
    const productRef = db.collection("Product").doc(this.currentProductID);

    productRef.onSnapshot(snapshot => {
      this.currentProduct = snapshot.data() as IProduct;
      this.$store.commit("setCurrentProduct", this.currentProduct);
      this.dataDownloaded = true;
    });

    productRef.collection("Variant").onSnapshot(snapshot => {
      const variants: IVariant[] = [];
      snapshot.forEach(data => {
        variants.push(data.data() as IVariant);
      });
      this.$store.commit("setCurrentProductVariants", variants);
    });
  }

  isEdit() {
    return this.$route.path == "/product/edit";
  }
  isAdd() {
    return this.$route.path == "/product/add";
  }

  created() {
    console.log("Form created");
    console.log(this.$route.path);
    if (this.isEdit()) {
      if (this.isExistingProduct == false) {
        this.$router.push("/");
      }
    }
    if (this.isAdd()) {
      this.dataDownloaded = true;
      this.$store.commit("resetProduct");
    }
  }
  destroyed() {
    console.log("Form destroyed");
  }
}
</script>
