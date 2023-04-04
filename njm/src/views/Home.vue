<template>
  <div id="home">

    <div id="home-0">
      <div id="home-0-texts">
        <p id="home-0-new-world" v-html="i18n.locale['slogan']" />
        <Img src="2021/03/misskey.png" alt="Misskey" id="home-0-join-misskey" sizes="18rem" :imgOnLoad="imgOnLoad" />
        <p id="home-0-forever-evolving" v-html="i18n.locale._home['forever-evolving']" />
        <div id="home-0-instances-list-button-div">
          <a href="https://misskey-hub.net" class="_textPrimaryButton home-0-button fw-bold" target="_blank">Misskey Hub</a>
          <router-link
            to="/instances"
            class="_textPrimaryButton home-0-button"
            v-text="i18n.locale['instances-list']"
          />
        </div>
      </div>

      <Img src="2021/09/scnsht-3.png" id="home-0-desktop" alt="Desktop" sizes="(max-width: 1000px) 720px, 70vw" :imgOnLoad="imgOnLoad" :images="[360, 720, 1200, 2000]" :original="5100" />
      <Img src="2021/09/scnsht-9t.png" id="home-0-mobile" alt="Mobile" sizes="(max-width: 654px) 44vw, 18rem, (min-width: 1600px) 18vw" :imgOnLoad="imgOnLoad" :images="[360, 720]" :original="1080" />

      <div id="home-shape-1-top" />
    </div>

    <div id="home-1">
      <div class="container">
      <div id="home-2-inner" class="row" v-if="stats">
        <div class="home-2-item py-5 col-12 col-lg-4">
          <div class="home-2-key" v-text="i18n.locale._home['notes-count-pre']" />
          <div class="home-2-value" v-text="langNumber.format(stats.notesCount)" />
          <div class="home-2-key" v-text="i18n.locale._home['notes-count-post']" />
        </div>
        <div class="home-2-item py-5 col-12 col-lg-4">
          <div class="home-2-key" v-text="i18n.locale._home['users-count-pre']" />
          <div class="home-2-value" v-text="langNumber.format(stats.usersCount)" />
          <div class="home-2-key" v-text="i18n.locale._home['users-count-post']" />
        </div>
        <div class="home-2-item py-5 col-12 col-lg-4">
          <div class="home-2-key" v-text="i18n.locale._home['instances-count-pre']" />
          <div class="home-2-value" v-text="langNumber.format(stats.instancesCount)" />
          <div class="home-2-key" v-text="i18n.locale._home['instances-count-post']" />
        </div>
      </div>
      </div>
    </div>

    <div id="home-shape-1-end"><div></div></div>

    <!--
    <div id="home-2">
    </div>

    <div id="home-shape-2-end"><div></div></div>
    -->

    <!--
    <div id="home-3">
      <p v-text="i18n.locale._home['donate-misskey']" />
      <div class="home-1-buttons">
        <a href="https://www.patreon.com/syuilo" class="_textButton home-1-pa" target="_blank">
          <fa :icon="faPatreon" />
          Patreon
        </a>
      </div>
      <p v-text="i18n.locale._home['donate-server']" class="mt-3" />
      <p v-text="i18n.locale._home['develop-misskey']" class="pt-5" />
      <div class="home-1-buttons">
        <a href="https://github.com/misskey-dev/misskey" class="_textButton home-1-gh" target="_blank">
          <fa :icon="faGithub" />
          GitHub
        </a>
      </div>
    </div>
    -->
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
import { langNumber } from '@/locale';
import { splash } from '@/splash';
import { i18n } from "@/i18n";

export default defineComponent({
  name: 'Home',

  components: {
    // FeatureButton,
    Img, Footer
  },

  data() {
    return {
      loadCount: 0,
      stats: null as any | null,

      i18n,
      langNumber,
      faGithub, faPatreon
    }
  },

  created() {
    splash.value = true;
    fetch('https://instanceapp.misskey.page/instances.json')
      .then(res => res.json())
      .then(res => {
        this.imgOnLoad();
        this.stats = res.stats;
      });
  },

  mounted() {
    setDescription(i18n.t('joinmisskey'), i18n.t('description'));
  },

  methods: {
    imgOnLoad() {
      this.loadCount = this.loadCount + 1;

      if (this.loadCount >= 4) splash.value = false;
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
    text-shadow: 0 0px 8px var(--bg), 0 0px 8px var(--bg), 0 0px 8px var(--bg) !important;
    width: 100%;
    text-align: center;
  }

  img {
    filter: drop-shadow(0 0px 8px var(--bg));
  }
}

#home-0-new-world {
  font-size: calc(1.5rem + 0.75vw);
  font-weight: 200;
  line-height: 1.2;
  margin: 0;

  &:lang("ja") {
    letter-spacing: .2em;
  }
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
  background: var(--accentDarken);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 20;
}

#home-1 {
  background: var(--accentDarken);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8rem 1rem 7rem;

  img {
    width: 16rem;
    margin: 1rem 0;
  }

  p {
    font-size: calc(1rem + 0.1vw);
    text-align: center;
    width: 100%;
    max-width: 65rem;
  }
}

.home-1-buttons {
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
  background: #fff;

  > div {
    width: 100%;
    height: 10vw;
    background: var(--accentDarken);
    clip-path: polygon(0 -0.5px, 0 100%, 100% -0.5px);
    // margin-top: -3vw;
  }
}

#home-2 {
  background: #fff;
  color: var(--bg);
  padding: 8rem 1rem 7rem;
}

.home-2-item {
  text-align: center;

  > .home-2-key {
    font-size: calc(1.25rem + .05vw);
    color: rgba($color: #fff, $alpha: .85);
    font-weight: 700;
  }
  > .home-2-value {
    font-size: calc(2rem + .05vw);
    color: #fff;
    font-weight: 700;
  }
}

#home-shape-2-end {
  background: var(--bg);

  > div {
    width: 100%;
    height: 10vw;
    background: #fff;
    clip-path: polygon(0 -0.5px, 0 100%, 100% -0.5px);
    // margin-top: -3vw;
  }
}

#home-3 {
  background: var(--bg);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 1rem;

  p {
    font-size: calc(1rem + 0.05vw);
    text-align: center;
    width: 100%;
    max-width: 65rem;
  }
}

</style>
