// ** 53: LOGIN PAGE **
<template>
    <img class="logo" src="../assets/logo2.jpeg" alt="">
    <h1>{{ $route.meta.requiresAuth }} Login</h1>
    <div class="login">
        <input type="text" :class="{ 'error': validate }" placeholder="enter email" v-model="email">
        <input type="password" placeholder="enter password" v-model="password">
        <button @click="login">Login</button>
        <p>Create new account - 
            <router-link to="/signup">Sign up</router-link>
        </p>
        <br>
        <AppFooter />
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppFooter from './AppFooter.vue';

export default {
    name: 'AppLogin',
    components: {
        AppFooter
    },
    setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const validate = ref(false);

        const login = async () => {
            if (email.value === '' || password.value === '') {
                validate.value = true;
                alert('please fill the form');
                return;
            }
            let result = await axios.get(`http://localhost:3000/user?email=${email.value}&password=${password.value}`);
            console.warn(result);

            if (result.status === 200 && result.data.length > 0) {
                alert('Login Successful');
            }
            localStorage.setItem('user-info', JSON.stringify(result.data[0]));
            router.push({ name: 'AppHome' });
        };

        onMounted(() => {
            let user = localStorage.getItem('user-info');
            if (user) {
                router.push({ name: 'AppHome' });
            }
        });

        return {
            email,
            password,
            validate,
            login
        };
    }
};
</script>

<style>
.error {
    border-color: #d12026 !important;
}
</style>
