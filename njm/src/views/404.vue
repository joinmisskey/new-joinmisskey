<template>
  <div id="nf">
    <h1>404 Not Found</h1>
    <p v-text="$ts['404-text']" />
    <p>
      <router-link to="/" v-text="$ts['toppage']" /> /
      <router-link to="/instances" v-text="$ts['instances-list']" /><br />
      <a href="https://wiki.misskey.io">Misskey Wiki</a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
#nf {
  margin: 1rem;
}
</style>
