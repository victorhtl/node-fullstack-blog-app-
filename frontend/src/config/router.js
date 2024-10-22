import Vue from "vue"
import VueRouter from 'vue-router'

import Home from "../components/home/Home.vue"
import AdminPages from "../components/admin/AdminPages.vue"
import ArticlesByCategory from "../components/article/ArticlesByCategory.vue"
import ArticleById from '../components/article/ArticleById.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}]

const router = new VueRouter({
    mode: 'history', // dont keep hash in the url
    routes: routes
})

export default router