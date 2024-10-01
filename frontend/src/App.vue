<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible}">
		<Header title="My application" 
			:hideToggle="false"
			:hideUserDropdown="false" />
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
import { mapState } from "vuex"
import Header from "./components/template/Header.vue"
import Content from "./components/template/Content.vue"
import Menu from "./components/template/Menu.vue"
import Footer from "./components/template/Footer.vue"
export default {
	name: "App",
	components: {Header, Content, Menu, Footer},
	computed: mapState(['isMenuVisible'])
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