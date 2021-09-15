<template>
  <div id="footer">
    <div class="row w-100 py-5 justify-content-end lh-lg">
      <div class="col-12 col-lg-4">
        <div class="p-3 pl-xl-5">
          <a href="/" class="h3 fw-light" v-text="$ts['joinmisskey']"></a>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-xl-3">
        <div class="p-3">
          <ul class="list-unstyled">
            <li><a href="https://github.com/misskey-dev/misskey" target="_blank"><Fa :icon="faGithub" fixed-width /> misskey-dev/misskey</a></li>
            <li><a href="https://misskey.io/@syuilo" target="_blank"><Fa :icon="mkMi" fixed-width /> @syuilo@misskey.io</a></li>
          </ul>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-xl-4">
        <div class="p-3">
          <ul class="list-unstyled">
            <li><a href="https://github.com/joinmisskey/new-joinmisskey" target="_blank"><Fa :icon="faGithub" fixed-width /> joinmisskey/new-joinmisskey</a></li>
            <li><a href="https://misskey.io/@joinmisskey" target="_blank"><Fa :icon="mkMi" fixed-width /> @joinmisskey@misskey.io</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="p-3 text-end">
      🄫2021 {{ $ts['joinmisskey'] }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { mkMi } from '@/mi-icon';

export default defineComponent({
  data() {
    return {

      faGithub, mkMi
    }
  }
});
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
