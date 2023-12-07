<template>
    <div class="container" v-for="item in posts" v-bind:key="item"> 
      <div class="card mb-2" >
          <div class="card-body">
              <div class="row">
                  <div>
                    <h3 class="card-title"><strong><b>{{item.title}}</b></strong></h3>
                      <p>
                          <span class="float-right">By   <router-link :to="{name: 'userprofile',params: { id:item.userPosted}}"><strong>{{item.userPosted}}</strong></router-link> | <i class="fa fa-eye"></i> {{item.views}} | <i class="fa fa-thumbs-up"></i> {{item.ratingscount}} | <i class="fa fa-comment"></i> {{item.commentscount}}</span>
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
  <div class="mb-2" v-if="totalpages != 0">
    <p v-if="totalpages != 1"> Page {{paginatenumber}} of {{totalpages}} </p>
    <button class="btn btn-info" id="deletebutton" v-if='paginatenumber>1' @click="getList('Down')"> <i class="fa fa-arrow" aria-hidden="true"></i>Previous </button>
    <button class="btn btn-info" id="deletebutton" v-if="LastEntry==true" @click="getList('Up')"><i class="fa fa-arrow" aria-hidden="true"></i>Next </button>
  </div>
</template>

<script setup>
    import axios from "axios";
    import {onBeforeMount, ref} from 'vue';
    import {defineProps } from 'vue';

    const posts = ref(null);
    let paginatenumber = ref(1);
    let totalpages = ref(0);
    let LastEntry = ref(false);
    var lastClick = 0;
    var delay = 20;

    const test = defineProps({ 
        intent : String,
        userId: String})

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

      let getlink = ""
      if (test.intent == "everything"){
        getlink = '/api/getpost?paginatefive='+paginatenumber.value
      }
      else{
        getlink = '/api/getpost?username='+test.userId+'&paginatefive='+paginatenumber.value

      }

      axios.get(getlink)
        .then((response) => {
          posts.value = response.data.rows;
          totalpages.value = Math.ceil(response.data.count/5);
          if (paginatenumber.value == totalpages.value){
            LastEntry.value = false;
          }else{
            LastEntry.value = true;
          }
        })
      
      }
      
    onBeforeMount( async () =>{
    getList('Load')
    })
</script>