<template>
  <div id="app">
    <Splash :show="$store.state.splash" />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Splash from '@/components/splash.vue';
import { lang } from '@/locale';
import { injectLang } from '@/inject-lang';

export default defineComponent({
  components: {
    Splash,
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
