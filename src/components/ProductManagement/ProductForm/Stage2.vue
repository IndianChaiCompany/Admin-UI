<template>
  <div>
    <v-card color="grey lighten-3" class="mb-12">
      <v-container>
        <v-form class="ma-4" ref="stage">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="summary"
                label="Short description"
                :rules="summaryRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="additionalDescription"
                label="Additional description"
                :rules="summaryRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="longDescription"
                label="Long description"
                :rules="longDescriptionRules"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
    <v-btn color="primary" @click="submit">Continue</v-btn>
    <v-btn text @click="$emit('cancel')">Back</v-btn>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Stage2 extends vue {
  summary = "";
  additionalDescription = "";
  longDescription = "";

  summaryRules: Function[] = [
    (v: string) => !!v || "This is required",
    (v: string) => v.length >= 50 || "Should be more than 50 characters"
  ];
  longDescriptionRules: Function[] = [
    (v: string) => !!v || "This is required",
    (v: string) => v.length >= 150 || "Should be more than 150 characters"
  ];

  $refs!: {
    stage: HTMLFormElement;
  };

  validateStage(): boolean {
    return this.$refs.stage.validate();
  }
  submit() {
    if (this.validateStage()) {
      this.$emit("submit");
    }
  }
}
</script>
