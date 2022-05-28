<template>
  <Header :title="$ts['instances-list']" :icon="faCog" :rightClicked="openSetting"  />
  <div id="instances">
    <div class="row">
      <div class="px-3 col-12 col-xl-7">
        <h1 v-text="$ts['instances-list']" class="my-2"/>
        <p v-text="$ts['instances-list-description']" />
      </div>
      <div class="px-3 col-12 col-xl-5">
        <div class="alert small instances-list-setting-alert" role="alert" @click="openSetting">
          <div class="fw-bold" v-text="$ts['instances-list-setting']['setting']" />
          <span v-text="$ts['instances-list-setting']['orders'][orderBy]" /> 
          - 
          <span v-text="orderDesc ? $ts['instances-list-setting'].descending : $ts['instances-list-setting'].ascending " /><br>
          <span v-text="repository.join(', ')" /><br>
          <span v-text="language.join(', ')" /><br>
          <span v-text="$ts['instances-list-setting'].registration"/> 
          - 
          <span v-text="registrationStatus.map(v => $ts['instances-list-setting']['registration-statuses'][v]).join(', ')" /><br>
        </div>
      </div>
    </div>
    <div id="instances-list" v-if="!loading">
      <transition-group name="instance-list-trans">
        <template v-for="item in sorted" :key="item.type === 'instance' ? item.data.url : `ad-${item.data}`">
          <Instance v-if="item.type === 'instance'" :instance="item.data" />
          <Adsense
            v-else-if="date % 2 === 1"
            data-ad-client="ca-pub-1736621122676736"
            data-ad-slot="4980038327"
            data-ad-format="auto"
            data-full-width-responsive="true"
            class="adswrapper-normal"
          />
          <InFeedAdsense
            v-else
            data-ad-format="fluid"
            data-ad-layout-key="-6t+de-31-76+qt"
            data-ad-client="ca-pub-1736621122676736"
            data-ad-slot="9141582521"
            class="adswrapper-infeed"
          />
        </template>
      </transition-group>
    </div>
    <div id="instances-loading" v-text="$ts['loading']" v-else/>
  </div>
  <Footer />

  <transition :name="'instances-setting'" appear :duration="{ enter: 300, leave: 300 }">
    <div v-if="showSetting" id="instances-setting" @click.self="acceptSetting">
      <div id="setting-content" class="_shadow">
        <div class="p-3">
          <div class="row">
            <div class="col-12 col-lg-6 mb-3">
              <label for="order-by" class="fw-bold" v-text="$ts['instances-list-setting']['order']" />
              <div class="input-group">
                <select class="form-select bg-dark text-light" id="order-by" v-model="orderBy">
                  <option
                    v-for="option in orderOptions"
                    :key="option"
                    :value="option"
                    v-text="$ts['instances-list-setting']['orders'][option]" />
                </select>
                <select class="form-select bg-dark text-light" v-model="orderDesc" :aria-label="$ts['instances-list-setting']['descending']">
                  <option
                    :value="true"
                    v-text="$ts['instances-list-setting']['descending']" />
                  <option
                    :value="false"
                    v-text="$ts['instances-list-setting']['ascending']" />
                </select>
              </div>
            </div>
            <div class="col-12 col-lg-6 mb-3">
              <div class="fw-bold" v-text="$ts['instances-list-setting']['repository']" />
              <div class="form-check form-check-inline"  v-for="repo in repositories" :key="repo">
                <input class="form-check-input" type="checkbox" :id="`select-${repo}`" :value="repo" v-model="repository">
                <label class="form-check-label" :for="`select-${repo}`" v-text="repo" />
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="fw-bold" v-text="$ts['instances-list-setting']['language']" />
              <div class="form-check form-check-inline"  v-for="lang in instanceLanguages" :key="lang">
                <input class="form-check-input" type="checkbox" :id="`select-${lang}`" :value="lang" v-model="language">
                <label class="form-check-label" :for="`select-${lang}`" v-text="lang" />
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="fw-bold" v-text="$ts['instances-list-setting']['registration']" />
              <div class="form-check form-check-inline"  v-for="stat in registrationStatuses" :key="stat">
                <input class="form-check-input" type="checkbox" :id="`select-${stat}`" :value="stat" v-model="registrationStatus">
                <label class="form-check-label" :for="`select-${stat}`" v-text="$ts['instances-list-setting']['registration-statuses'][stat]" />
              </div>
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
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { setDescription } from '@/description';
import Instance from '@/components/instance.vue';
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';
import { InstancesSetting, repositories, orderOptions, registrationStatuses, instanceLanguages } from '@/instances-list-setting';

