<template>
  <a :href="`https://${instance.url}/`" class="instance">
    <div class="instance-title" :class="{ hasName }">
      <template v-if="hasName"><span class="instance-name" v-text="instance.meta.name" /> <span class="instance-url" v-text="uniUrl" /></template>
      <template v-else><span class="instance-url" v-text="uniUrl" /></template>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as punycode from 'punycode';

export default defineComponent({
  name: 'Instances',

  props: {
    instance: {
      type: Object,
      required: true
    },
  },

  components: {
  },

  data() {
    return {
      uniUrl: punycode.toUnicode(this.instance.url),
      hasName: this.instance.meta.name ? this.instance.meta.name !== this.uniUrl : false,
    }
  },

  methods: {
  },
});
</script>

<style lang="scss" scoped>
  .instance {
    display: block;
    color: var(--fg);

    .hasName {
      .instance-name {
        font-weight: 700;
      }
    }
    
    :not(.hasName) {
      .instance-url {
        font-weight: 700;
      }
    }
  }

  .text-bold {
    font-weight: 700;
  }
</style>
