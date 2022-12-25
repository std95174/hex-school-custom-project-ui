<template>
  <admin-app-bar></admin-app-bar>
  <div class="container mt-3">
    <button type="button" class="btn btn-primary btn-lg mb-3" @click="createTouristSpot">點我新增景點</button>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">標題</th>
        <th scope="col">內文</th>
        <th scope="col">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="touristSpot in touristSpots" :key="touristSpot.id">
        <th scope="row" class="align-middle">{{ touristSpot.id }}</th>
        <td class="align-middle">{{ touristSpot.title }}</td>
        <td class="align-middle">
          {{ touristSpot.body }}
        </td>
        <td class="align-middle">
          <ul class="d-flex gap-2 list-unstyled">
            <li>
              <button type="button" class="btn btn-outline-danger"
                      @click="removeTouristSpot(touristSpot.id)">
                刪除
              </button>
            </li>
            <li>
              <button type="button" class="btn btn-warning" @click="editTouristSpot(touristSpot)">編輯</button>
            </li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminAppBar from "./components/AdminAppBar.vue";
import axios from "axios";
import {touristSpotStore} from "./stores/touristSpot.js";
import {router} from "./routers/index.js";

export default {
  name: "Admin",
  components: {AdminAppBar},
  data() {
    return {
      touristSpots: []
    }
  },
  methods: {
    async removeTouristSpot(id) {
      await axios.delete(`https://hex-school-custom-project-api.vercel.app/api/v0/tourist-spots/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      await this.getTouristSpots()
    },
    async getTouristSpots() {
      const {data} = await axios.get('https://hex-school-custom-project-api.vercel.app/api/v0/tourist-spots');
      this.touristSpots = data;
    },
    async editTouristSpot(touristSpot) {
      touristSpotStore().setTempTouristSpot(touristSpot)
      touristSpotStore().setIsEditing(true)

      await router.push({name: 'CreateTouristSpot'})
    },
    async createTouristSpot() {
      let touristSpot = {
        title: '',
        body: '',
        imageUrl: ''
      }
      touristSpotStore().setTempTouristSpot(touristSpot)
      touristSpotStore().setIsEditing(false)

      await router.push({name: 'CreateTouristSpot'})
    }
  },
  async created() {
    await this.getTouristSpots();
  }
}
</script>

<style scoped>
.list-unstyled {
  list-style: none;
}
</style>
