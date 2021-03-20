<template>
  <div id="home">

    <div id="home-0">
      <div id="home-0-texts">
        <p class="home-0-new-world" v-html="$ts['slogan']" />
        <h1 class="home-0-join-misskey" v-html="$ts['joinmisskey-wbr']" />
        <p class="home-0-forever-evolving" v-html="$ts._home['forever-evolving']" />
        <div class="home-0-instances-list-button-div">
          <router-link
            to="/instances"
            tag="button"
            class="_textPrimaryButton home-0-button"
            v-text="$ts['instances-list']"
          />
          <a :href="$ts._home['setup-url']" class="_textButton home-0-button" target="_blank" v-text="$ts._home['setup']" />
          <Img src="2021/03/1273-desktop.png" class="home-0-desktop" alt="Desktop" />
          <Img src="2021/03/1273-iphone.png" class="home-0-mobile" alt="Mobile" />
        </div>
      </div>
    </div>

    <div id="home-shape-1-top" />
    <div id="home-1">
      <Img src="2021/03/misskey.png" alt="Misskey" />
      <p v-text="$ts._home['misskeyisa-decenralized']"></p>
      <p v-text="$ts._home['whydontyou-take']"></p>
    </div>
    <div id="home-shape-1-end" />

    <FeatureButton name="mfm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { } from '@fortawesome/free-solid-svg-icons'
import { setDescription } from '@/description';
import FeatureButton from '@/components/feature-button.vue';
import Img from '@/components/img.vue';

export default defineComponent({
  name: 'Home',

  components: {
    FeatureButton,
    Img,
  },

  data() {
    return {
    }
  },

  mounted() {
    setDescription(this.$t('joinmisskey'), this.$t('description'));
  },

  methods: {
    showFeature(v: string | null) {
      (this as any).$store.commit('feature', v);
    },
  },
});
</script>

<style lang="scss">
#home {
  width: 100%;
  min-height: 100vh;
}

#home-0 {
  height: 80vh;
  min-height: 35rem;
  max-height: 44rem;
  position: relative;

  #home-0-texts {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > p, h1 {
      margin: 0;
      padding: 0 1rem;
      word-break: keep-all;
      text-shadow: 0 0px 8px #000 !important;
      width: 100%;
      text-align: center;
    }

    .home-0-new-world {
      font-size: calc(1.5rem + 0.75vw);
      font-weight: 200;
      letter-spacing: .30em;
      line-height: 1.3;
      margin-bottom: 0.5rem;
    }

    .home-0-join-misskey {
      font-size: calc(2rem + 1.5vw);
      font-weight: 800;
      line-height: 1.3;
      margin-bottom: 0.7rem;
      letter-spacing: 0.02em;
    }

    .home-0-forever-evolving {
      font-size: calc(1rem + 0.1vw);
      margin-bottom: 1rem;
    }

    .home-0-instances-list-button-div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      word-break: keep-all;

      > * {
        margin: .25rem;
      }

      .home-0-button {
        padding: 10px 16px;
        text-align: center;
        font-weight: 400;
        font-size: calc(1rem + 0.1vw);
        line-height: 1.5em;
      }
    }

  }

  .home-0-desktop {
    position: absolute;
    z-index: -2;
  }

  .home-0-mobile {
    position: absolute;
    z-index: -3;
  }
}

#home-shape-1-top {
  width: 100%;
  height: 10vw;
  background: var(--accent);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  margin-top: -3vw;
}

#home-1 {
  background: var(--accent);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;

  img {
    width: 16rem;
    margin: 1rem 0;
  }

  p {
    font-size: calc(1rem + 0.1vw);
    text-align: center;
    width: 100%;
    padding: 0 1rem;
  }
}

#home-shape-1-end {
  width: 100%;
  height: 10vw;
  background: var(--accent);
  clip-path: polygon(0 0, 0 100%, 100% 0);
  // margin-top: -3vw;
}

</style>
