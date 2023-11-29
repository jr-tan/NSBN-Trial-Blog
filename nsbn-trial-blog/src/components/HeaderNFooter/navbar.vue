<template>
<nav id="nav" class="navbar navbar-expand-sm navbar-dark fixed-top" style="background-color: black;">
	<div class="container">
		<a class="navbar-brand"><router-link to ="/" style="color:white">NS SBN Trial Blog</router-link></a>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<a href="/register" class="nav-link" v-if="sessionstatus==1">Register</a>
						<a href="/create" class="nav-link" v-if="sessionstatus==2">Create Post</a>
					</li>
					<li class="nav-item">
						<a href="/login" class="nav-link" v-if="sessionstatus==1">Login</a>
						<a @click="logout" class="nav-link" style=" cursor: pointer; " v-if="sessionstatus==2">Log Out</a>
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

const getuserinfo = ref(null)

axios.get('http://localhost:8080/api/getprofileinfo')
    .then((response) => {getuserinfo.value = response.data
    if (getuserinfo.value.outcome == 'authenticated'){
      sessionstatus.value = 2;
    }
    })


const logout = () => {
	console.log('attempt');
	axios.post('http://localhost:8080/api/logout')
    .then(window.location.reload());
}

</script>

<style>
a{
  text-decoration:none;
}
</style>