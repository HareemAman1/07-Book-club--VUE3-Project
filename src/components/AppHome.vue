// 51: ** HOME COMPONENT & ROUTING SETUP **
<template>
  <AppHeader />
  <img class="logo" src="../assets/logo2.jpeg" alt="">
  <h2>Greetings {{ name }}! Welcome to home page</h2>
  <br>
  <input type="text" v-model="searchQuery" placeholder="Search books by name" />
  <!-- ** 59: LIST WITH API **  -->
  <table border="1">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Author</th>
      <th>Type</th>
      <th>Actions</th>
    </tr>
    <!-- <tr v-for="item in books" :key="item.id"> -->
    <tr v-for="item in filteredBooks" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.author }}</td>
      <td>{{ item.type }}</td>
      <!-- ** 62: UPDATE ** -->
      <td class="buttons">
        <button class="update"><router-link :to="'/update/' + item.id">Update</router-link></button>
        <!-- ** 65: DELETE ** -->
        <button class="delete" @click="del(item.id)">Delete</button>
      </td>
    </tr>
  </table>
  <AppFooter />
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

export default {
  name: 'AppHome',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const router = useRouter();
    const name = ref('');
    const books = ref([]);
    const searchQuery = ref('');

    const del = async (id) => {
      let result = await axios.delete(`http://localhost:3000/book/${id}`);
      if (result.status == 200) {
        loadData();
      }
    };

    const loadData = async () => {
      // ** 52: COMPLETE SIGNUP AND REDIRECTION **
      let user = localStorage.getItem('user-info');
      // ** 57: ADD AND UPDATE PAGE **
      if (!user) {
        router.push({ name: 'AppSignup' });
      } else {
        name.value = JSON.parse(user).name;
      }
      // ** 59: LIST WITH API ** 
      let result = await axios.get('http://localhost:3000/book');
      books.value = result.data;
    };

    onMounted(() => {
      loadData();
    });

    const filteredBooks = computed(() => {
      return books.value.filter(book =>
        book.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      name,
      books,
      searchQuery,
      filteredBooks,
      del,
      loadData
    };
  }
};
</script>

<style scoped>

table {
  margin: auto;
  margin-bottom: 100px;
  text-transform: capitalize;
}
th {
  font-weight: 900!important;
  width: 200px;
  height: 60px;
}
td {
  width: 200px;
  height: 60px;
}
tr:nth-child(even) {
  background-color: rgba(150, 212, 212, 0.4);
}
th:nth-child(even), td:nth-child(even) {
  background-color: rgba(150, 212, 212, 0.4);
}
input {
  width: 30%;
  margin-bottom: 10px;
  border-radius: 30px;
  padding: 10px;
  border-top: 1px solid orange;
  border-left: 1px solid orange;
  border-bottom: 1px solid green;
  border-right: 1px solid green;
}
button {
  margin: 0 15px;
  width: 80px;
  height: 40px;
  border: 1px solid transparent;
  background: orange;
  font-weight: bold;
  cursor: pointer;
  color: white;
  border-radius: 10px;
}
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a {
  text-decoration: none;
  color: white;
}
.update:hover {
  background: green;
}
.delete:hover {
  background: crimson;
  color: white;
}

</style>
