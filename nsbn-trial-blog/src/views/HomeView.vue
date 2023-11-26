<template> 

  <NavbarVue>
</NavbarVue>
  <h1> Welcome! </h1>
  
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


<script>
import NavbarVue from '../components/HeaderNFooter/navbar.vue'
import axios from "axios"
export default {
  name: 'App',
  components:{
    NavbarVue
  },
  data() {
    return {
      posts : {}
    }
  },
mounted(){
    axios
      .get('http://localhost:8080/api/getpost')
      .then((response) => (this.posts = response.data))
}}
</script>

<style>
#app {
  font-family: Lato;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
