<template>
    <div class="container" id="container" :class="{active: cssClass}">
        
        <div class="form-container sign-up">

            <div class="form">
                
                <h1>Create Account</h1>

                <div class="social-icons">
                    <a href="#" class="icon">
                        <i class="fa fa-google"></i>
                    </a>
                    <a href="#" class="icon">
                        <i class="fa fa-facebook"></i>
                    </a>
                    <a href="#" class="icon">
                        <i class="fa fa-github"></i>
                    </a>
                    <a href="#" class="icon">
                        <i class="fa fa-linkedin"></i>
                    </a>
                </div>

                <span>or use your email for registration</span>
                <input v-model="user.name" type="text" placeholder="Name">
                <input v-model="user.email" type="text" placeholder="Email">
                <input v-model="user.password" type="password" placeholder="Password">
                <input v-model="user.ConfirmPassword" type="password" placeholder="Confirm Password">

                <button>Sign Up</button>

            </div>
            
        </div>

        <div class="form-container sign-in">

            <div class="form">
                <h1>Sign In</h1>
            
                <div class="social-icons">
                    <a href="#" class="icon">
                        <i class="fa fa-google"></i>
                    </a>
                    <a href="#" class="icon">
                        <i class="fa fa-facebook"></i>
                    </a>
                    <a href="#" class="icon">
                        <i class="fa fa-github"></i>
                    </a>
                    <a href="#" class="icon">
                        <i class="fa fa-linkedin"></i>
                    </a>
                </div>

                <span>or use your email password</span>
                <input v-model="user.email" type="text" placeholder="Email">
                <input v-model="user.password" type="password" placeholder="Password">
                <a href="#">Forget your password?</a>
                <button>Sign In</button>
            </div>
        </div>

        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button @click="removeClass" class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button @click="addClass" class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
        
        <!--
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="Logo" />
            <hr>
            <div class="auth-title">{{ showSignup ? 'SignUp' : 'Login' }}</div>
        
            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Name">
            <input v-model="user.email" type="text" placeholder="Email">
            <input v-model="user.password" type="password" placeholder="Password">
            <input v-if="showSignup" v-model="user.confirmPassword" 
                type="password" placeholder="Confirm Password">

            <button v-if="showSignup" @click="signup">Register</button>
            <button v-else @click="signin">Enter</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Already register? SignIn!</span>
                <span v-else>Not Registered? SignUp!</span>
            </a>
        </div>
        -->

    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../../global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function(){
        return {
            showSignup: false,
            user: {},
            cssClass: false
        }
    },
    methods: {
        signin(){
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({path: '/'})
                })
                .catch(showError)
        },
        addClass(){
            this.cssClass = true
        },
        removeClass(){
            this.cssClass = false
        }
    },
    signup(){
        axios.post(`${baseApiUrl}/signup`, this.user) // ver no postman
            .then(()=>{
                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.showSignup = false
            })
            .catch(showError)
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
    font-family: 'Montserrat', sans-serif;
}

.container {
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.container p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container span{
    font-size: 12px;
}

.container a{
    color: #333; /*icons transparency*/
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
}

.container button{
    background-color: #512da8;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

.container button.hidden{
    background-color: transparent;
    border-color: #fff;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.form {
    background-color: #fff;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
}

.container input {
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
}

.sign-in {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.active .sign-in {
    transform: translateX(100%);
}

.sign-up {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.active .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
}

@keyframes move{
    0%, 49.99% {
        opacity: 0;
        z-index: 1;
    }
    50%, 100% {
        opacity: 1;
        z-index: 5;
    }
}

.social-icons {
    margin: 20px 0;
}

.social-icons a {
    border: 1px solid #ccc;
    border-radius: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    width: 40px;
    height: 40px;
}

.toggle-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 1000;
}

.container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
}

.toggle{
    background-color: #512da8;
    height: 100%;
    background: linear-gradient(to right, #5c6bc0, #512da8);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.container.active .toggle{
    transform: translateX(50%);
}

.toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.toggle-left{
    transform: translateX(-200%);
}

.container.active .toggle-left{
    transform: translateX(0);
}

.toggle-right{
    right: 0;
    transform: translateX(0);
}

.container.active .toggle-right{
    transform: translateX(200%);
}
</style>