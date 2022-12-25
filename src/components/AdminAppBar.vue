<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link :to="{name: 'Admin'}" class="navbar-brand">這裡是主控台</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name: 'Home'}" class="nav-link active" aria-current="page">回到首頁</router-link>
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
