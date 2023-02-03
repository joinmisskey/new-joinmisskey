<template>
  <div class="instance-outer">
  <a :href="`https://${instance.url}/`" target="_blank" class="instance _shadow m-0" :lang="instance.langs[0]">
    <div
      class="instance-header"
      :class="{ nobanner: b === null, noicon: !instance.icon }"
    >
      <picture v-if="instance.icon === true">
        <source :srcset="`https://instanceapp.misskey.page/instance-icons/${instance.url}.webp`" type="image/webp" />
        <source :srcset="`https://instanceapp.misskey.page/instance-icons/${instance.url}.png`" type="image/png" />
        <img :loading="eager ? 'eager' : 'lazy'" class="instance-icon" :src="`https://instanceapp.misskey.page/instance-icons/${instance.url}.png`" />
      </picture>
      <div class="instance-title" :class="{ ['title-with-icon']: instance.icon }">
        <div class="instance-title-inner">
          <template v-if="instance.meta.name && instance.meta.name !== uniUrl"><span class="instance-name" v-text="instance.meta.name" /><br><span class="instance-url" v-text="uniUrl" /></template>
          <template v-else><span class="instance-name-url" v-text="uniUrl" /></template>
        </div>
      </div>
      <picture v-if="b !== null">
        <source :srcset="`https://instanceapp.misskey.page/instance-${b}/${instance.url}.webp`" type="image/webp" />
        <source :srcset="`https://instanceapp.misskey.page/instance-${b}/${instance.url}.jpeg`" type="image/jpeg" />
        <img :loading="eager ? 'eager' : 'lazy'" class="instance-header-bg" :src="`https://instanceapp.misskey.page/instance-${b}/${instance.url}.jpeg`" />
      </picture>
    </div>
    <div class="instance-description" v-text="description"/>
    <div class="instance-version">{{ instance.repo }} {{ instance.meta.version }}</div>
    <div class="instance-footer">
      <div class="instance-footer-cell">
        <div class="instance-footer-key" v-text="$ts['notes-count']" />
        <div class="instance-footer-value" v-text="langNumber.format(instance.stats.originalNotesCount)" />
      </div>
      <div class="instance-footer-cell">
        <div class="instance-footer-key" v-text="$ts['users-count']" />
        <div class="instance-footer-value" v-text="langNumber.format(instance.stats.originalUsersCount)" />
      </div>
      <div class="instance-footer-cell">
        <div class="instance-footer-key" v-text="$ts['instances-list-setting']['registration']" />
        <div class="instance-footer-value" v-text="instance.meta.features.registration ? $ts['instances-list-setting']['registration-statuses'].open : $ts['instances-list-setting']['registration-statuses'].close" />
      </div>
    </div>
  </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import punycode from 'punycode/punycode';
import { langNumber } from '@/locale';

export default defineComponent({
  name: 'Instances',

  props: {
    instance: {
      type: Object,
      required: true
    },
    eager: {
      type: Boolean,
      required: false,
    },
  },

  components: {
  },

  data() {
    const uniUrl = punycode.toUnicode(this.instance.url);

    return {
      langNumber,
      uniUrl,
    }
  },

  computed: {
    description() {
      if (this.instance.description) {
        const div = document.createElement('div');
        div.innerHTML = this.instance.description.trim();
        return div.textContent || null;
      }

      return null;
    },

    b() {
      return this.instance.banner ? 'banners' : this.instance.background ? 'backgrounds' : null
    },
  },

  methods: {
  },
});
</script>

<style lang="scss" scoped>

.instance {
  display: block;
  color: var(--fgPanel);
  background-color: var(--panel);
  text-decoration: none;
  border-radius: var(--radius);
  overflow: hidden;
  overflow: clip;
  height: auto;
  padding-bottom: 0.75rem;
  

  &:hover {
    color: #fff !important;
  }
}

.instance-header {
  background-size: cover;
  padding: 1rem 1rem 0 1rem;
  background-position: center;
  margin: 0 0 auto 0;
  position: relative;
  display: flex;
  font-feature-settings: "palt";
}

.instance-header:not(.nobanner) {
  height: 13rem;
  padding-bottom: 1rem;
}

@media (min-width: 768px) {
  .instance-header.nobanner {
    height: 13rem;
    padding-bottom: 1rem;
  }
}

.instance-header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.instance-title {
  text-decoration: none;
  line-height: 1.2;
  font-weight: 700;
  position: relative;
  z-index: 100;
  flex: auto 0;

  &.title-with-icon {
    padding-left: 8px;
  }
}

.instance-title-inner {
  padding: 0 1px;
  background-color: rgba(0,0,0,.7);
}

.instance-name {
  font-size: 1.75rem;
}
.instance-name-url {
  font-size: 1.8rem;
}

.instance-icon {
  position: relative;
  height: 4rem;
  max-width: 9rem;
  z-index: 100;
  flex: 0;
  margin-top: 0rem;
  padding: 2px;
  background-color: rgba(0,0,0,.7);
  image-rendering: -webkit-optimize-contrast;
  image-rendering: high-quality;
}

.instance-description {
  display: -webkit-box;
  font-size: .95em;
  margin: 0.8rem 1rem 1rem;
  line-height: 1.4;
  min-height: 4.2em;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.instance-version {
  font-size: .8rem;
  margin: 0 1rem 6px;
}

.instance-footer {
  font-size: .8rem;
  grid-gap: 4px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.5em, 1fr));
  margin: 0 1rem;
  line-height: 1.3;
}

.instance-footer-key {
  font-size: .7rem;
}

.instance-footer-value {
  font-size: 1rem;
  color: var(--accent)
}
</style>
