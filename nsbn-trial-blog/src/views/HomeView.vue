<template> 

  <NavbarVue>
</NavbarVue>
  <h1 ref="titlechange" class="pb-3"> Welcome {{usernameifhave}}! </h1>
  
    <div class="container" v-for="item in posts" v-bind:key="item"> 
      <div class="card mb-2" >
          <div class="card-body">
              <div class="row">
                  <div>
                    <h3 class="card-title"><strong><b>{{item.title}}</b></strong></h3>
                      <p>
                          <span class="float-right">By <strong>{{item.userPosted}}</strong> | <i class="fa fa-eye"></i> {{item.views}} | <i class="fa fa-thumbs-up"></i> {{item.ratings}}</span>
                      </p>
                      <p style="   overflow: hidden;
                              text-overflow: ellipsis;
                              display: -webkit-box;
                              line-height: 16px;  
                              max-height: 32px; 
                              -webkit-line-clamp: 2; 
                              -webkit-box-orient: vertical;">{{item.description}}</p>
                      <p>
                          <router-link :to="{name: 'indpost',params: { id:item.postid}}">
                          <a class="float-right btn btn-outline-primary ml-2"> <i
                                  class="fa fa-angle-right"></i> More</a>
                          </router-link>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <br>
</template>


<script setup>
  import NavbarVue from '../components/HeaderNFooter/NavBar.vue';
  import axios from "axios"
  import {onMounted, ref} from 'vue'
  const posts = ref(null);
  const getuserinfo = ref(null);
  const titlechange = ref('');
  const usernameifhave = ref('');

  onMounted(() => {
  //gets posts
  axios.get('http://localhost:8080/api/getpost')
    .then((response) => {
      console.log("fetching posts")
      posts.value = response.data});})

  //gets information of user logged in, and reflect the user's name accordingly
  axios.get('http://localhost:8080/api/getprofileinfo')
    .then((response) => {
      getuserinfo.value = response.data
      //console.log(getuserinfo.value);
      if (getuserinfo.value.outcome == 'authenticated'){
        if (getuserinfo.value.role == "user"){
          usernameifhave.value = getuserinfo.value.userid;}
        else{
        usernameifhave.value = getuserinfo.value.userid + ' (admin)';
        }
      }
  });


</script>
