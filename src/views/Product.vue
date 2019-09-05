<template>
  <div>
    <ProductList></ProductList>
    <AddButton @add="addProduct"></AddButton>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import ProductList from "@/components/ProductManagement/ProductList.vue";
import AddButton from "@/components/ProductManagement/AddButton.vue";

@Component({
  components: {
    ProductList,
    AddButton
  }
})
export default class Product extends Vue {
  addProduct() {
    this.$router.push("/product/add");
  }
}
</script>

<style></style>
