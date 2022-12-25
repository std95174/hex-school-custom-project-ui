<template>
  <app-bar></app-bar>
  <div class="container mt-3">
    <h1 class="fs-3">新增資料</h1>
    <form>
      <div class="mb-3">
        <label for="title" class="form-label">標題</label>
        <input type="text" class="form-control" id="title" placeholder="標題" v-model="tempTouristSpot.title">
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">景點內容</label>
        <textarea class="form-control" id="body" rows="3" placeholder="景點內容"
                  v-model="tempTouristSpot.body"></textarea>
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">圖片網址</label>
        <input class="form-control" id="body" rows="3" placeholder="圖片網址" v-model="tempTouristSpot.imageUrl">
      </div>
      <button type="button" class="btn btn-primary" @click="updateTouristSpot">送出</button>
    </form>
  </div>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import axios from "axios";

export default {
  name: "CreateTouristSpot",
  components: {AppBar},
  data() {
    return {
      tempTouristSpot: {
        title: '',
        body: '',
        imageUrl: ''
      }
    }
  },
  methods: {
    async updateTouristSpot() {
      let {status} = await axios.post("https://hex-school-custom-project-api.vercel.app/api/v0/tourist-spots", this.tempTouristSpot, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (status === 200) {
        await this.$router.push({name: 'Admin'})
      }
    }
  },
}
</script>

<style scoped>

</style>
