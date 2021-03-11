<template>
  <div class="home">

    <h1>{{ $t('joinmisskey') }}</h1>

    <p>HOME</p>
    <div @click="$store.commit('feature', 'mfm')">mfm</div> 
    <div @click="$store.commit('feature', 'reactions')">reactions</div> 
    <div @click="$store.commit('feature', 'visibility')">visibility</div>
    <p>
      <router-link to="/instances">INSTANCES</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { } from '@fortawesome/free-solid-svg-icons'
import { setDescription } from '@/description';

export default defineComponent({
  name: 'Home',

  components: {
  },

  data() {
    return {
    }
  },

  mounted() {
    setDescription(this.$t('joinmisskey'), this.$t('description'));
  },

  methods: {
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
}

</style>
