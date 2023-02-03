<template>
  <Header :title="$ts['instances-list']" :icon="faCog" :rightClicked="openSetting" />
  <div id="instances">
    <div class="row">
      <div class="px-3 col-12 col-xl-7">
        <h1 v-text="$ts['instances-list']" class="my-2" />
        <p v-text="$ts['instances-list-description']" />
      </div>
      <div class="px-3 col-12 col-xl-5">
        <div class="alert small instances-list-setting-alert" role="alert" @click="openSetting">
          <div class="fw-bold" v-text="$ts['instances-list-setting']['setting']" />
          <span v-text="$ts['instances-list-setting']['orders'][instancesSetting.orderBy]" />
          -
          <span
            v-text="instancesSetting.orderDesc ? $ts['instances-list-setting'].descending : $ts['instances-list-setting'].ascending" /><br>
          <!--<span v-text="instancesSetting.repository.join(', ')" /><br>-->
          <span v-text="instancesSetting.language.join(', ')" /><br>
          <span v-text="$ts['instances-list-setting'].registration" />
          -
          <span
            v-text="instancesSetting.registrationStatus.map(v => $ts['instances-list-setting']['registration-statuses'][v]).join(', ')" /><br>
        </div>
      </div>
    </div>
    <div id="instances-list" v-if="!loading">
      <transition-group name="instance-list-trans">
        <template v-for="(item, i) in sortedShowing" :key="item.type === 'instance' ? item.data.url : `ad-${item.data}`">
          <Instance v-if="item.type === 'instance'" :instance="item.data" :eager="i < 12" />
          <InFeedAdsense v-else data-ad-format="fluid" data-ad-layout-key="-6t+de-31-76+qt"
            data-ad-client="ca-pub-1736621122676736" data-ad-slot="9141582521" class="adswrapper-infeed" />
        </template>
      </transition-group>
    </div>
    <div id="instances-loading" v-text="$ts['loading']" v-else />

    <div ref="observeEl" v-show="sorted.length !== sortedShowing.length && !loading"> Loading... </div>
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
                <select class="form-select bg-dark text-light" id="order-by" v-model="instancesSetting.orderBy">
                  <option v-for="option in orderOptions" :key="option" :value="option"
                    v-text="$ts['instances-list-setting']['orders'][option]" />
                </select>
                <select class="form-select bg-dark text-light" v-model="instancesSetting.orderDesc"
                  :aria-label="$ts['instances-list-setting']['descending']">
                  <option :value="true" v-text="$ts['instances-list-setting']['descending']" />
                  <option :value="false" v-text="$ts['instances-list-setting']['ascending']" />
                </select>
              </div>
            </div>
            <!--<div class="col-12 col-lg-6 mb-3">
              <div class="fw-bold" v-text="$ts['instances-list-setting']['repository']" />
              <div class="form-check form-check-inline"  v-for="repo in repositories" :key="repo">
                <input class="form-check-input" type="checkbox" :id="`select-${repo}`" :value="repo" v-model="instancesSetting.repository">
                <label class="form-check-label" :for="`select-${repo}`" v-text="repo" />
              </div>
            </div>-->
            <div class="col-12 mb-3">
              <div class="fw-bold" v-text="$ts['instances-list-setting']['language']" />
              <div class="form-check form-check-inline" v-for="lang in instanceLanguages" :key="lang">
                <input class="form-check-input" type="checkbox" :id="`select-${lang}`" :value="lang" v-model="instancesSetting.language">
                <label class="form-check-label" :for="`select-${lang}`" v-text="lang" />
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="fw-bold" v-text="$ts['instances-list-setting']['registration']" />
              <div class="form-check form-check-inline" v-for="stat in registrationStatuses" :key="stat">
                <input class="form-check-input" type="checkbox" :id="`select-${stat}`" :value="stat"
                  v-model="instancesSetting.registrationStatus">
                <label class="form-check-label" :for="`select-${stat}`"
                  v-text="$ts['instances-list-setting']['registration-statuses'][stat]" />
              </div>
            </div>
            <div class="col-12">
              <button type="button" class="btn btn-primary ml-auto" @click="acceptSetting"
                v-text="$ts['instances-list-setting']['accept']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { InstancesSetting, defaultInstancesSetting } from '@/instances-list-setting';
let instancesSetting = $ref<InstancesSetting>({ ...defaultInstancesSetting })
</script>

