<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user }">
		<Header title="My application" 
			:hideToggle="!user"
			:hideUserDropdown="!user" />
		<Menu v-if="user"/>
		<Loading v-if="validatingToken"></Loading>
		<Content v-else/>
		<Footer />
	</div>
</template>

<script>
import axios from "axios"
import {baseApiUrl, userKey} from "../global"
import { mapState } from "vuex"
import Header from "./components/template/Header.vue"
import Content from "./components/template/Content.vue"
import Menu from "./components/template/Menu.vue"
import Footer from "./components/template/Footer.vue"
import Loading from "./components/template/Loading.vue"
export default {
	name: "App",
	components: {Header, Content, Menu, Footer, Loading},
	computed: mapState(['isMenuVisible', 'user']),
	data: function(){
		return {
			validatingToken: true
		}
	}, methods: {
		async validateToken(){
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData){
				this.validatingToken = false
				return this.$router.push({name: 'auth'})
			}

			const res = await axios.post(`${baseApiUrl}/signin/validateToken`, userData)

			if(res.data){
				this.$store.commit('setUser', userData)
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({name: 'auth'})
			}

			this.validatingToken = false
		}
	},
	created(){
		this.validateToken()
	}
}
</script>

<style>
	*{
		font-family: "Lato", sans-serif;
	}
	body {
		margin: 0;
	}
	#app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer"
	}

	#app.hide-menu{
		grid-template-areas:
			"header header"
			"content content"
			"footer footer"
	}
</style>