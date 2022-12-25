import { createPinia } from 'pinia'

export const pinia = createPinia()

// import { defineStore } from 'pinia'
//
// export const userStore = defineStore('counter', {
//     state: () => ({
//         isAuthorized: false,
//         user: null
//     }),
//     getters: {
//         isAuthorized: state => state.isAuthorized,
//         user: state => state.user
//     },
//     actions: {
//         authorize(isAuthorized) {
//             this.isAuthorized = isAuthorized
//         },
//         setUser(user) {
//             this.user = user
//         }
//     },
// })
