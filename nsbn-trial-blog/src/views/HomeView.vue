<template> 
  <h1 ref="titlechange" class="pb-3"> Welcome {{usernameifhave}}! </h1>
  <PostsListCompo>
  </PostsListCompo>

</template>


<script setup>
  import PostsListCompo from '../components/PostsListCompo.vue';
  import {onMounted, ref} from 'vue'
  import axios from "axios";
  const titlechange = ref('');
  const usernameifhave = ref('');

  onMounted(() => {
  //gets information of user logged in, and reflect the user's name accordingly
    axios.get('/api/getprofileinfo')
      .then((response) => {
        let output = response.data
        if (output.outcome == 'authenticated'){
        if (output.role == "user"){
          usernameifhave.value = output.userid;}
        else{
        usernameifhave.value = output.userid + ' (admin)';
        }}
      })
  })
</script>
