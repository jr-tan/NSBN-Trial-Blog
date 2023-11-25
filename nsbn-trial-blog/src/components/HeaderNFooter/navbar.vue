<template>
<nav class="navbar navbar-light fixed-top" style="background-color: black;">
  <button type="button" id="sidebarCollapse" class="btn" style="background-color: black; outline: none;">
    <i class="far fa-bars"></i>
  </button>
  <a class="navbar-brand text-light font-weight-bold mr-auto ml-3"> <router-link to="/"> NS SBN Trial Blog </router-link> </a>

  <li class="nav-item avatar dropdown list-unstyled" style="cursor: pointer;">
    <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5"
      style="background-color: transparent;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      <span class="badge badge-danger ml-2" id="length_notif"></span>
      <i class="fas fa-bell"></i>
    </a>
    <div class="dropdown-menu dropdown-menu-lg-right dropdown-secondary" aria-labelledby="navbarDropdownMenuLink-5"
      id="notifs">
      <a class="dropdown-item waves-effect waves-light" href="#">Action <span
          class="badge badge-danger ml-2">4</span></a>

    </div>
  </li>
  <a class="navbar-brand text-light font-weight-bold ml-3" href=""><router-link to="/about">Test<i
      class="ml-2 fas fa-sign-out-alt"></i></router-link></a>
</nav>
</template>

<script>

export default {
  name: 'web-navbar'}

</script>