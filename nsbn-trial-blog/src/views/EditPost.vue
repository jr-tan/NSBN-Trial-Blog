<template>
    <div class="container">

            <form @submit.prevent="Submitform">
                <div asp-validation-summary="All" class="text-danger"></div>

                <div class="form-group">
                    <label for="name">Tile</label>
                    <input type="text" class="form-control" v-model = "titleInput" required>
                </div>

                <div class="form-group">
                    <label for="name">Description</label>
                    <textarea v-model = "descriptionInput" class="form-control"></textarea>

                </div>
                
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>

        </div>
</template>

<script setup>

import {ref} from 'vue';
import axios from "axios";
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const posts = ref(null)
const id = ref(route.params.id)

let requestlink = ref('http://localhost:8080/api/getpost?idp='+id.value)
    axios.get(requestlink.value)
.then((response) => {
    posts.value = response.data
    if (posts.value.length ==  1){
        titleInput.value = posts.value[0].title
        descriptionInput.value = posts.value[0].description
    }
    else{
        router.push({name: 'home'});
    }
    })

const titleInput = ref('');
const descriptionInput = ref('');
const Submitform = () => {
        axios.post('http://localhost:8080/api/updatePost?idp='+id.value, {title:titleInput.value, description:descriptionInput.value})
        .then((response) => {
        console.log(response)
        alert('post has beeen successfully edited')
        router.push({name: 'home'})
        })
        .catch(error => console.log(error))    
}

</script>