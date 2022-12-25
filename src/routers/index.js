import axios from "axios";
import * as VueRouter from "vue-router"
import TouristSpots from "../components/TouristSpots.vue";
import Login from '../Login.vue'
import Home from "../Home.vue";
import Registration from "../Registration.vue";
import FavoriteList from "../FavoriteList.vue";
import Admin from "../Admin.vue";
import TouristSpot from "../TouristSpot.vue";
import CreateTouristSpot from "../CreateTouristSpot.vue";

import {userStore} from "../stores/user.js";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/tourist-spot/:id', name: 'TouristSpot', component: TouristSpot},
    {path: '/login', name: 'Login', component: Login},
    {path: '/registration', component: Registration},
    {
        path: '/favorite-list',
        name: 'FavoriteList',
        component: FavoriteList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        },
    },
    {
        path: '/admin/create',
        name: 'CreateTouristSpot',
        component: CreateTouristSpot,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        },
    }
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach(async (to, from, next) => {
    await checkAuth()

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

    if (requiresAdmin && userStore().user?.role !== 'admin') {
        next({name: 'Home'})
    } else if(requiresAuth && !userStore().isAuthorized) {
        next({name: 'Home'})
    }
    else {
        next()
    }
})

async function checkAuth() {
    let token = localStorage.getItem('token')
    if (!token) {
        return false
    }

    let user = await axios.get('https://hex-school-custom-project-api.vercel.app/api/v0/users/token', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    userStore().authorize(true)
    userStore().setUser(user.data)
    if (user.data.role === 'admin') {
        userStore().setAdmin(true)
    }
    return true
}
