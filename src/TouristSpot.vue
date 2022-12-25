<template>
  <app-bar></app-bar>
  <div class="container mt-3">
    <h1 class="fs-3">景點詳細資訊</h1>
    <div class="card">
      <div class="card-body" v-show="isFavorite !== null">
        <button type="button" class="btn" :class="isFavorite?'btn-danger':'btn-primary'" @click="updateFavorite">
          {{ isFavorite ? '移除' : '加入' }}收藏
        </button>
      </div>
      <div class="card-body">
        <h2 class="card-title fs-4">{{ touristSpot.title }}</h2>
        <p class="card-text">{{ touristSpot.body }}</p>
        <img :src="touristSpot.imageUrl" :alt="touristSpot.title">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppBar from "./components/AppBar.vue";

export default {
  components: {AppBar},

  data() {
    return {
      touristSpot: {},
      isFavorite: null,
      userTouristSpotId: 0
    }
  },
  name: "TouristSpots",
  methods: {
    async updateFavorite() {
      if (this.isFavorite) {
        let result = await axios.delete(`https://hex-school-custom-project-api.vercel.app/api/v0/user-tourist-spots/${this.userTouristSpotId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
      } else {
        let {data} = await axios.post("https://hex-school-custom-project-api.vercel.app/api/v0/user-tourist-spots", {
              touristSpotId: this.$route.params.id
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
        )
        this.userTouristSpotId = data.id
      }
      this.isFavorite = !this.isFavorite
    }
  },
  async created() {
    const id = this.$route.params.id
    let {data: touristSpot} = await axios.get(`https://hex-school-custom-project-api.vercel.app/api/v0/tourist-spots/${id}`)
    this.touristSpot = touristSpot

    let {data} = await axios.get(`https://hex-school-custom-project-api.vercel.app/api/v0/user-tourist-spots/tourist-spot/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })

    this.isFavorite = data !== ""
    this.userTouristSpotId = data?.id
  }
}
</script>

<style scoped>

</style>
