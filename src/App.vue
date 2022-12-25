<template>
  <router-view></router-view>
</template>

<script>
import {userStore} from "./stores/user.js";
import AppBar from "./components/AppBar.vue";
import Admin from "./Admin.vue";

export default {
  name: "App",
  components:{
    'admin': Admin,
    'app-bar': AppBar
  },
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
