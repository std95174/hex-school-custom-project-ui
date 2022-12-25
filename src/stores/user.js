import {defineStore} from "pinia";

export const userStore = defineStore('user', {
    state: () => ({
        isAuthorized: false,
        isAdmin: false,
        user: null,
    }),
    actions: {
        authorize(isAuthorized) {
            this.isAuthorized = isAuthorized
        },
        setUser(user) {
            this.user = user
        },
        setAdmin(isAdmin) {
            this.isAdmin = isAdmin
        },
    },
})
