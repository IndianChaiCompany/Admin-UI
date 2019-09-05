<template>
  <v-stepper v-model="stage" vertical>
    <v-stepper-step :complete="stage > 1" step="1">
      Basic Details
      <small>Product Name and Category</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <Stage1 @submit="stage = 2" @cancel="deleteProduct"></Stage1>
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
</template>

<script lang="ts">
import vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import Stage1 from "./ProductForm/Stage1.vue";
import Stage2 from "./ProductForm/Stage2.vue";

@Component({
  components: { Stage1, Stage2 }
})
export default class ProductDetailForm extends vue {
  stage = 1;

  deleteProduct() {
    this.$router.back();
  }

  created() {
    console.log("Form created");
  }
  destroyed() {
    console.log("Form destroyed");
  }
}
</script>
