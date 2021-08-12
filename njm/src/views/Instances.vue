<template>
  <div id="instances">
    <router-link to="/">Back</router-link>
    <div @click="() => showSetting = true">Setting</div>
    <h1 v-text="$ts['instances-list']" />
    <p v-text="$ts['instances-list-description']" />
    <div id="instances-list" v-if="!loading">
      <Instance v-for="instance in sorted" :key="instance.url" :instance="instance" />
    </div>
    <div id="instances-loading" v-text="$ts['loading']" v-else/>
  </div>

  <transition :name="'instances-setting'" appear :duration="{ enter: 300, leave: 300 }">
    <div v-if="showSetting" id="instances-setting" @click.self="acceptSetting">
      <div id="setting-content" class="_shadow">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-6">
              <h3 v-text="$ts['instances-list-setting']['order']" />
              <div class="input-group mb-3">
                <select class="form-select" v-model="orderBy" :aria-label="$ts['instances-list-setting']['order']">
                  <option
                    v-for="option in orderOptions"
                    :key="option"
                    :value="option"
                    v-text="$ts['instances-list-setting']['orders'][option]" />
                </select>
                <select class="form-select" v-model="orderDesc" :aria-label="$ts['instances-list-setting']['descending']">
                  <option
                    :value="true"
                    v-text="$ts['instances-list-setting']['descending']" />
                  <option
                    :value="false"
                    v-text="$ts['instances-list-setting']['ascending']" />
                </select>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              aaa
            </div>
            <div class="col-12">
              aaa
            </div>
            <div class="col-12">
              aaa
            </div>
            <div class="col-12">
              <button type="button" class="btn btn-primary ml-auto" @click="acceptSetting" v-text="$ts['instances-list-setting']['accept']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { setDescription } from '@/description';
import Instance from '@/components/instance.vue';
import { InstancesSetting, repositories, orderOptions, instanceLanguages } from '@/instances-list-setting';

export default defineComponent({
  name: 'Instances',

  components: {
    Instance
  },

  data() {
    return {
      loading: true,
      instances: [] as any[],
      sorted: [] as any[],
      showSetting: false,

      repositories,
      orderOptions,
      instanceLanguages,

      ...((this as any).$store.state['instancesSetting'] as InstancesSetting),
    }
  },

  created() {
    fetch('https://instanceapp.misskey.page/instances.json')
      .then(res => res.json())
      .then(res => {
        this.loading = false;
        this.instances = [...res.instancesInfos];

        this.sort();
      });

  },

  mounted() {
    setDescription(this.$t('instances-list'), this.$t('instances-list-description'));
  },

  methods: {
    acceptSetting() {
      this.showSetting = false;

      this.sort();

    },
    sort() {
      let sorted = (this as any).instances;

      //#region sort order
      sorted = sorted.sort((a, b) => {
        switch (this.orderBy) {
          case 'default':
            return (b.value - a.value) * (this.orderDesc ? 1 : -1);
        }

        return 0;
      })
      //#endregion

      this.sorted = sorted;
    }
  },
});
</script>

<style lang="scss">
#instances {
  margin: 1rem;

  .instance {
    margin-bottom: 1rem;
  }
}

// setting
.instances-setting-enter-active, .instances-setting-leave-active {
  transition: opacity 0.3s !important;

  #setting-content {
    transition: transform 0.3s !important;
  }
}
.instances-setting-enter-from, .instances-setting-leave-to {
  pointer-events: none;
  opacity: 0;

  #setting-content {
    transform: scale(0.9);
  }
}

#instances-setting {
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
}

#setting-content {
  max-width: 1080px;
  width: calc(100vw - 32px);
  max-height: 720px;
  height: calc(100vh - 32px);
  background: var(--bg);
  border-radius: var(--radius);
}
</style>
