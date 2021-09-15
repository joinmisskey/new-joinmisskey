<template>
  <div class="instance-outer p-2 col-12 col-md-6 col-xl-4">
  <a :href="`https://${instance.url}/`" target="_blank" class="instance _shadow m-0" :lang="instance.langs[0]">
    <div
      class="instance-header"
      :class="{ nobanner: !instance.banner && !instance.background }"
      :style="{
        'background-image':
          instance.banner ? barr('banners', instance.url) :
          instance.background ? barr('backgrounds', instance.url) : null
      }"
    >
      <div class="instance-title">
        <template v-if="this.instance.meta.name && this.instance.meta.name !== uniUrl"><span class="instance-name" v-text="instance.meta.name" /><br><span class="instance-url" v-text="uniUrl" /></template>
        <template v-else><span class="instance-name-url" v-text="uniUrl" /></template>
      </div>
    </div>
    <div class="instance-description" v-text="description"/>
    <div class="instance-version">{{ instance.repo }} {{ instance.meta.version }}</div>
    <div class="instance-footer">
      <div class="instance-footer-cell">
        <div class="instance-footer-key" v-text="$ts['notes-count']" />
        <div class="instance-footer-value" v-text="numeral(instance.stats.originalNotesCount).format('0,0')" />
      </div>
      <div class="instance-footer-cell">
        <div class="instance-footer-key" v-text="$ts['users-count']" />
        <div class="instance-footer-value" v-text="numeral(instance.stats.originalUsersCount).format('0,0')" />
      </div>
      <div class="instance-footer-cell" v-if="instance.stats.reactionsCount">
        <div class="instance-footer-key" v-text="$ts['reactions-count']" />
        <div class="instance-footer-value" v-text="numeral(instance.stats.reactionsCount).format('0,0')" />
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
import * as numeral from 'numeral';

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
      numeral,
      barr: (b: string, url: string) => [
        `url('https://instanceapp.misskey.page/instance-${b}/${url}.jpeg')`,
        `-webkit-image-set(url('https://instanceapp.misskey.page/instance-${b}/${url}.webp') type('image/webp'), url('https://instanceapp.misskey.page/instance-${b}/${url}.jpeg') type('image/jpeg'))`,
        `image-set(url('https://instanceapp.misskey.page/instance-${b}/${url}.webp') type('image/webp'), url('https://instanceapp.misskey.page/instance-${b}/${url}.jpeg') type('image/jpeg'))`
      ]
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
  background-color: var(--panel);
  text-decoration: none;
  border-radius: var(--radius);
  overflow: hidden;
  height: auto;

  &:hover {
    color: #fff !important;
  }
}

.instance-header {
  background-size: cover;
  padding: 1rem 1rem 0 1rem;
  background-position: center;
  margin: 0 0 auto 0;
}

.instance-header:not(.nobanner) {
  height: 10rem;
  padding-bottom: 1rem;
}

@media (min-width: 768px) {
  .instance-header.nobanner {
    height: 10rem;
    padding-bottom: 1rem;
  }
}

.instance-title {
  display: inline-block;
  text-decoration: none;
  line-height: 1.2;
  padding: 0 1px;
  background-color: rgba(0,0,0,.7);
  font-weight: 700;
}
.instance-name {
  font-size: 1.75rem;
}
.instance-name-url {
  font-size: 1.8rem;
}

.instance-description {
  display: -webkit-box;
  font-size: .95em;
  margin: 1rem 1rem 6px 1rem;
  line-height: 1.3;
  min-height: 2.6em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
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
  margin: 0 1rem .75rem 1rem;
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
