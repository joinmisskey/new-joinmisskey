<template>
<transition :name="'instances-setting'" appear>
  <div v-if="$store.state.feature" id="instances-setting" @click.self="enter()">
    <div id="feature-content" class="_shadow">
      
    </div>
  </div>
</transition>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import { } from '@fortawesome/free-solid-svg-icons'

markRaw(faTimes);

export default defineComponent({
  components: {
    Img,
  },

  data() {
    return {
      
    }
  },

  computed: {
  },

  methods: {
    enter() {
      (this as any).$store.commit('instances-settingSetting', {

      });
    },
  },
});
</script>

<style scoped lang="scss">
.instances-setting-enter-active, .instances-setting-leave-active {
  transition: opacity 0.3s !important;

  #feature-content {
    transition: transform 0.3s !important;
  }
}
.instances-setting-enter-from, .instances-setting-leave-to {
  pointer-events: none;
  opacity: 0;

  #feature-content {
    transform: scale(0.9);
  }
}

#instances-setting {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  background-origin: border-box;
  text-align: center;

  > * {
    z-index: 1001;
    margin: auto;
  }
}

#feature-content {
  max-width: 1080px;
  width: calc(100vw - 32px);
  max-height: 720px;
  height: calc(100vh - 32px);
  background: var(--bg);
  border-radius: var(--radius);
}

#feature-child {
  display: grid;
  grid-template-rows: 4rem calc(100% - 21.5rem) 1rem 5.5rem 1rem 6.5rem 3.5rem;
  width: 100%;
  height: 100%;
}

#feature-header {
  display: flex;
  padding: 0;

  .cancel {
    margin: 0 0 0 auto;
    padding: 0;
    font-size: 20px;
    width: 4rem;
    line-height: 4rem;
  }
}

#feature-image {
  grid-row: 2 / 3;
  display: flex;
  padding: 0;
}

#feature-title {
  grid-row: 4 / 5;
  margin: 0;
  padding: 0 1rem;
  line-height: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

#feature-description {
  grid-row: 6 / 7;
  margin: 0;
  padding: 0 1rem;
  font-size: 1.1em;
}

#feature-paging {
  grid-row: 7 / 8;
  display: flex;
  justify-content: space-between;

  .paging-button {
    width: 3.5rem;
    line-height: 3.5rem;
  }

  .feature-paging-page {
    font-weight: 200;
    font-size: 1.2rem;
    line-height: 3.5rem;
  }
}
</style>

<style lang="scss">
#feature-image {
  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
