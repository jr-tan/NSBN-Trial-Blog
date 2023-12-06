<template>
    <div class="container">
        <div class="card card-body">
			<h2 class="text-center py-3"><strong>Edit Post</strong></h2>
            <form @submit.prevent="Submitform">
                <div asp-validation-summary="All" class="text-danger"></div>

                <div class="form-group pb-2">
                    <label class="pb-2">Tile</label>
                    <input type="text" class="form-control" v-model = "titleInput" required>
                </div>

                <div class="form-group pb-2">
                    <label class="pb-2">Description</label>
                    <textarea v-model = "descriptionInput" class="form-control"></textarea>

                </div>
                
                <p hidden ref="userPosted"></p>
                    <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
            </div>
        </div>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';
import axios from "axios";
import { useRoute } from 'vue-router'

const route = useRoute()

const id = ref(route.params.id)
const userPosted = ref('')
const titleInput = ref('');
const descriptionInput = ref('');

function verifyAuthnSetValues(responsedata){
    axios.get('/api/getprofileinfo')
        .then ((profileresponse) => {
        if (profileresponse.data.userid == responsedata.userPosted && profileresponse.data.outcome == "authenticated"){  
            //set values
            titleInput.value = responsedata.title;
            descriptionInput.value = responsedata.description;
            userPosted.value = responsedata.userPosted;
        }
        else{
            window.location.href="/error403"
        }}) 
}

onBeforeMount(() => {
//gets post
axios.get('/api/getpost?idp='+id.value)
.then((response) => {
    if (response.data[0]){
        //get profile to check if its the same user as op
        verifyAuthnSetValues(response.data[0])
    }
    else{
        window.location.href="/error404"
    }
})}



)


const Submitform = () => {
    axios.post('/api/updatePost?idp='+id.value, {title:titleInput.value, description:descriptionInput.value})
    .then((response) => {
    console.log(response)
    alert('post has beeen successfully edited')
    window.location.href = "/editpost/"+id.value
    })
    .catch(error => console.log(error))    
}

</script>