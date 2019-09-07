<template>
  <div>
    <v-row wrap>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="newPath"
          :label="`${label} URL`"
          @input="handelInput"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <img :src="newPath" :alt="newPath" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class ImagePreview extends Vue {
  @Prop(String) value!: string;
  @Prop(String) label!: string;

  newPath = this.value || "";

  handelInput() {
    this.$emit("input", this.newPath);
  }
}
</script>

<style scoped>
img {
  height: 100px;
  width: 100px;
}
</style>
