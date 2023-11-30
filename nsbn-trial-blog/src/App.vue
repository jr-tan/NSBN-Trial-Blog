<template>    <NavbarVue>
</NavbarVue>
<div class="container pt-4">
  <router-view/>
</div>

 
</template>
<script setup>
    import NavbarVue from '../src/components/HeaderNFooter/NavBar.vue';
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
