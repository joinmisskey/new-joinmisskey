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
import punycode from 'punycode/punycode';

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
    const uniUrl = punycode.toUnicode(this.instance.url);

    return {
      uniUrl,
      hasName: this.instance.meta.name && this.instance.meta.name !== uniUrl,
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
