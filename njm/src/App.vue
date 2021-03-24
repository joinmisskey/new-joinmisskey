<template>
  <div id="app">
    <router-view/>
    <Features/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Features from '@/components/features.vue';

export default defineComponent({
  components: {
    Features
  },

  data() {
    return {
      lang: location.pathname.split('/')[1],
    };
  },

  mounted() {
    const html = document.getElementsByTagName('html').item(0);
    if (html) html.lang = this.lang;
  }

});
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;

  font-family: YakuHanJP, GenEiUniverSans-w, SourceHanSans-w, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
  color: var(--fg);
  background: var(--bg);
}

h1, h2, h3, h4, h5, h6 {
  font-feature-settings:"palt";
  font-family: GenEiUniverSans-w, SourceHanSans-w, sans-serif;
}

._shadow {
  box-shadow: 0 4px 32px var(--shadow) !important;
}

._noSelect {
	user-select: none;
	-webkit-user-select: none;
	-webkit-touch-callout: none;
}

._button {
	appearance: none;
	padding: 0;
	margin: 0; // for Safari
	background: none;
	border: none;
	cursor: pointer;
	color: var(--fg);
	touch-action: manipulation;
	tap-highlight-color: transparent;
	-webkit-tap-highlight-color: transparent;
	font-size: 1em;
	font-family: inherit;
	line-height: inherit;

	&, * {
		@extend ._noSelect;
	}

	* {
		pointer-events: none;
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
}

._buttonPrimary {
	@extend ._button;
	color: #fff;
	background: var(--accent);

	&:not(:disabled):hover {
		background: var(--X8);
	}

	&:not(:disabled):active {
		background: var(--X9);
	}
}

._textButton {
	@extend ._button;
	color: var(--accent);
  position: relative;
  z-index: 1;
  display: block;
  min-width: 100px;
  padding: 8px 14px;
  text-align: center;
  box-shadow: none;
  text-decoration: none;
  background: var(--buttonBg);
  color: var(--fg);
  border-radius: 999px;
  overflow: hidden;

	&:not(:disabled):hover {
    color: var(--fgHighlighted);
    background: var(--buttonHoverBg);
    text-decoration: none;
	}
}

._textPrimaryButton {
  @extend ._textButton;
  color: var(--fg);
	background: var(--accent);

	&:not(:disabled):hover {
    background: var(--accentDarken);
    text-decoration: none;
	}
}

:root {
  --accent: rgb(126, 168, 0);
  --accentDarken: rgb(96, 128, 0);
  --accentLighten: rgb(172, 230, 0);
  --focus: rgba(134, 179, 0, 0.3);
  --bg: rgb(35, 35, 35);
  --panel: rgb(45, 45, 45);
  --acrylicBg: rgba(35, 35, 35, 0.5);
  --fg: rgb(199, 209, 216);
  --fgTransparentWeak: rgba(199, 209, 216, 0.75);
  --fgTransparent: rgba(199, 209, 216, 0.5);
  --fgHighlighted: rgb(255, 255, 255);
  --radius: 12px;
  --shadow: rgba(0, 0, 0, 0.3);
  --buttonBg: rgba(255, 255, 255, 0.05);
  --buttonHoverBg: rgba(255, 255, 255, 0.1);
}
</style>
