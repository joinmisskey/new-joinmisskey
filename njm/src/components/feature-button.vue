<template>
  <button class="_textButton feature-button" @click="showFeature(name)" v-text="$ts._features._details[name].title"></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
  },

  methods: {
    showFeature(v) {
      (this as any).$store.commit('feature', v);
    },
  },
});
</script>

<style scoped lang="scss">
.feature-button {
  font-weight: 200;
  font-size: 1.1rem;
  line-height: 1.5rem;
}
</style>
