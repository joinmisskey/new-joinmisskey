<template>
  <div id="app">
    <Splash :show="splash" />
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from 'vue';
import Splash from '@/components/splash.vue';
import { lang } from '@/locale';
import { injectLang } from '@/inject-lang';
import { splash } from './splash';

onMounted(() => {
  injectLang();
})
</script>
