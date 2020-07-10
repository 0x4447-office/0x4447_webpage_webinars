<template>
  <div class="d-lg-flex justify-content-center text-center">
    <span class="mx-2">
      <logo />
      <p class="lead text-muted">Free Webinar</p>
    </span>
    <span class="mx-2" >
      <p>The event starts at</p>
      <h3 v-if="time">{{ time }}</h3>
      <b-spinner v-else></b-spinner>
      <p class="small">Your local time</p>
    </span>
  </div>
</template>

<script>
import logo from "@/components/logo";
export default {
  props: ["time"],

  components: {
    logo
  }
};
</script>

<style></style>
