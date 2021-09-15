<template>
  <transition name="splash">
    <div id="splash" v-if="show">
      <img src="/img/icons/mstile-150x150.png">
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ['show'],

  data() {
    return {
    }
  }
});
</script>

<style lang="scss" scoped>
#splash {
	display: flex;
	position: fixed;
	z-index: 10000;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	cursor: wait;
	background-color: var(--bg);
	opacity: 1;
	transition: opacity .5s ease;

  > img {
    margin: auto;
    width: 64px;
    height: 64px;
    pointer-events: none;
  }
}

#splash.splash-enter-active {
	transition: opacity .1s ease;
  // animation: splash-enter 0.3s;
}
#splash.splash-leave-active {
	cursor: default;
}
#splash.splash-enter-from,
#splash.splash-leave-from,
#splash.splash-leave-to {
  opacity: 0;
}
</style>
