<template>
  <div
    class="text-center p-2"
    border-variant="light"
  >
    <logo class="p-2" />

    <p class="lead text-muted">Free Webinar</p>

    <div v-if="time">
      <p>The event starts at</p>
      <h3>{{ time }}</h3>
      <p class="small">Your local time</p>
    </div>
  </div>
</template>

<script>
import logo from '@/components/logo'
export default {
  props: ['time'],

  components: {
    logo
  }
}
</script>

<style>
</style>
