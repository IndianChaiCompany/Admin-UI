<template>
  <v-card class="ma-2">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{
          product.name
        }}</v-list-item-title>
        <v-list-item-subtitle>{{ product.summary }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="img"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions v-if="refID">
      <v-btn text @click="editProduct">Edit</v-btn>
      <v-btn text @click="deleteProduct">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IProduct } from "../../../../Common/IProducts";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Component
export default class ProductTile extends Vue {
  @Prop({ type: Object as () => IProduct }) product!: IProduct;
  @Prop(String) refID!: string;

  img = this.product.productIconURL || "";

  deleteProduct() {
    let db = firebase.firestore();
    db.collection("Product")
      .doc(this.refID)
      .delete();
  }

  editProduct() {
    this.$store.commit("setDocRef", this.refID);
    this.$router.push("/product/edit");
  }
}
</script>
