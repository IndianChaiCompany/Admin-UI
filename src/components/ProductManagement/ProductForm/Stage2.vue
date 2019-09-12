<template>
  <div>
    <v-card color="grey lighten-3" class="mb-12">
      <v-container>
        <v-form class="ma-4" ref="stage">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                type="text"
                v-model="currentProductDetail.summary"
                label="Short description"
                :rules="summaryRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                type="text"
                v-model="currentProductDetail.additionalDescription"
                label="Additional description"
                :rules="additionalRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                type="text"
                v-model="currentProductDetail.bigDescription"
                label="Long description"
                :rules="longDescriptionRules"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
    <v-btn
      :loading="loading"
      :disabled="!isExistingProduct"
      color="primary"
      @click="submit"
      >Continue</v-btn
    >
    <v-btn text @click="$emit('cancel')">Back</v-btn>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";
import { IProduct } from "../../../../Common/IProducts";

import * as firebase from "firebase/app";
import "firebase/firestore";

@Component
export default class Stage2 extends vue {
  summaryRules: Function[] = [
    (v: string) => !!v || "This is required",
    (v: string) => {
      if (v) {
        return v.length >= 20 || "Should be more than 20 characters";
      }
      return false;
    }
  ];
  additionalRules: Function[] = [
    (v: string) => !!v || "This is required",
    (v: string) => {
      if (v) {
        return v.length >= 50 || "Should be more than 50 characters";
      }
      return false;
    }
  ];
  longDescriptionRules: Function[] = [
    (v: string) => !!v || "This is required",
    (v: string) => {
      if (v) {
        return v.length >= 100 || "Should be more than 100 characters";
      }
      return false;
    }
  ];

  loading = false;

  get currentProductDetail() {
    return this.$store.getters.getCurrentProduct as IProduct;
  }

  $refs!: {
    stage: HTMLFormElement;
  };

  validateStage(): boolean {
    return this.$refs.stage.validate() && this.isExistingProduct;
  }
  submit() {
    if (this.validateStage()) {
      this.loading = true;

      const db = firebase.firestore();
      db.collection("Product")
        .doc(this.currentProductID)
        .update(this.currentProductDetail)
        .then(() => {
          this.loading = false;
          this.$emit("submit");
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
