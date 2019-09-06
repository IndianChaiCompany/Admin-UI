<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn icon text v-on="on">
          <v-icon>mdi-square-edit-outline</v-icon>EDIT
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
          >Edit Inventory</v-card-title
        >

        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Price"
                  v-model="newValues.price"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Weight"
                  v-model="newValues.weight"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Quantity"
                  v-model="newValues.quantity"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="error" @click="deleteVariant">Delete</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="saveVariant">Save</v-btn>
          <v-btn color="primary" text @click="cancelVariant">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IVariant } from "../../../../../Common/IProducts";

import * as firebase from "firebase/app";
import "firebase/firestore";

@Component
export default class InventoryEdit extends vue {
  dialog = false;
  newValues: IVariant = {} as IVariant;

  @Prop({ type: Object as () => IVariant }) values!: IVariant;

  makeCopyOfOrig() {
    this.newValues = JSON.parse(JSON.stringify(this.values));
  }
  mounted() {
    this.makeCopyOfOrig();
  }
  cancelVariant() {
    this.makeCopyOfOrig();
    this.dialog = false;
  }

  deleteVariant() {
    const docRef = this.$store.getters.getDocRef;
    const db = firebase.firestore();
    db.collection("Product")
      .doc(docRef)
      .collection("Variant")
      .doc(this.values.weight.toString())
      .delete()
      .then(() => {
        this.dialog = false;
      })
      .catch(err => {
        console.warn(err);
      });
  }
  saveVariant() {
    const docRef = this.$store.getters.getDocRef;
    const db = firebase.firestore();
    db.collection("Product")
      .doc(docRef)
      .collection("Variant")
      .doc(this.values.weight.toString())
      .update(this.newValues)
      .then(() => {
        this.dialog = false;
      })
      .catch(err => {
        console.warn(err);
      });
  }
}
</script>
