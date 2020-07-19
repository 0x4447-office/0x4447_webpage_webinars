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
      <a href="https://legal.0x4447.com/webinars.0x4447.com/privacy_policy.pdf" target="_blank">Privacy Policy</a>
      <span>·</span>
      <a href="https://legal.0x4447.com/webinars.0x4447.com/terms_of_service.pdf" target="_blank">Terms of Service</a>
      <span>·</span>
      <nuxt-link class="mx-1" to="resellers">Reseller</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ["text"]
};
</script>
