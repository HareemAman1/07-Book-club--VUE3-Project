// ** 53: LOGIN PAGE ** 
<template>
<img class="logo" src="../assets/logo2.jpeg" alt="">
<h1>{{$route.meta.requiresAuth}} Login</h1>
<div class="login">

    <input type="text" :class="{'error' : validate}" placeholder="enter email" v-model="email">
    <input type="password" placeholder="enter password" v-model="password">
    <button v-on:click="login">Login</button>

    <p>Create new account -
        <router-link to="/signup">Sign up</router-link>
    </p>
    <br>
<AppFooter />
</div>
</template>

<script>
import axios from 'axios'
import AppFooter from './AppFooter.vue'
export default {
    name: 'AppLogin',
    components:{
        AppFooter
    },

    data() {
        return {
            // ** 54: LOGIN API INTEGERATION **
            email: '',
            password: '',
            validate: false
        }
    },
    methods: {
        // ** 54: LOGIN API INTEGERATION **
        async login() {
            if(this.email == '' || this.password == ''){
                this.validate = true
                alert('please fill the form')
                return
            }
            let result = await axios.get(`http://localhost:3000/user?email=${this.email}&password=${this.password}`)
            console.warn(result);

            if (result.status == 200 && result.data.length > 0) {
                alert('Login Successful')
            }
            localStorage.setItem('user-info', JSON.stringify(result.data[0]))
            this.$router.push({
                name: 'AppHome'
            })
        }
    },
    mounted() {
        // ** 54: LOGIN API INTEGERATION **
        let user = localStorage.getItem('user-info')
        if (user) {
            this.$router.push({
                name: 'AppHome'
            })
        }
    }
}
</script>

<style>

.error{
    border-color: #d12026 !important;
}

</style>
