import Vue from 'vue'

export const baseApiUrl = 'http://localhost:3000'

// treating error from de backend
export function showError(e){
    if(e && e.response && e.response.data){
        // error handler defined in global.js
        Vue.toasted.global.defaultError({msg : e.response.data})
    } else if(typeof e === 'string'){
        Vue.toasted.global.defaultError({msg: e})
    } else {
        Vue.toasted.global.defaultError()
    }
}