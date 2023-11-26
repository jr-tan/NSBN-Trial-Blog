<template>
<h1>{{title}}</h1>
    <i>{{userPosted}}</i>
    <br>
    <p>{{description}}</p>
    <br>
    <p>{{datePosted}}</p>

    <button @click="deletePost"> Delete </button>
</template>

<script setup>
import axios from "axios"
import {ref} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
    
const title = ref(null)
const userPosted=ref(null)
const description = ref(null)
const datePosted = ref(null)

const id = ref(route.params.id)
const posts = ref(null)
let requestlink = ref('http://localhost:8080/api/getpost?idp='+id.value)
    axios.get(requestlink.value)
.then((response) => {
    posts.value = response.data
    title.value = posts.value[0].title
    userPosted.value = posts.value[0].userPosted
    description.value = posts.value[0].description
    datePosted.value = posts.value[0].datePosted
    })

const deletePost = () => {
    axios.post('http://localhost:8080/api/deletePost?idp='+id.value)
    .then(() => {  alert('post deleted.')}
    )
}

</script>