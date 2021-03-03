<template>
  <div class="instances">
    <router-link to="/">Back</router-link>
    <h1>INSTANCES</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { setDescription } from '@/description';

export default defineComponent({
  name: 'Instances',

  components: {
  },

  mounted() {
    setDescription(this.$t('instances-list'), this.$t('instances-list-description'));
  },

  methods: {
  },
});
</script>
