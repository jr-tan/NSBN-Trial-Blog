<template>  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>

 
</template>


<script>

//import icheated from './testData/posts.json'
export default {
  name: 'App',
  
  data() {
    return {
      title : 'My app',
      weather : {},
      //posts : icheated
    }
  },
mounted(){
    fetch('http://worldtimeapi.org/api/timezone/Singapore')
      .then( res => res.json())
      .then(data => this.weather = data)
      .catch(err => console.log(err.message))
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
