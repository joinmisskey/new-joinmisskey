<template>
<transition :name="'features'" appear>
  <div v-if="$store.state.feature" id="features" @click.self="showFeature(null)">
    <div id="feature-content" class="_shadow">
      <div id="feature-child">
        <div id="feature-header">
          <button class="cancel _button" @click="showFeature(null)" :aria-label="$ts.close"><Fa :icon="faTimes"/></button>
        </div>
        <Img v-if="img" :src="img" id="feature-image" sizes="95vw, (min-width: 768px) 50vw, (min-width: 1920px) 35vw" />
        <h1 id="feature-title" v-text="$ts._features._details[$store.state.feature].title"></h1>
        <p id="feature-description" v-text="$ts._features._details[$store.state.feature].description"></p>
        <div id="feature-paging">
          <button class="paging-button _button" @click="prev()" :aria-label="$ts.prev"><Fa :icon="faChevronLeft"/></button>
          <div class="feature-paging-page">{{ index + 1 }} / {{ features.length }}</div>
          <button class="paging-button _button" @click="next()" :aria-label="$ts.next"><Fa :icon="faChevronRight"/></button>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import { features } from '@/features';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Img from '@/components/img.vue';

markRaw(faTimes);

export default defineComponent({
  components: {
    Img,
  },

  data() {
    return {
      features,

      faTimes, faChevronLeft, faChevronRight,
    }
  },

  computed: {
    index() {
      return features.findIndex(v => v[0] === (this as any).$store.state.feature);
    },

    img() {
      return features[(this as any).index][1];
    }
  },

  methods: {
    showFeature(v) {
      (this as any).$store.commit('feature', v);
    },
    next() {
      if (this.index === features.length - 1) {
        this.showFeature(features[0][0]);
      } else {
        this.showFeature(features[this.index + 1][0])
      }
    },
    prev() {
      if (this.index === 0) {
        this.showFeature(features[features.length - 1][0]);
      } else {
        this.showFeature(features[this.index - 1][0])
      }
    }
  },
});
</script>

<style scoped lang="scss">
.features-enter-active, .features-leave-active {
  transition: opacity 0.3s !important;

  #feature-content {
    transition: transform 0.3s !important;
  }
}
.features-enter-from, .features-leave-to {
  pointer-events: none;
  opacity: 0;

  #feature-content {
    transform: scale(0.9);
  }
}

#features {
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
