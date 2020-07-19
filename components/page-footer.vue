<template>
  <div class="text-center pt-3">
    <div v-if="text">
      <hr />
      <h3 class="py-2">{{ text }}</h3>
    </div>
    <hr />
    <p>
      Est.2016, Copr.
      <a href="https://0x4447.com/" target="_blank">0x4447™</a> LLC.
    </p>
    <p>
      <a href="https://0x4447.com/" target="_blank">Privacy</a>
      <a href="https://0x4447.com/" target="_blank">Terms</a>
      <nuxt-link class="mx-1" to="resellers">Reseller</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ["text"]
};
</script>
