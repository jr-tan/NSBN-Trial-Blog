<template>
<h1>{{title}}</h1>
    <i>{{userPosted}}</i>
    <br>
    <p>{{description}}</p>
    <br>
    <p>{{datePosted}}</p>

</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            id : this.$route.params.id,
            posts : null,
            title: '',
            userPosted: '',
            description: '',
            datePosted: ''
        }
    },
    mounted(){
    var requestlink = 'http://localhost:8080/api/getpost?idp='+this.id
    axios
      .get(requestlink)
      .then((response) => {this.posts = response.data[0]
      this.title=response.data[0].title
      this.userPosted = response.data[0].userPosted
      this.description = response.data[0].description
      this.datePosted = response.data[0].datePosted})
      
}}
</script>