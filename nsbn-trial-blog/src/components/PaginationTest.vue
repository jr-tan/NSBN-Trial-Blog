<template>
  <div>
    <p>page {{ currentPage }} of {{ lastPage }}</p>
    <p>
      <button @click="prev">prev</button>
      <button @click="next">next</button>
    </p>
    <ul>
      <li v-for="n in result" :key="n">{{ n.title }}</li>
    </ul>
  </div>
</template>

<script setup>
//https://pikax.me/vue-composable/composable/pagination/pagination.html#example
import { computed, ref} from "vue";
import { usePagination } from "vue-composable";
import axios from "axios"


const posts = ref(null);
const postlength = ref(null);


  await axios.get('http://localhost:8080/api/getpost')
    .then((response) => {
      posts.value = response.data
      postlength.value = posts.value.length})

console.log(postlength.value);

const {
      currentPage,
      lastPage,
      next,
      prev,
      offset,
      pageSize,
    } = usePagination({
      currentPage: 1,
      pageSize: 3,
      total: postlength.value,
    });

 const result = computed(() => {
      console.log(postlength.value);
      const array = posts.value;
      if (!Array.isArray(array)) return [];
      return array.slice(offset.value, offset.value + pageSize.value);
    });
</script>