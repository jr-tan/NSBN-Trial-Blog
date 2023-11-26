<template>
    <div class="container">

            <form @submit.prevent="Submitform">
                <div class="text-danger"></div>

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
import axios from "axios"

const titleInput = ref('');
const descriptionInput = ref('');

    const Submitform = () => {
        console.log(titleInput.value)
        axios.post('http://localhost:8080/api/createpost', {title:titleInput.value, description:descriptionInput.value})
        .then((response) => {
        console.log(response)
        alert('post created')})
        .catch(error => console.log(error))
    }

    

    //https://softauthor.com/vue-js-3-composition-api-reusable-scalable-form-validation/#Bind-Input-Field-Data-To-The-User-Object
</script>
