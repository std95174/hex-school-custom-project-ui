<template>
  <div class="container pt-3">
    <h1 class="fs-3">景點列表</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch">
      <div class="mb-3" v-for="touristSpot in touristSpots" :key="touristSpot.id">
        <div class="card h-100">
          <div class="card-body">
            <div class="text-end">
              <!--            <a href="#" class="text-decoration-none">延伸閱讀</a>-->
              <router-link :to="{
                name: 'TouristSpot',
                params: {id: touristSpot.id}
              }">
                延伸閱讀
              </router-link>
            </div>
            <h2 class="card-title fs-4">{{ touristSpot.title }}</h2>
            <p class="card-text">{{ touristSpot.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      touristSpots: []
    }
  },
  name: "TouristSpots",
  async created() {
    let {data: touristSpots} = await axios.get("https://hex-school-custom-project-api.vercel.app/api/v0/tourist-spots")
    for (let touristSpot of touristSpots) {
      if(touristSpot.body.length > 30) {
        touristSpot.body = touristSpot.body.slice(0, 30) + '...'
      }
    }
    this.touristSpots = touristSpots
  }
}
</script>

<style scoped>
.card{
}
</style>
