<template>
  <div id="app">
    <router-view/>
    <Features/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Features from '@/components/features.vue';
import { lang } from '@/locale';
import { injectLang } from '@/main.insert-locale-fonts';

export default defineComponent({
  components: {
    Features
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
