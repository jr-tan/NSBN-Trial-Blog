<template>
<nav class="navbar navbar-light fixed-top" style="background-color: black;">
  <button type="button" id="sidebarCollapse" class="btn" style="background-color: black; outline: none;">
    <i class="far fa-bars"></i>
  </button>
  <a class="navbar-brand text-light font-weight-bold mr-auto ml-3"> <router-link to="/"> NS SBN Trial Blog </router-link> </a>

  
  <a class="navbar-brand text-light font-weight-bold ml-3" href=""><router-link to="/register">Register<i
      class="ml-2 fas fa-sign-out-alt"></i></router-link></a>

  <a class="navbar-brand text-light font-weight-bold ml-3" href=""><router-link to="/login">Login<i
      class="ml-2 fas fa-sign-out-alt"></i></router-link></a>
</nav>
</template>

<script>

export default {
  name: 'web-navbar'}

</script>