<script lang="ts" setup>
import { defineComponent, nextTick, onMounted, onUnmounted } from 'vue';
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { setDescription } from '@/description';
import Instance from '@/components/instance.vue';
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';
import { repositories, orderOptions, registrationStatuses, instanceLanguages } from '@/instances-list-setting';
import { splash } from '@/splash';
import { i18n } from '@/i18n';

type SortedItem = { type: 'instance' | 'ad'; data: any | string };

let loading = $ref(true)
let instances = $ref<any[]>([])
let sorted = $ref<SortedItem[]>([])
let sortedShowing = $computed<SortedItem[]>(() => [...sorted.slice(0, counter * 20)])
let counter = $ref(0);
let showSetting = $ref(false)

let observeEl = $ref<HTMLDivElement>() 

const addObserver = new IntersectionObserver(
  (entries) => {
    $$(counter).value++

    console.log('doit', sortedShowing.length, sorted.length)
  }
)

splash.value = false;

fetch('https://instanceapp.misskey.page/instances.json')
  .then(res => res.json())
  .then(res => {
    loading = false;
    instances = [...res.instancesInfos];
    sort();
  });

onMounted(() => {
  setDescription(i18n.t('instances-list'), i18n.t('instances-list-description'));

  addObserver.observe(observeEl);
});

onUnmounted(() => {
  addObserver.disconnect();
});

function openSetting() {
  showSetting = true;
}

function acceptSetting() {
  showSetting = false
  if (instancesSetting.repository.length === 0) {
    instancesSetting.repository = [...repositories];
  }

  if (instancesSetting.registrationStatus.length === 0) {
    instancesSetting.registrationStatus = [...registrationStatuses];
  }

  if (instancesSetting.language.length === 0) {
    instancesSetting.language = [...instanceLanguages];
  }

  sort();
}

function sort() {
  let _sorted = instances;
  counter = 0;
  nextTick().then(() => window.scroll({ top: 0, behavior: 'smooth' }))

  //#region filter repository
  _sorted = _sorted.filter(instance => {
    return instancesSetting.repository.includes(instance.repo);
  });
  //#region

  //#region sort order
  switch (instancesSetting.orderBy) {
    case 'originalNotesCount':
      _sorted = _sorted.sort((a, b) => (b.stats.originalNotesCount - a.stats.originalNotesCount) * (instancesSetting.orderDesc ? 1 : -1));
      break;
    case 'originalUsersCount':
      _sorted = _sorted.sort((a, b) => (b.stats.originalUsersCount - a.stats.originalUsersCount) * (instancesSetting.orderDesc ? 1 : -1));
      break;
    default:
      _sorted = _sorted.sort((a, b) => (b.value - a.value) * (instancesSetting.orderDesc ? 1 : -1));
      break;
  }
  //#endregion

  //#region filter language
  _sorted = _sorted.filter(instance => {
    return instancesSetting.language.some(condlang => instance.langs.includes(condlang));
  });
  //#region

  //#region filter registration
  if (instancesSetting.registrationStatus.length == 1) {
    if (instancesSetting.registrationStatus[0] === 'open') {
      _sorted = _sorted.filter(instance => {
        return instance.meta.features.registration;
      });
    } else {
      _sorted = _sorted.filter(instance => {
        return !instance.meta.features.registration;
      });
    }
  }
  //#region

  let adNumber = 0;

  sorted = _sorted.reduce((acc, instance, i, arr) => {
    acc.push({ type: 'instance', data: instance });
    if (i === arr.length - 1) {
      acc.push({ type: 'ad', data: 'end' });
    } else if (i % 5 === 2) {
      acc.push({ type: 'ad', data: adNumber });
      adNumber++;
    }
    return acc;
  }, [] as SortedItem[]);

  console.log(sorted)

  counter = 1;
}
</script>

<style lang="scss">
#instances {
  padding: 1rem;

  .instance {
    margin-bottom: 1rem;
  }
}

#instances-list {
  >* {
    padding-bottom: 1rem;
  }
}

@media (min-width: 32rem) {
  #instances-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));

    >* {
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

.instances-setting-enter-active,
.instances-setting-leave-active {
  transition: opacity 0.3s !important;

  #setting-content {
    transition: transform 0.3s !important;
  }
}

.instances-setting-enter-from,
.instances-setting-leave-to {
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

  >* {
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

    >ins {
      min-width: 23rem;
      width: 100%;
      max-height: 22rem;
    }
  }
}
</style>
