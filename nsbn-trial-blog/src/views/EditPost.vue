<template>
  <NavbarVue>
</NavbarVue>
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
                
                <p hidden ref="userPosted"></p>
                    <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>
</template>

<script setup>
import NavbarVue from '../components/HeaderNFooter/NavBar.vue';
import {ref} from 'vue';
import axios from "axios";
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const posts = ref(null)
const id = ref(route.params.id)
const userPosted = ref('')
const getuserinfo = ref(null)

let requestlink = ref('http://localhost:8080/api/getpost?idp='+id.value)
    axios.get(requestlink.value)
    .then((response) => {
        posts.value = response.data[0]
        if (posts.value){
            titleInput.value = posts.value.title
            descriptionInput.value = posts.value.description
            userPosted.value = posts.value.userPosted
            }
        else{
            router.push({name: 'errorfourofour'})
        }
        })

//checks if op is the same as logged in user
axios.get('http://localhost:8080/api/getprofileinfo')
.then((response) => {getuserinfo.value = response.data
    if (response.data.userid == getuserinfo.value.userid && response.data.isauthenticated == true){
        //bypass
    }
    else{
        router.push({name: 'errorfourothree'})
    }}
    )

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