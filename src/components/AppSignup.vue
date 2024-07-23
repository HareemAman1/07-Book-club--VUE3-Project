// ** 48: SIGNUP COMPONENT **
<template>
  <img class="logo" src="../assets/logo2.jpeg" alt="">
  <h1>Sign Up</h1>
  <div class="register">
    <!-- ** 50: INTEGRATE SIGN UP API ** -->
    <input type="text" placeholder="enter name" v-model="name">
    <input type="text" placeholder="enter email" v-model="email">
    <input type="password" placeholder="enter password" v-model="password">
    <button @click="signup">Sign Up</button>
    <br>
    <!-- ** 53: LOGIN PAGE **  -->
    <p>Already created account? 
        <router-link to="/login">Login</router-link>
    </p>
  </div>
  <AppFooter />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AppFooter from './AppFooter.vue';

export default {
  name: 'AppSignup',
  components: {
    AppFooter
  },
  setup() {
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');

    const signup = async () => {
      console.log('signup', name.value, email.value, password.value);
      let result = await axios.post('http://localhost:3000/user', {
        name: name.value,
        email: email.value,
        password: password.value
      });
      console.warn(result);
      if (result.status == 201) {
        alert('Registration Successful');
      }
      localStorage.setItem('user-info', JSON.stringify(result.data));

      // 51: ** HOME COMPONENT & ROUTING SETUP **
      router.push({ name: 'AppHome' });
    };

    onMounted(() => {
      // ** 52: COMPLETE SIGNUP AND REDIRECTION **
      let user = localStorage.getItem('user-info');
      if (user) {
        router.push({ name: 'AppHome' });
      }
    });

    return {
      name,
      email,
      password,
      signup
    };
  }
};
</script>

<style>
</style>
