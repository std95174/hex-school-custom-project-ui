<template>
  <app-bar></app-bar>
  <div class="container mt-3">
    <h1 class="fs-3">註冊</h1>
    <form>
      <div class="form-group mb-3">
        <label for="email">信箱</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="email@mail.com" v-model="email">
      </div>
      <div class="form-group mb-3">
        <label for="password">密碼</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
      </div>
      <div class="form-group mb-3">
        <label for="passwordConfirm">確認密碼</label>
        <input type="password" class="form-control" id="passwordConfirm" placeholder="Confirm Password"
               v-model="passwordConfirm">
      </div>
      <p v-if="password !== passwordConfirm" class="text-danger">請再次確認密碼</p>
      <div class="d-grid">
        <button type="button" class="btn btn-primary" @click="register">註冊帳號</button>
      </div>
    </form>

  </div>
</template>

<script>
import axios from "axios";
import {router} from "./routers/index.js";
import AppBar from "./components/AppBar.vue";

export default {
  name: "Registration",
  components: {AppBar},
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    async register() {
      if (this.password !== this.passwordConfirm) {
        return;
      }
      let result = await axios.post("https://hex-school-custom-project-api.vercel.app/api/v0/users", {
        email: this.email,
        password: this.password
      })
      console.log(result)
      if (result.status === 201) {
        alert("註冊成功")
        await router.push({name: "Login"})
      }
    }
  },
}
</script>

<style scoped>

</style>
