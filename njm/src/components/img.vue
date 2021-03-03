<template>
    <picture>
        <source :srcset="`${iu.dir}/${iu.name}.360.webp 360w, ${iu.dir}/${iu.name}.720.webp 720w, ${iu.dir}/${iu.name}.webp 1200w`" type="image/webp" :sizes="sizes">
        <source :srcset="`${iu.dir}/${iu.name}.360.${iu.ext} 360w, ${iu.dir}/${iu.name}.720.${iu.ext} 720w, ${iu.dir}/${iu.name}.${iu.ext} 1200w`" :sizes="sizes">
        <img :src="src" :alt="alt" :class="classStr" :id="id" :title="title" :loading="loading" />
    </picture>
</template>

<script lang="ts">
const path = require('path-browserify');
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        src: {
            type: String,
			required: true,
        },
        sizes: {
            type: String,
			required: false,
			default: '100vw, (min-width: 576px) 50vw, (min-width: 1200px) 30vw'
        },
        alt: {
            type: String,
			required: false,
			default: ''
        },
        classStr: {
            type: String,
			required: false,
			default: ''
        },
        id: {
            type: String,
			required: false,
			default: ''
        },
        title: {
            type: String,
			required: false,
			default: ''
        },
        loading: {
            type: String,
			required: false,
			default: 'lazy'
        },
    },

    data() {
        return {
            iu: path.parse(path.join('/img', this.src))
        }
    }
});
</script>