type SortedItem = { type: 'instance' | 'ad'; data: any | string };

export default defineComponent({
  name: 'Instances',

  components: {
    Instance,
    Header,
    Footer,
  },

  data() {
    return {
      loading: true,
      instances: [] as any[],
      sorted: [] as SortedItem[],
      showSetting: false,

      repositories,
      orderOptions,
      instanceLanguages,
      registrationStatuses,

      ...((this as any).$store.state['instancesSetting'] as InstancesSetting),

      faCog,

      date: (new Date()).getDate(),
    };
  },

  beforeCreate() {
    (this as any).$store.commit('hideSplash');
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
    openSetting() {
      this.showSetting = true;
    },

    acceptSetting() {
      this.showSetting = false;

      if (this.repository.length === 0) {
        this.repository = [...repositories];
      }

      if (this.registrationStatus.length === 0) {
        this.registrationStatus = [...registrationStatuses];
      }

      if (this.language.length === 0) {
        this.language = [...instanceLanguages];
      }

      window.scroll({top: 0, behavior: 'smooth'});

      this.sort();
    },

    sort() {
      let sorted = this.instances;

      //#region filter repository
      sorted = sorted.filter(instance => {
        return this.repository.includes(instance.repo);
      });
      //#region

      //#region sort order
      switch (this.orderBy) {
        case 'originalNotesCount':
          sorted = sorted.sort((a, b) => (b.stats.originalNotesCount - a.stats.originalNotesCount) * (this.orderDesc ? 1 : -1));
          break;
        case 'originalUsersCount':
          sorted = sorted.sort((a, b) => (b.stats.originalUsersCount - a.stats.originalUsersCount) * (this.orderDesc ? 1 : -1));
          break;
        case 'reactionsCount':
          sorted = sorted.sort((a, b) => (b.stats.reactionsCount - a.stats.reactionsCount) * (this.orderDesc ? 1 : -1));
          break;
        default:
          sorted = sorted.sort((a, b) => (b.value - a.value) * (this.orderDesc ? 1 : -1));
          break;
      }
      //#endregion

      //#region filter language
      sorted = sorted.filter(instance => {
        return this.language.some(condlang => instance.langs.includes(condlang));
      });
      //#region

      //#region filter registration
      if (this.registrationStatus.length == 1) {
        if (this.registrationStatus[0] === 'open') {
          sorted = sorted.filter(instance => {
            return instance.meta.features.registration;
          });
        } else {
          sorted = sorted.filter(instance => {
            return !instance.meta.features.registration;
          });
        }
      }
      //#region

      let adNumber = 0;

      this.sorted = sorted.reduce((acc, instance, i, arr) => {
        acc.push({ type: 'instance', data: instance });
        if (i === arr.length - 1) {
          acc.push({ type: 'ad', data: 'end' });
        } else if (i % 9 === 2) {
          acc.push({ type: 'ad', data: adNumber });
          adNumber++;
        }
        return acc;
      }, [] as SortedItem[]);
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

#instances-list {
  > * {
    padding-bottom: 1rem;
  }
}

@media (min-width: 32rem) {
  #instances-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));

    > * {
      padding-bottom: 0;
    }
  }
}

.instance-list-trans-move,
.instance-list-trans-enter-active,
.instance-list-trans-leave-active {
  transition: transform 0.4s ease;
}
.instance-list-trans-leave-active {
  position: absolute;
}
.instance-list-trans-enter-from,
.instance-list-trans-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
// setting
.instances-list-setting-alert {
  background-color: #2d2d2d;
  border-radius: var(--radius);
  margin: 0 -5px 1rem;
}

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
  // backdrop-filter: blur(4px);
  background-origin: border-box;
  text-align: left;

  > * {
    z-index: 1001;
    margin: auto;
  }
}

#setting-content {
  max-width: 1080px;
  width: calc(100vw - 32px);
  background: var(--panel);
  border-radius: var(--radius);
}

@media (min-width: 32rem) {
  .adswrapper-normal {
    display: flex;
    align-items: center;
    justify-content: center;

    > ins {
      min-width: 23rem;
      width: 100%;
      max-height: 22rem;
    }
  }
}
</style>
