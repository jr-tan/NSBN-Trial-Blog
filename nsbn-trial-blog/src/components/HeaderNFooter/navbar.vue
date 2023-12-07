<template>
<nav id="nav" class="navbar navbar-expand-sm navbar-dark" style="background-color: black;">
	<div class="container">
		<a class="navbar-brand"><router-link to ="/" style="color:white">NS SBN Trial Blog</router-link></a>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ml-auto">
					<!-- not logged in -->
					<li class="nav-item" v-if="sessionstatus==1">
						<a href="/register" class="nav-link">Register</a>
					</li>
					<li class="nav-item" v-if="sessionstatus==1">
						<a href="/login" class="nav-link">Login</a>
					</li>
					<!-- logged in, not admin -->
					<li class="nav-item" v-if="sessionstatus==2">
						<a href="/create" class="nav-link">Create Post</a>
					</li>
					<li class="nav-item" v-if="sessionstatus==2">
						<a @click="logout" class="nav-link" style=" cursor: pointer; ">Log Out</a>
					</li>
					<!-- admin -->
					<li class="nav-item" v-if="isAdmin==true">
						<a href="/admin/usertables" class="nav-link">[Admin] Manage Users </a>
					</li>
			</ul>
		</div>
	</div>
</nav>
</template>

<script setup>
import axios from "axios"
import {ref} from 'vue'

let sessionstatus = ref(1)
let isAdmin = ref(null)

axios.get('/api/getsessioninfo')
    .then((response) => {
    if (response.data.outcome == 'authenticated'){
      sessionstatus.value = 2;
    }
	if (response.data.role == 'admin'){
		isAdmin = true;
	}
    })


const logout = () => {
	console.log('attempt');
	axios.post('http://localhost:8080/api/logout')
    .then(
		window.location.href="/"
	);
}

</script>

<style>
a{
  text-decoration:none;
}
</style>