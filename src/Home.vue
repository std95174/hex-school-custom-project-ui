<template>
  <app-bar></app-bar>
  <tourist-spots></tourist-spots>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import TouristSpots from "./components/TouristSpots.vue";

export default {
  name: "Home.vue",
  components: {AppBar, TouristSpots}
}
</script>

<style scoped>

</style>
