import Vue from "vue"
import VueRouter from 'vue-router'

import Home from "../components/home/Home.vue"
import AdminPages from "../components/admin/AdminPages.vue"

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}]

const router = new VueRouter({
    mode: 'history', // dont keep hash in the url
    routes: routes
})

export default router