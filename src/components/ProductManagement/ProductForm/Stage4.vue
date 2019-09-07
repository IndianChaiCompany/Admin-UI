<template>
  <div>
    <v-card color="grey lighten-3" class="mb-12">
      <v-container class="pa-6">
        <div class="title">Image upload</div>
        <v-alert
          :dense="true"
          :icon="false"
          class="ma-3 my-12"
          border="bottom"
          colored-border
          type="warning"
          elevation="2"
        >
          We do not host photos to minimize our bandwidth consumption. To
          upload/edit photos we recommend you to upload photos through
          <a
            href="https://imgur.com/upload"
            target="_blank"
            rel="noopener noreferrer"
            >imgur</a
          >
          or something similar and paste direct link here.(link should end with
          .jpg, .jpeg, .png)
        </v-alert>
        <v-container class="ma-3">
          <div class="title">Product icon</div>
          <ImagePreview v-model="productIconURL" label="Product icon" />

          <div class="title">Common Photos</div>
          <v-row v-for="i in 4" :key="i">
            <v-col>
              <ImagePreview
                v-model="productImagesURL[i - 1]"
                :label="`Photo ${i}`"
              ></ImagePreview>
            </v-col>
          </v-row>

          <template v-for="variant in currentProductVariant">
            <v-divider
              :key="variant.weight + 'divider'"
              class="ma-6"
            ></v-divider>
            <div class="title" :key="variant.weight">
              {{ variant.weight }} gram Photos
            </div>
            <v-row
              v-for="i in 2"
              :key="variant.weight.toString() + i.toString()"
            >
              <v-col>
                <ImagePreview
                  v-model="productVariantImagesURL[variant.weight][i - 1]"
                  :label="`${variant.weight} gram Photo ${i}`"
                ></ImagePreview>
              </v-col>
            </v-row>
          </template>
        </v-container>
      </v-container>
    </v-card>
    <v-btn @click="submit" color="primary">Next</v-btn>
    <v-btn text @click="$emit('cancel')">Back</v-btn>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";
import { IProduct, IVariant } from "../../../../../Common/IProducts";

import * as firebase from "firebase/app";
import "firebase/firestore";
import ImagePreview from "./ImagePreview.vue";

@Component({
  components: {
    ImagePreview
  }
})
export default class Stage4 extends vue {
  loading = false;

  productIconURL = this.currentProductDetail.productIconURL;
  productImagesURL = [
    this.currentProductDetail.productImagesURL1,
    this.currentProductDetail.productImagesURL2,
    this.currentProductDetail.productImagesURL3,
    this.currentProductDetail.productImagesURL4
  ];
  productVariantImagesURL = {} as any;

  get currentProductDetail() {
    const product = this.$store.getters.getCurrentProduct as IProduct;
    return product;
  }
  get currentProductVariant() {
    const variants = this.$store.getters.getCurrentProductVariant as IVariant[];
    variants.forEach(variant => {
      this.productVariantImagesURL[variant.weight] = [
        variant.productImagesURL1,
        variant.productImagesURL2
      ];
    });
    return variants;
  }

  validateStage(): boolean {
    return this.isExistingProduct;
  }
  submit() {
    if (this.validateStage()) {
      this.loading = true;

      const db = firebase.firestore();
      const docRef = db.collection("Product").doc(this.currentProductID);

      const final = {
        productIconURL: this.productIconURL,
        productImagesURL1: this.productImagesURL[0],
        productImagesURL2: this.productImagesURL[1],
        productImagesURL3: this.productImagesURL[2],
        productImagesURL4: this.productImagesURL[3]
      };

      docRef
        .update(final)
        .then(() => {
          const AllVariants = Object.keys(this.productVariantImagesURL);

          AllVariants.forEach(async variant => {
            const final = {
              productImagesURL1: this.productVariantImagesURL[variant][0],
              productImagesURL2: this.productVariantImagesURL[variant][1]
            };
            await docRef
              .collection("Variant")
              .doc(variant)
              .update(final);
          });
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
