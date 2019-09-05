<template>
  <v-btn
    fab
    large
    color="primary"
    bottom
    right
    fixed
    @click.native.stop="click"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>
<script>
export default {
  methods: {
    click() {
      this.$emit("Add");
    }
  }
};
</script>
