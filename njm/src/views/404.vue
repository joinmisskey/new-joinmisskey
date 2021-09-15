<template>
  <div id="nf">
    <h1>404 Not Found</h1>
    <p v-text="$ts['404-text']" />
    <p>
      <router-link to="/" v-text="$ts['toppage']" /> /
      <router-link to="/instances" v-text="$ts['instances-list']" /><br />
      <a href="https://wiki.misskey.io">Misskey Wiki</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '404',
  beforeCreate() {
    (this as any).$store.commit('hideSplash');
  },
});
</script>

<style lang="scss" scoped>
#nf {
  margin: 1rem;
}
</style>
