<template> 
  <h1 ref="titlechange" class="pb-3"> Welcome {{usernameifhave}}! </h1>
  
    <div class="container" v-for="item in posts" v-bind:key="item"> 
      <div class="card mb-2" >
          <div class="card-body">
              <div class="row">
                  <div>
                    <h3 class="card-title"><strong><b>{{item.title}}</b></strong></h3>
                      <p>
                          <span class="float-right">By <strong>{{item.userPosted}}</strong> | <i class="fa fa-eye"></i> {{item.views}} | <i class="fa fa-thumbs-up"></i> {{item.ratingscount}} | <i class="fa fa-comment"></i> {{item.commentscount}}</span>
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
  import {onMounted, ref} from 'vue'
  import axios from "axios";
  const posts = ref(null);
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
        else{3
        usernameifhave.value = output.userid + ' (admin)';
        }}
      })
    
    //gets posts
    axios.get('/api/getpost')
      .then((response) => {
        posts.value = response.data
      })

  })
</script>
