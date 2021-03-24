<template>
  <div id="instances">
    <router-link to="/">Back</router-link>
    <h1 v-text="$ts['instances-list']" />
    <p v-text="$ts['instances-list-description']" />
    <div id="instances-list" v-if="!loading">
      <Instance v-for="instance in instances" :key="instance.url" :instance="instance" />
    </div>
    <div id="instances-loading" v-text="$ts['loading']" v-else/>
  </div>
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
</style>
