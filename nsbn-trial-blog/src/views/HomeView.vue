<template> 

  <NavbarVue>
</NavbarVue>
  <h1 ref="titlechange"> Welcome {{usernameifhave}}! </h1>
  
    <div class="container" v-for="item in posts" v-bind:key="item"> 
      <div class="card" >
          <div class="card-body">
              <div class="row">
                  <div>
                      <h3 class="float-left"><strong><b>{{item.title}}</b></strong></h3>
                      <p>
                          <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                      </p>
                      <i>By {{item.userPosted}}</i>
                      <br>
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
import NavbarVue from '../components/HeaderNFooter/navbar.vue'
import axios from "axios"
import {ref} from 'vue'
  const posts = ref(null)
  const getuserinfo = ref(null)
  const titlechange = ref('')
  const usernameifhave = ref('')

  axios.get('http://localhost:8080/api/getpost')
    .then((response) => (posts.value = response.data))

  axios.get('http://localhost:8080/api/getprofileinfo')
    .then((response) => {getuserinfo.value = response.data
    console.log(getuserinfo.value)
    if (getuserinfo.value.outcome == 'authenticated'){
      console.log(getuserinfo.value.rolex)
      if (getuserinfo.value.role == "user"){
      usernameifhave.value = getuserinfo.value.userid}
      else{
      usernameifhave.value = getuserinfo.value.userid + ' (admin)'
      }
    }
  })


</script>
