<template>
  <div id="app">
    <router-view/>
    <Features/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Features from '@/components/features.vue';
import { lang } from '@/locale';
import { injectLang } from '@/inject-lang';

export default defineComponent({
  components: {
    // Features
  },

  data() {
    return {
      lang,
    };
  },

  mounted() {
    injectLang();
  }

});
</script>
