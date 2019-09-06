<template>
  <div>
    <v-card color="grey lighten-3" class="mb-12">
      <v-container>
        <v-form class="ma-4" ref="stage">
          <v-row wrap class="grey lighten-5 pa-4">
            <v-col xs="6" sm="6" md="3" cols="12">
              <v-text-field
                label="Price"
                type="number"
                class="price"
                v-model="price"
              />
            </v-col>
            <v-col xs="6" sm="6" md="3" cols="12">
              <v-text-field
                label="Weight"
                type="number"
                class="weight"
                v-model="weight"
              />
            </v-col>
            <v-col xs="6" sm="6" md="3" cols="12">
              <v-text-field
                label="Quantity"
                type="number"
                class="number"
                v-model="quantity"
              />
            </v-col>
            <v-col xs="6" sm="6" md="3" cols="12">
              <v-btn
                :loading="loading"
                :disabled="!isExistingProduct"
                @click="submit"
                color="primary"
                >Add Variant</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col
            cols="12"
            v-for="(variant, index) in currentProductVariant"
            :key="index"
            class="py-0 my-0"
          >
            <v-card class="pa-5 ma-2">
              <v-row flex class="px-3">
                <v-col>
                  <v-icon>mdi-weight-gram</v-icon>
                  {{ variant.weight }}
                </v-col>
                <v-col>
                  <v-icon>mdi-cash-usd-outline</v-icon>
                  {{ variant.price }}
                </v-col>
                <v-col>
                  <v-icon>mdi-numeric</v-icon>
                  {{ variant.quantity }}
                </v-col>
                <v-col>
                  <InventoryEdit :values="variant"></InventoryEdit>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-btn @click="$emit('submit')" color="primary">Next</v-btn>
    <v-btn text @click="$emit('cancel')">Back</v-btn>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";
import { IProduct } from "../../../../../Common/IProducts";
import InventoryEdit from "./InventoryEdit.vue";

import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({
  components: {
    InventoryEdit
  }
})
export default class Stage3 extends vue {
  loading = false;

  get currentProductDetail() {
    return this.$store.getters.getCurrentProduct as IProduct;
  }
  get currentProductVariant() {
    return this.$store.getters.getCurrentProductVariant as IProduct;
  }

  weight: number = 0;
  price: number = 0;
  quantity: number = 0;

  $refs!: {
    stage: HTMLFormElement;
  };

  validateStage(): boolean {
    return this.$refs.stage.validate() && this.isExistingProduct;
  }
  submit() {
    if (this.validateStage()) {
      this.loading = true;
      const newVariant = {
        price: Number.parseInt(this.price.toString()),
        weight: Number.parseInt(this.weight.toString()),
        quantity: Number.parseInt(this.quantity.toString())
      };
      this.price = this.weight = this.quantity = 0;

      const db = firebase.firestore();
      db.collection("Product")
        .doc(this.currentProductID)
        .collection("Variant")
        .doc(newVariant.weight.toString())
        .set(newVariant)
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          console.warn(err);
          this.loading = false;
        });
    }
  }
  get currentProductID(): string {
    return this.$store.getters.getDocRef;
  }
  get isExistingProduct(): boolean {
    return !!this.currentProductID;
  }
}
</script>

<style lang="scss">
.price {
  &::before {
    content: "Rs.";
    padding-top: 5px;
    padding-right: 10px;
  }
}
.weight {
  &::after {
    content: "gram";
    padding-top: 5px;
    padding-left: 10px;
  }
}
.number {
  &::before {
    content: "nos.";
    padding-top: 5px;
    padding-right: 10px;
  }
}
</style>
