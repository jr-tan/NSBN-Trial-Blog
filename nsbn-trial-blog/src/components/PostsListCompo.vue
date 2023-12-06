<template>
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
  <div class="mb-2">
    <button class="btn btn-info" id="deletebutton" v-if="paginatenumber>1" @click="getList('Down')"><i class="fa fa-arrow" aria-hidden="true"></i>Previous </button>
    <button class="btn btn-info" id="deletebutton" v-if="LastEntry==true" @click="getList('Up')"><i class="fa fa-arrow" aria-hidden="true"></i>Next </button>
  </div>
</template>

<script setup>
    import axios from "axios";
    import {onBeforeMount, ref} from 'vue';
    const posts = ref(null);
    let paginatenumber = ref(1);
    let totalpages = ref(0);
    let LastEntry = ref(false);
    var lastClick = 0;
    var delay = 20;
    //let route = useRoute();
    //axios.get('/getpostbyusername?idp='+route)
    //gets posts
  
    const getList = (UporDown) => {
      if (lastClick >= (Date.now() - delay))
        return;
      lastClick = Date.now();
      switch (UporDown){
        case 'Up':
          paginatenumber.value = paginatenumber.value + 1
          break;
        case 'Down':
          paginatenumber.value = paginatenumber.value - 1
          break;
        case 'Load':
          paginatenumber.value = 1
          break;
      }
      axios.get('/api/getpost?paginatefive='+paginatenumber.value)
        .then((response) => {
          posts.value = response.data
          if (paginatenumber.value == totalpages.value){
            LastEntry.value = false
          }else{
            LastEntry.value = true
          }
        })
      
      }

    function getTotalPages(){
      axios.get('/api/gettotalpagescount')
      .then((response) => {totalpages.value = Math.ceil(response.data/5)
    console.log(totalpages.value)
      })
    }

    onBeforeMount( async () =>{
    getTotalPages()
    getList('Load')
    })
</script>