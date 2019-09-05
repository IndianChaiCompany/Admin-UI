<template>
  <v-container fill-height text-center>
    <v-layout column wrap align-center justify-center>
      <h1 class="display-2 font-weight-bold mb-3">Welcome to ICC Admin Page</h1>
      <p class="subheading font-weight-regular">
        This website is for authorised personnel only
        <br /><strong>Please login to continue</strong>
      </p>
      <router-link to="./product">
        <v-btn color="info">Product Management</v-btn>
      </router-link>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Homepage extends Vue {
  destroyed() {
    console.log("Homepage destroyed");
  }
}
</script>
