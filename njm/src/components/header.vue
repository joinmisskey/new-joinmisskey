<template>
  <div id="header">
    <div class="buttons left">
      <router-link to="/" class="_button button">
        <IconChevronLeft />
      </router-link>
    </div>
    <div v-text="title" class="title mx-auto" />
    <div class="buttons right">
      <button @click="rightClicked" class="_button button">
        <IconSettings />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { } from "vue";
import {
  IconChevronLeft,
  IconSettings,
} from '@tabler/icons-vue';

defineProps<{
  title: string;
  rightClicked: (ev: MouseEvent) => unknown;
}>();
</script>


<style lang="scss" scoped>
#header {
  display: flex;
  text-align: center;
  background-color: var(--X16);
  border-bottom: .5px solid var(--divider);
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 1000;
  
  --height: 50px;

  > div {
    line-height: var(--height);
  }
}

.buttons {
  --margin: 8px;
  align-items: center;
  display: flex;
  height: var(--height);
  margin: 0 var(--margin);

  .button {
    align-items: center;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    height: calc(var(--height) - var(--margin)*2);
    justify-content: center;
    position: relative;
    width: calc(var(--height) - var(--margin)*2);

    &:hover {
      color: inherit;
      background: rgba(0,0,0,.05);
    }
  }
}

.title {
  font-weight: 700;
}

</style>
