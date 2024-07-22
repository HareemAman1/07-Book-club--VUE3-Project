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
    <button type="button" v-on:click="add">Add</button>
</form>
<AppFooter />
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import axios from "axios";
export default {
    name: 'AppAdd',
    components: {
        // ** 55: MAKE HEADER **
        AppHeader,
        AppFooter
    },
    data() {
        return {
            // ** 60: FORM FOR ADD **
            book: {
                name: '',
                author: '',
                type: ''
            }
        }
    },
    methods:{
        // ** 60: FORM FOR ADD **
        async add(){
            console.warn('added', this.book);

            // **61: CALL API FOR ADD **
            const result = await axios.post('http://localhost:3000/book',{
                name: this.book.name,
                author: this.book.author,
                type: this.book.type
            })
            if(result.status==201){
                this.$router.push({name:'AppHome'})
            }
            console.warn(result);
        }
    },
    mounted() {
        // ** 52: COMPLETE SIGNUP AND REDIRECTION **
        let user = localStorage.getItem('user-info')
        if (!user) {
            this.$router.push({
                name: 'AppSignup'
            })
        }
    }
}
</script>

<style>

</style>
