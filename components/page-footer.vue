<template>
  <div class="text-center pt-3">
    <div v-if="text">
      <hr />
      <h3 class="py-2">{{ text }}</h3>
    </div>
    <hr />
    <p>
      Est.2016, Copr.
      <a href="https://0x4447.com/" target="_blank">0x4447</a>
      ™ LLC.
    </p>
    <p>
      <nuxt-link class="mx-1" to="/privacy">Privacy</nuxt-link>
      <nuxt-link class="mx-1" to="/terms">Terms</nuxt-link>
      <nuxt-link class="mx-1" to="resellers">Reseller</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>
