<template>
<div class="pb-3">
<h1><strong> Manage users </strong></h1>
<a> Click on the username to access the profile page, and make various changes for the user. </a>
</div>
<table>
  <tr>
    <th>Username</th>
    <th>Email</th>
    <th>Role</th>
    <th>Status</th>
  </tr>
  <tr v-for="item in userlist" v-bind:key="item">
    <td><strong><router-link :to="{name: 'userprofile',params: { id:item.publicusername}}">{{item.publicusername}}</router-link></strong> (Internal ID : {{item.userid}})</td>
    <td>{{item.email}}</td>
    <td>{{item.role}}</td>
    <td v-if="item.hasrequestedtoreset==1">Requested for Password Reset</td>
    <td v-else>N/A</td>
  </tr>
</table>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

 let userlist = ref(null)

axios.get("/api/getsessioninfo")
.then((response) => {
  if (response.data.role != "admin"){
    window.location.href = "/error403"
  }
  else{
    axios.get("/api/getuser")
  .then((response) => {userlist.value = response.data})
  }
})
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>