<template>
  <picture>
    <source
      :srcset="
        `${images.map(size => `${iu.dir}/${iu.name}.${size}.webp ${size}w`).join(', ')}, ${iu.dir}/${iu.name}.webp ${original}w`
      "
      type="image/webp"
      :sizes="sizes"
    />
    <source
      :srcset="
        `${images.map(size => `${iu.dir}/${iu.name}.${size}${iu.ext} ${size}w`).join(', ')}, ${iu.dir}/${iu.name}${iu.ext} ${original}w`
      "
      :sizes="sizes"
    />
    <img
      :src="`${iu.dir}/${iu.base}`"
      :alt="alt"
      :title="title"
      :loading="imgOnLoad ? 'eager' : loading"
      :sizes="sizes"
      @load="imgOnLoad"
    />
  </picture>
</template>

<script lang="ts">
import * as path from "path-browserify";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },
    sizes: {
      type: String,
      required: false,
      default: "100vw, (min-width: 576px) 50vw, (min-width: 1200px) 30vw"
    },
    images: {
      type: Array,
      required: false,
      default: () => [360, 720]
    },
    original: {
      type: Number,
      required: false,
      default: 1200
    },
    alt: {
      type: String,
      required: false,
      default: ""
    },
    title: {
      type: String,
      required: false,
      default: ""
    },
    loading: {
      type: String,
      required: false,
      default: "lazy"
    },
    imgOnLoad: {
      type: Function,
      required: false
    }
  },

  data() {
    return {
      iu: path.parse(path.join("/img", this.src))
    };
  }
});
</script>
