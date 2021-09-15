<template>
  <div id="home">

    <div id="home-0">
      <div id="home-0-texts">
        <p id="home-0-new-world" v-html="$ts['slogan']" />
        <Img src="2021/03/misskey.png" alt="Misskey" id="home-0-join-misskey" sizes="18rem" :imgOnLoad="imgOnLoad" />
        <p id="home-0-forever-evolving" v-html="$ts._home['forever-evolving']" />
        <div id="home-0-instances-list-button-div">
          <router-link
            to="/instances"
            tag="button"
            class="_textPrimaryButton home-0-button"
            v-text="$ts['instances-list']"
          />
          <a :href="$ts._home['setup-url']" class="_textButton home-0-button" target="_blank" v-text="$ts._home['setup']" />
        </div>
      </div>

      <Img src="2021/03/1273-desktop.png" id="home-0-desktop" alt="Desktop" sizes="70vw" :imgOnLoad="imgOnLoad" />
      <Img src="2021/03/1273-iphone.png" id="home-0-mobile" alt="Mobile" sizes="(max-width: 654px) 44vw, 18rem, (min-width: 1600px) 18vw" :imgOnLoad="imgOnLoad" />

      <div id="home-shape-1-top" />
    </div>

    <div id="home-1">
      <p v-text="$ts._home['misskeyisa-decenralized']"></p>
      <p v-text="$ts._home['whydontyou-take']"></p>

      <div id="home-1-buttons">
        <a href="https://github.com/misskey-dev/misskey" class="_textButton home-1-gh" target="_blank">
          <fa :icon="faGithub" />
          GitHub
        </a>
        <a href="https://www.patreon.com/syuilo" class="_textButton home-1-pa" target="_blank">
          <fa :icon="faPatreon" />
          Patreon
        </a>
      </div>
    </div>
    <div id="home-shape-1-end" />

    <!--<FeatureButton name="mfm" />-->
  </div>

  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faPatreon } from '@fortawesome/free-brands-svg-icons'
import { setDescription } from '@/description';
// import FeatureButton from '@/components/feature-button.vue';
import Img from '@/components/img.vue';
import Footer from '@/components/footer.vue';

export default defineComponent({
  name: 'Home',

  components: {
    // FeatureButton,
    Img, Footer
  },

  data() {
    return {
      loadCount: 0,

      faGithub, faPatreon
    }
  },

  created() {
    (this as any).$store.commit('showSplash');
  },

  mounted() {
    setDescription(this.$t('joinmisskey'), this.$t('description'));
  },

  methods: {
    showFeature(v: string | null) {
      (this as any).$store.commit('feature', v);
    },
    imgOnLoad() {
      this.loadCount = this.loadCount + 1;

      if (this.loadCount >= 3) (this as any).$store.commit('hideSplash');
    }
  },
});
</script>

<style lang="scss">
#home {
  width: 100%;
  min-height: 100vh;
}

#home-0 {
  height: 100vh;
  min-height: calc(37rem + 10vw);
  position: relative;
  overflow: hidden;
}

#home-0-texts {
  position: absolute;
  width: 100%;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;

  > p {
    padding: 0 1rem;
    word-break: keep-all;
    text-shadow: 0 0px 8px #000 !important;
    width: 100%;
    text-align: center;
  }
}

#home-0-new-world {
  font-size: calc(1.5rem + 0.75vw);
  font-weight: 200;
  letter-spacing: .2em;
  line-height: 1.2;
  margin: 0;
}

#home-0-join-misskey {
  display: flex;
  width: 100%;
  padding: 0 1rem;
  opacity: 0.95;

  img {
    margin: auto;
    width: 18rem;
    max-width: 100%;
  }
}

#home-0-forever-evolving {
  font-size: calc(1rem + 0.1vw);
  margin-bottom: 1rem;
}

#home-0-instances-list-button-div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  word-break: keep-all;
  > * {
    margin: .25rem;
  }

  .home-0-button {
    padding: 0.6em 1.5em;
    text-align: center;
    font-weight: 400;
    font-size: calc(1rem + 0.1vw);
    line-height: 1.5em;
    &._textButton {
      background: #2e2e2e;
    }
  }
}

#home-0-desktop {
  display: flex;
  position: absolute;
  z-index: 2;
  top: calc(55% + (1030px - 100vw) * 0.1);
  bottom: 0;
  right: 0;
  left: 30vw;
  max-width: 100%;

  img {
    object-fit: cover;
    object-position: left top;
    height: 100%;
    width: 100%;
  }
}

#home-0-mobile {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 5%;

  img {
    width: 18rem;
    max-width: 44vw;
    min-width: 18vw;
  }
}

#home-shape-1-top {
  width: 100%;
  height: 10vw;
  background: var(--accent);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 20;
}

#home-1 {
  background: var(--accent);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 1rem 1rem;

  img {
    width: 16rem;
    margin: 1rem 0;
  }

  p {
    font-size: calc(1rem + 0.05vw);
    text-align: center;
    width: 100%;
    max-width: 60rem;
  }
}

#home-1-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  word-break: keep-all;
  padding: 2rem 0;

  > * {
    margin: .25rem;
  }

  a {
    padding: 0.6em 1.5em;
    text-align: center;
    font-weight: 400;
    font-size: calc(1rem + 0.05vw);
    line-height: 1.5em;
    min-width: 8rem;
    &:hover {
      opacity: 0.8;
    }
    &.home-1-gh {
      color: #fff;
      background: #000;
    }
    &.home-1-pa {
      color: #fff;
      background: #ff424d;
    }
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
