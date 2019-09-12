<template>
  <v-btn icon @click="logout" v-if="isLoggedIn">
    <!-- Hii {{user.displayName}} -->
    <v-img
      :src="user.photoURL"
      height="40"
      width="40"
      class="dp"
      contain
    ></v-img>
  </v-btn>
  <v-btn icon @click="login" v-else>
    <v-icon>mdi-account-circle</v-icon>
    <v-snackbar v-model="error" bottom relative>Unauthorised user</v-snackbar>
  </v-btn>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";

import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebase/auth";
import "firebase/firestore";

const provider = new firebase.auth.GoogleAuthProvider();

@Component
export default class Login extends vue {
  error = false;
  user = {} as firebase.User;

  get isLoggedIn() {
    if (this.user.email) {
      return true;
    }
    return false;
  }

  login() {
    firebase.auth().signInWithRedirect(provider);
  }

  logout() {
    firebase.auth().signOut();
    this.user = {} as firebase.User;
    this.$router.push("/");
  }

  async isUserValid(email: string) {
    let result = false;
    const db = firebase.firestore();
    await db
      .collection("Admin")
      .get()
      .then(snapshot => {
        snapshot.forEach(res => {
          const currentEmail = res.data().email;
          if (email == currentEmail) {
            result = true;
          }
        });
      });
    return result;
  }

  isLogin() {
    firebase.auth().onAuthStateChanged(async observer => {
      if (observer) {
        const isValidUser = await this.isUserValid(observer.email as string);

        if (isValidUser == false) {
          console.log("Unauthorised user");
          this.error = true;
          this.logout();
        } else {
          this.user = observer;
        }
      } else {
        this.user = {} as firebase.User;
      }
      this.$store.commit("setCurrentUser", this.user);
    });
  }

  mounted() {
    this.isLogin();
  }
}
</script>

<style lang="scss" scoped>
.dp {
  border-radius: 50%;
}
</style>
