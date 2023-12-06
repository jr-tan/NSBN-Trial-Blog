<template>
<h1><strong> Manage users </strong></h1>
<table>
  <tr>
    <th>Username</th>
    <th>Email</th>
    <th>Role</th>
    <th>Link</th>
  </tr>
  <tr v-for="item in userlist" v-bind:key="item">
    <td>{{item.publicusername}}</td>
    <td>{{item.email}}</td>
    <td>{{item.role}}</td>
    <td>link</td>
  </tr>
</table>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

 let userlist = ref(null)

axios.get("/api/getprofileinfo")
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