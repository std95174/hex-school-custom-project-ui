<template>
  <app-bar></app-bar>
  <div class="container mt-3">
    <h1 class="fs-3">登入</h1>
    <form class="mb-3">
      <div class="form-group mb-3">
        <label for="email">信箱</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="email@mail.com"
               v-model="email">
        <small id="emailHelp" class="form-text text-muted">請輸入正確格式</small>
      </div>
      <div class="form-group mb-3">
        <label for="password">密碼</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" @keydown.enter="login">
      </div>
      <div class="d-grid">
        <button type="button" class="btn btn-primary" @click="login">登入</button>
      </div>
    </form>
    <span class="text-danger">{{ message }}</span>
  </div>
</template>

<script>
import axios from "axios";
import {router} from "./routers/index";
import AppBar from "./components/AppBar.vue";

export default {
  name: "Login",
  components: {'app-bar':AppBar},
  data() {
    return {
      email: "",
      password: "",
      message: ""
    }
  },
  methods: {
    async login() {
      try {
        let result = await axios.post("https://hex-school-custom-project-api.vercel.app/api/v0/users/login", {
          email: this.email,
          password: this.password
        })
        if (result.status === 200) {
          console.log('login successfully');
          localStorage.setItem("token", result.data.token)
          await router.push({name: "Admin"})
        }
      } catch (e) {

        this.message = "登入失敗。"
      }
    }
  }
}
</script>

<style scoped>

</style>
