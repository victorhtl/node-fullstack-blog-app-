import Vue from 'vue'
import Vuex from 'vuex'

// In Vue 3 we have Pinia, which is simpler
Vue.use(Vuex)

// I need to include this in main.js
export default new Vuex.Store({
    state:{
        isMenuVisible: true,
        // We are going to change this latter. This is just for mocking a logged user
        user: {
            name: 'Mock User',
            email: 'mock@email.com.br'
        }
    },
    mutations: {
        toggleMenu(state, isVisible){
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible  
            }
            else {
                state.isMenuVisible = isVisible
            }
        }
    }
})