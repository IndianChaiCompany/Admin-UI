<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Indian</span>
        <span class="font-weight-light">CHAI COMPANY</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/" tag="div">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>
      <router-link tag="div" to="/product">
        <v-btn icon>
          <v-icon>mdi-book-information-variant</v-icon>
        </v-btn>
      </router-link>
      <Login></Login>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "./components/Login.vue";

@Component({
  components: {
    Login
  }
})
export default class App extends Vue {}
</script>
