<template>
  <div class="ml-2 text-left">
    <b-card-title>
      <h1>About the event</h1>
    </b-card-title>
    <b-media>
      <template v-slot:aside>
        <b-img v-if="!event.image" blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
        <b-img v-else :src="event.image" width="64" alt="event image"></b-img>
      </template>
      <div>
        <p>{{ event.title }}</p>
        <p>{{ event.description }}</p>
      </div>
    </b-media>
  </div>
</template>

<script>
export default {
  props: ["event"]
};
</script>

<style>
</style>
