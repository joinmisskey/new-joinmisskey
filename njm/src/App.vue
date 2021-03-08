<template>
  <div id="app">
    <router-view/>
    <Features/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Features from '@/components/features.vue';

export default defineComponent({
  components: {
    Features
  },

  data() {
    return {
      lang: location.pathname.split('/')[1],
    };
  },
})
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;

  font-family: YakuHanJP, GenEiUniverSans-w, SourceHanSans-w, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1d1d1d;
}

h1, h2, h3, h4, h5, h6 {
  font-feature-settings:"palt";
  font-family: GenEiUniverSans-w, SourceHanSans-w, sans-serif;
}
</style>
