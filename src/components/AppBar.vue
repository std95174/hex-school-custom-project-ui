<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LOGO</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <ul class="navbar-nav align-items-center">
          <li class="me-3" v-if="isAdmin">
            <router-link :to="{name: 'Admin'}" class="text-decoration-none text-secondary me-3">前往後台</router-link>
          </li>
          <li class="me-3" v-if="isAuthorized">
            <router-link :to="{name: 'FavoriteList'}" class="text-decoration-none text-secondary me-3">收藏列表</router-link>
          </li>
          <li class="me-3" v-if="isAuthorized">
            <span>Hello!</span>
          </li>
          <li>
            <router-link :to="{name: 'Home'}" class="text-decoration-none text-secondary me-3" @click="logout"
                         v-if="isAuthorized">
              登出
            </router-link>
            <router-link to="/login" class="text-decoration-none text-secondary me-3" v-else>
              登入
            </router-link>
          </li>
          <li>
            <router-link to="/registration" v-if="!isAuthorized">
              <button class="btn btn-primary" type="type">免費註冊</button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {userStore} from "../stores/user.js";

export default {
  name: "App",
  data() {
    return {
    }
  },
  methods:{
    logout(){
      localStorage.removeItem("token")
      userStore().setUser({})
      userStore().authorize(false)
      userStore().setAdmin(false)
    }
  },
  computed: {
    user() {
      return userStore().user
    },
    isAuthorized() {
      return userStore().isAuthorized
    },
    isAdmin() {
      return userStore().isAdmin
    }
  }
}

</script>
