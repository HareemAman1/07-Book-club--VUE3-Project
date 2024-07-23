// ** 55: MAKE HEADER **
<template>
<div class="nav">

      <!-- ** 57: ADD AND UPDATE PAGE ** -->
  <router-link to="/">Homepage</router-link>
  <router-link to="/add">Add Book</router-link>
  
  <!-- ** 56: LOGOUT FUNCTIONALITY ** -->
  <a @click="logout" href="#">Logout</a>
</div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name:'AppHeader',
    setup(){
    const router = useRouter()

        // ** 56: LOGOUT FUNCTIONALITY **
        const logout = () => {
            localStorage.clear();
            router.push({name: 'AppLogin'})
        }
        return{
            logout
        }
}}

</script>

<style>
.nav{
    background: orange;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
}
.nav a{
    float: left;
    color: black;
    text-align: center;
    padding: 16px 70px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 900;
    margin-right: 4px;
}
.nav a:hover{
    background: skyblue;
}

</style>