<template> 
  <div class="pb-3">
  <h1 ref="titlechange"> <strong> Welcome {{usernameifhave}}! </strong></h1> 
  <p v-if="usernameifhave">View your profile and make changes <router-link :to="{name: 'userprofile',params: { id:usernameifhave}}"><strong>here</strong></router-link>!</p>
  <p v-else>Don't miss out on the conversation! Create an account or log in to make your own posts and comments, and like on them!</p>
  </div>
  <PostsListCompo :intent="'everything'" :key="'everything'" :userId="'na'">
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
    axios.get('/api/getsessioninfo')
      .then((response) => {
        let output = response.data
        if (output.outcome == 'authenticated'){
        if (output.role == "user"){
          usernameifhave.value = output.userid;}
        else{
        usernameifhave.value = output.userid;
        }}
      })
  })
</script>
