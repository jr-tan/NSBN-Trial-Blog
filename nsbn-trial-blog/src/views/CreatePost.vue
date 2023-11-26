<template>
    <div class="container">

            <form @submit.prevent="">
                <div class="text-danger"></div>

                <div class="form-group">
                    <label for="name">Tile</label>
                    <input type="text" class="form-control" v-model = "tileInput" required>
                </div>

                <div class="form-group">
                    <label for="name">Description</label>
                    <textarea v-model = "descriptionInput" class="form-control"></textarea>

                </div>
                
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary" @click="Submitform">Submit</button>
                </div>
            </form>

        </div>
</template>

<script>
import axios from "axios"
export default{
    setup() {
         const Submitform = () => {
        alert(this.titleInput)
        axios.post('http://localhost:8080/api/createpost', this.titleInput, this.descriptionInput)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
    
    return{ formData:{
        userPosted: '',
        titleInput: '',
        descriptionInput: '',
        Submitform
    }}
    }}

    

    //https://softauthor.com/vue-js-3-composition-api-reusable-scalable-form-validation/#Bind-Input-Field-Data-To-The-User-Object
</script>
