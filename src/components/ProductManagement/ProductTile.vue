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
        <v-img :src="product.img"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Edit</v-btn>
      <v-btn text>Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IProduct } from "../../../../Common/IProducts";

@Component
export default class ProductTile extends Vue {
  @Prop({ type: Object as () => IProduct }) product!: IProduct;
}
</script>
