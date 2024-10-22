import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// In Vue 3 we have Pinia, which is simpler
Vue.use(Vuex)

// I need to include this in main.js
export default new Vuex.Store({
    // this is avaliable in myu entire application throw mapState() or this.$store.state.isMenuVisible
    state:{
        isMenuVisible: false,
        user: null
    },
    mutations: {
        toggleMenu(state, isVisible){
            if(!state.user){
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible  
            }
            else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user){
            state.user = user
            if(user){
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})