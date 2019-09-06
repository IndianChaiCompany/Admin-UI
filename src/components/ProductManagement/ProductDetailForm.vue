<template>
  <div>
    <v-container v-if="isExistingProduct" :fluid="true">
      <v-row align="center" justify="center">
        <v-col>
          <h2 class="success--text">You are editing</h2>
        </v-col>
        <v-col md="6" sm="12">
          <ProductTile :product="currentProduct"></ProductTile>
        </v-col>
      </v-row>
    </v-container>
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
        >Provide description</v-stepper-step
      >

      <v-stepper-content step="2">
        <Stage2 @submit="stage = 3" @cancel="stage = 1"></Stage2>
      </v-stepper-content>

      <v-stepper-step :complete="stage > 3" step="3"
        >Inventory and Pricing</v-stepper-step
      >

      <v-stepper-content step="3">
        <v-card color="grey lighten-3" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="stage = 4">Save and Next</v-btn>
        <v-btn text @click="stage = 2">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">Provide picture</v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-3" class="mb-12" height="200px"></v-card>
        <v-btn color="success" @click="stage = 1">Submit</v-btn>
        <v-btn text @click="stage = 3">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import Stage1 from "./ProductForm/Stage1.vue";
import Stage2 from "./ProductForm/Stage2.vue";
import ProductTile from "./ProductTile.vue";
import { IProduct } from "../../../../Common/IProducts";
import * as firestore from "firebase/app";
import "firebase/firestore";

@Component({
  components: { ProductTile, Stage1, Stage2 }
})
export default class ProductDetailForm extends vue {
  stage = 1;

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
    db.collection("Product")
      .doc(this.currentProductID)
      .get()
      .then(snapshot => {
        this.currentProduct = snapshot.data() as IProduct;
        this.$store.commit("setCurrentProduct", this.currentProduct);
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
      this.$store.commit("resetProduct");
    }
  }
  destroyed() {
    console.log("Form destroyed");
  }
}
</script>
