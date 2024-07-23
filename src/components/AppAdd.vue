// 57: ADD AND UPDATE PAGE **
<template>
<AppHeader />
<img class="logo" src="../assets/logo2.jpeg" alt="">
<h2>Add Books here</h2>

<!-- ** 60: FORM FOR ADD **  -->
<form action="" class="add">
    <input type="text" placeholder="Book name" name="name" v-model="book.name">
    <input type="text" placeholder="author" name="author" v-model="book.author">
    <!-- <input type="text" placeholder="series/standalone" name="type" v-model="book.type"> -->
    <select name="type" v-model="book.type">
        <option value="series">Series</option>
        <option value="standalone">Standalone</option>
    </select>
    <button type="button" @click="add">Add</button>
</form>
<AppFooter />
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import axios from "axios";
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
export default {
    name: 'AppAdd',
    components: {
        // ** 55: MAKE HEADER **
        AppHeader,
        AppFooter
    },
    setup() {
        const router = useRouter()
        const book = ref({
            name: '',
            author: '',
            type: ''
        })
    

    // ** 60: FORM FOR ADD **
        const add = async () => {
            console.warn('added', book.value);

            // **61: CALL API FOR ADD **
            const result = await axios.post('http://localhost:3000/book', {
                name: book.value.name,
                author: book.value.author,
                type: book.value.type
            })
            if (result.status == 201) {
                router.push({
                    name: 'AppHome'
                })
            }
            console.warn(result);
        }

    onMounted(() => {
        // ** 52: COMPLETE SIGNUP AND REDIRECTION **
        let user = localStorage.getItem('user-info')
        if (!user) {
            router.push({
                name: 'AppSignup'
            })
        }
    })
    return{
        book,
        add
    }
    }
}
</script>

<style>

</style>
