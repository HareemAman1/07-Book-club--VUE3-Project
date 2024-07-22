// ** 57: ADD AND UPDATE PAGE **
<template>
  <AppHeader />
  <h2>Update Book</h2>

  <!-- ** 62: UPDATE ** -->
  <form action="" class="add">
    <input type="text" placeholder="Book name" name="name" v-model="book.name">
    <input type="text" placeholder="author" name="author" v-model="book.author">
    <!-- <input type="text" placeholder="series/standalone" name="type" v-model="book.type"> -->
    <select name="type" v-model="book.type">
        <option value="series">Series</option>
        <option value="standalone">Standalone</option>
    </select>
    <button type="button" v-on:click="update">Update</button>
</form>
<AppFooter />
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import axios from "axios";
export default {
    name:'AppUpdate',
    components:{
        // ** 55: MAKE HEADER **
        AppHeader,
        AppFooter
    },
     data() {
        return {
            // ** 62: UPDATE **
            book: {
                name: '',
                author: '',
                type: ''
            }
        }
    },
    methods:{
        // ** 64: UPDATE FUNCTIONALITY **
        async update(){
            console.log('updated', this.book);
            const result = await axios.put('http://localhost:3000/book/'+this.$route.params.id,{
                name: this.book.name,
                author: this.book.author,
                type: this.book.type
            })
            if(result.status==200){
                this.$router.push({name:'AppHome'})
            }
            console.warn(result);
        }
    },
    async mounted(){
        // ** 52: COMPLETE SIGNUP AND REDIRECTION **
        let user = localStorage.getItem('user-info')
        if (!user){
            this.$router.push({name:'AppSignup'})
        }

        // ** 63: PREFILL UPDATE **
        const result = await axios.get('http://localhost:3000/book/'+this.$route.params.id);
        console.warn(result);
        this.book=result.data
    }
}
</script>

<style>

</style>