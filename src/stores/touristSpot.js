import {defineStore} from "pinia";

export const touristSpotStore = defineStore('touristSpot', {
    state: () => ({
        isEditing: false,
        tempTouristSpot: {
            title: '',
            body: '',
            imageUrl: ''
        },
    }),
    actions: {
        setTempTouristSpot(touristSpot) {
            this.tempTouristSpot = touristSpot
        },
        setIsEditing(isEditing) {
            this.isEditing = isEditing
        }
    },
})
