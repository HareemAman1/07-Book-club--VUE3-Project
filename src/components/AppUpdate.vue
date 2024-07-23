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
    <button type="button" @click="update">Update</button>
  </form>
  <AppFooter />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

export default {
  name: 'AppUpdate',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const book = ref({
      name: '',
      author: '',
      type: ''
    });

    const update = async () => {
      console.log('updated', book.value);
      const result = await axios.put(`http://localhost:3000/book/${route.params.id}`, {
        name: book.value.name,
        author: book.value.author,
        type: book.value.type
      });
      if (result.status === 200) {
        router.push({ name: 'AppHome' });
      }
      console.warn(result);
    };

    onMounted(async () => {
      // ** 52: COMPLETE SIGNUP AND REDIRECTION **
      let user = localStorage.getItem('user-info');
      if (!user) {
        router.push({ name: 'AppSignup' });
      }

      // ** 63: PREFILL UPDATE **
      const result = await axios.get(`http://localhost:3000/book/${route.params.id}`);
      console.warn(result);
      book.value = result.data;
    });

    return {
      book,
      update
    };
  }
};
</script>

<style>
</style>
