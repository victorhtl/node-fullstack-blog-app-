import Vue from 'vue'

// this name can be whatever you want
// in browser console, you can type: localStorage.__knowledge_user
// this will be used for storing information in browser local storage, without need for cookies
export const userKey = '__my_application_user' 
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

export default {baseApiUrl, showError, userKey}