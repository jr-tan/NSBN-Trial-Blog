<template>
<h1>{{title}}</h1>
    <i>{{userPosted}}</i>
    <br>
    <p>{{description}}</p>
    <br>
    <p>{{datePosted}}</p>

    <button @click="editPost" id="editbutton"> Edit </button>
    <button @click="deletePost" id="deletebutton"> Delete </button>
    <p id="nologin"> Make a account to make your own posts! </p>
</template>

<script setup>
import axios from "axios"
import {ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
    
const title = ref(null)
const userPosted=ref(null)
const description = ref(null)
const datePosted = ref(null)
const getuserinfo = ref(null)

const id = ref(route.params.id)
const posts = ref(null)

    //checks whether to render the delete button
  axios.get('http://localhost:8080/api/getprofileinfo')
    .then((response) => {getuserinfo.value = response.data
    console.log(getuserinfo.value)
    if (getuserinfo.value.outcome == 'authenticated'){
      if (getuserinfo.value.role != "admin"){
        if (userPosted.value != getuserinfo.value.userid){
            document.getElementById('deletebutton').remove();
            document.getElementById('editbutton').remove();
        }
      }
         document.getElementById('nologin').remove();
    }
    else{
         document.getElementById('deletebutton').remove();
            document.getElementById('editbutton').remove();
    }
    })


let requestlink = ref('http://localhost:8080/api/getpost?idp='+id.value)
    axios.get(requestlink.value)
.then((response) => {
    posts.value = response.data
    console.log(posts.value.length)
    if (posts.value.length ==  1){
    title.value = posts.value[0].title
    userPosted.value = posts.value[0].userPosted
    description.value = posts.value[0].description
    datePosted.value = posts.value[0].datePosted}
    else{
        router.push({name: 'errorfourofour'});
    }
    })

const editPost = () => {
    router.push('../editpost/'+id.value)
}

const deletePost = () => {
    axios.post('http://localhost:8080/api/deletePost?idp='+id.value)
    .then(() => {  alert('post deleted.')
    router.push({name: 'home'})}
    )

}

</script>