<template>
  <div v-if="$store.state.feature" id="features" @click.self="$store.commit('feature', null)">
    <div id="feature-content">
      <img src=""/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>

<style scoped lang="scss">
#features {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 32px;
  display: flex;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  background-origin: border-box;

  > * {
    z-index: 1001;
    margin: auto;
  }
}
</style>
