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
	transition: opacity .5s ease;
	opacity: 1;

  > img {
    margin: auto;
    width: 64px;
    height: 64px;
    pointer-events: none;
  }
}

#splash.splash-enter-active {
  animation: splash-enter 0.5s;
  opacity: 0;
}
@keyframes splash-enter {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#splash.splash-leave-from {
  opacity: 0;
}
#splash.splash-leave-to {
  opacity: 0;
}
</style>
