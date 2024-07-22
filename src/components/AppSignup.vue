// ** 48: SIGNUP COMPONENT **
<template>
<img class="logo" src="../assets/logo2.jpeg" alt="">
  <h1>Sign Up</h1>
  <div class="register">

    <!-- ** 50: INTEGRATE SIGN UP API ** -->
    <input type="text" placeholder="enter name" v-model="name">
    <input type="text" placeholder="enter email" v-model="email">
    <input type="password" placeholder="enter password" v-model="password">
    <button v-on:click="signup">Sign Up</button>
    <br>

    <!-- ** 53: LOGIN PAGE **  -->
    <p>Already created account? 
        <router-link to="/login">Login</router-link>
    </p>
  </div>
  <AppFooter />
</template>

<script>
import axios from 'axios'
import AppFooter from "./AppFooter.vue";
export default {
    name:'AppSignup',
    components:{
        AppFooter
    },
    data(){
        return{
            // ** 50: INTEGRATE SIGN UP API **
            name: '',
            email: '',
            password: ''
        }
    },
    methods:{
        // ** 50: INTEGRATE SIGN UP API **
        async signup(){
            console.log('signup', this.name, this.email, this.password);
            let result = await axios.post('http://localhost:3000/user', {
                name: this.name,
                email:this.email,
                password: this.password
            })
            console.warn(result);
            if(result.status==201){
                alert('Registeration Successful')
            }
            localStorage.setItem('user-info', JSON.stringify(result.data))

            // 51: ** HOME COMPONENT & ROUTING SETUP **
            this.$router.push({name:'AppHome'})
        }
    },
    mounted(){
        // ** 52: COMPLETE SIGNUP AND REDIRECTION **
        let user = localStorage.getItem('user-info')
        if (user){
            this.$router.push({name:'AppHome'})
        }
    }
}
</script>

<style>

</style>