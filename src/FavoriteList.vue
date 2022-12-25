<template>
  <app-bar></app-bar>
  <div class="container mt-3">
    <h1 class="fs-3">收藏列表</h1>
    <p class="text-secondary" v-if="userTouristSpots.length === 0">尚無收藏的景點</p>
    <div class="row">
      <div class="col-4 mb-3" v-for="userTouristSpot in userTouristSpots" :key="userTouristSpot.id">
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="card-title">{{ userTouristSpot.title }}</h5>
              <button type="button" class="btn btn-danger" @click="removeFavorite(userTouristSpot.id)">
                取消收藏
              </button>
            </div>
            <p class="card-text">{{ userTouristSpot.body }}</p>
            <div class="text-center">
              <img :src=userTouristSpot.imageUrl :alt="userTouristSpot.imageUrl" class="mb-3">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppBar from "./components/AppBar.vue";

export default {
  name: "FavoriteList",
  components: {AppBar},
  data() {
    return {
      userTouristSpots: [],
      userTouristSpotId: 0,
    };
  },
  methods: {
    async removeFavorite(userTouristSpotId) {
      await axios.delete(`https://hex-school-custom-project-api.vercel.app/api/v0/user-tourist-spots/${userTouristSpotId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })

      await this.getFavoriteList()
    },
    async getFavoriteList() {
      let {data} = await axios.get(`https://hex-school-custom-project-api.vercel.app/api/v0/user-tourist-spots`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.userTouristSpots = data;
    }
  },
  async created() {
    await this.getFavoriteList()
  }
}
</script>

<style scoped>

</style>
