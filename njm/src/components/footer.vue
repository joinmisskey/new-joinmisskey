<template>
  <div id="footer">
    <!-- REMOVE_GAD_$2000
      <div class="pt-5 container">
        <InArticleAdsense
          data-ad-client="ca-pub-1736621122676736"
          data-ad-slot="9725932695"
        />
      </div>
    -->
    <div class="row w-100 py-5 justify-content-end lh-lg">
      <div class="col-12 col-lg-4">
        <div class="p-3 pl-xl-5">
          <p><router-link to="/" class="h3 fw-light">{{ i18n.locale['joinmisskey'] }}</router-link></p>
          <ul class="list-inline">
            <li v-for="([key, lang]) in localeNames" :key="key" class="list-inline-item" :lang="key">
              <a :href="localeLink(key)" v-text="lang" />
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-xl-3">
        <div class="p-3">
          <ul class="list-unstyled">
            <li><a href="https://misskey-hub.net/" target="_blank"><IconRocket /> Misskey Hub</a></li>
            <li><a href="https://github.com/misskey-dev/misskey" target="_blank"><IconBrandGithub /> misskey-dev/misskey</a></li>
            <li><a href="https://www.patreon.com/syuilo" target="_blank"><IconBrandPatreon /> Patreon</a></li>
            <li><a href="https://crowdin.com/project/misskey" target="_blank"><IconLanguageHiragana /> Crowdin</a></li>
            <li><a href="https://misskey.io/@syuilo" target="_blank"><!--<Fa :icon="mkMi" fixed-width />--> @syuilo@misskey.io</a></li>
          </ul>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-xl-4">
        <div class="p-3">
          <ul class="list-unstyled">
            <li><a href="https://github.com/joinmisskey/new-joinmisskey" target="_blank"><IconBrandGithub /> joinmisskey/new-joinmisskey</a></li>
            <li><a href="https://github.com/joinmisskey/api" target="_blank"><IconBrandGithub /> joinmisskey/api</a></li>
            <li><a href="https://gitlocalize.com/repo/6342" target="_blank"><IconLanguageHiragana /> GitLocalize</a></li>
            <li><a href="https://misskey.io/@joinmisskey" target="_blank"><!--<Fa :icon="mkMi" fixed-width />--> @joinmisskey@misskey.io</a></li>
            <li><a href="https://github.com/joinmisskey/new-joinmisskey/wiki" target="_blank" v-text="i18n.locale['privacy-policy']" /></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="p-3 text-end">
      Ⓒ2023 {{ i18n.locale['joinmisskey'] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mkMi } from '@/mi-icon';
import { localeNames } from '@/locale';
import { i18n } from "@/i18n";
import {
  IconBrandGithub,
  IconRocket,
  IconBrandPatreon,
  IconLanguageHiragana,
} from '@tabler/icons-vue';

function localeLink(lang: string) {
  const path = location.pathname.split('/');
  path[1] = lang;
  return path.join('/');
}
</script>

<style lang="scss" scoped>
a {
  color: var(--fg);
  text-decoration: none;

  &:hover {
    color: var(--fg);
    text-decoration: none;
  }
}
</style>
