<template>
  <div id="instances">
    <router-link to="/">Back</router-link>
    <div @click="() => showSetting = true">Setting</div>
    <h1 v-text="$ts['instances-list']" />
    <p v-text="$ts['instances-list-description']" />
    <div id="instances-list" v-if="!loading">
      <Instance v-for="instance in instances" :key="instance.url" :instance="instance" />
    </div>
    <div id="instances-loading" v-text="$ts['loading']" v-else/>
  </div>

  <transition :name="'instances-setting'" appear :duration="{ enter: 300, leave: 300 }">
    <div v-if="showSetting" id="instances-setting" @click.self="() => showSetting = false">
      <div id="setting-content" class="_shadow">
        WIP
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { setDescription } from '@/description';
import Instance from '@/components/instance.vue';

export default defineComponent({
  name: 'Instances',

  components: {
    Instance
  },

  data() {
    return {
      loading: true,
      instances: [] as any[],
      sortedInstances: [] as any[],
      showSetting: false,
    }
  },

  created() {
    fetch('https://instanceapp.misskey.page/instances.json')
      .then(res => res.json())
      .then(res => {
        this.loading = false;
        this.instances = [].concat(res.instancesInfos);
        this.sortedInstances = [].concat(res.instancesInfos);
      });
  },

  mounted() {
    setDescription(this.$t('instances-list'), this.$t('instances-list-description'));
  },

  methods: {
    
  },
});
</script>

<style lang="scss">
#instances {
  margin: 1rem;

  .instance {
    margin-bottom: 1rem;
  }
}

// setting
.instances-setting-enter-active, .instances-setting-leave-active {
  transition: opacity 0.3s !important;

  #setting-content {
    transition: transform 0.3s !important;
  }
}
.instances-setting-enter-from, .instances-setting-leave-to {
  pointer-events: none;
  opacity: 0;

  #setting-content {
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

#setting-content {
  max-width: 1080px;
  width: calc(100vw - 32px);
  max-height: 720px;
  height: calc(100vh - 32px);
  background: var(--bg);
  border-radius: var(--radius);
}
</style>
