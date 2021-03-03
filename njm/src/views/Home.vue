<template>
  <div class="home">

    <h1>{{ $t('joinmisskey') }}</h1>

    <div v-if="featureId" id="features" @click.self="feature(null)">
      <Features :feature-id="featureId"/>
    </div>

    <p>HOME</p>
    <div @click="feature('1')">1s</div> 
    <div @click="feature('2')">2</div> 
    <div @click="feature('3')">3</div>
    <p>
      <router-link to="/instances">INSTANCES</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Features from '@/components/features.vue'; // @ is an alias to /src
import { setDescription } from '@/description';

export default defineComponent({
  name: 'Home',

  components: {
    Features,
  },

  data() {
    return {
      featureId: null as string | null,
    }
  },

  mounted() {
    setDescription(this.$tc('joinmisskey'), this.$tc('description'));
  },

  methods: {
    feature(val: string | null) {
      this.featureId = val;
    }
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
}

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
