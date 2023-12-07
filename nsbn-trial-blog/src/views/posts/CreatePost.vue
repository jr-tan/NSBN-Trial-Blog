<template>
    <div class="container">
		<div class="card card-body">
			<h2 class="text-center py-3"><strong>Create Post</strong></h2>
            <form @submit.prevent="Submitform">
                <div class="text-danger"></div>
                <div class="form-group pb-2">
                    <label class="pb-2">Title</label>
                    <input type="text" class="form-control" v-model = "titleInput" required>
                </div>

                <div class="form-group pb-2">
                    <label for="name" class="pb-2">Description</label>
                    <textarea v-model = "descriptionInput" class="form-control" required></textarea>
                </div>
                    <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
        </div>
</template>

<script setup>
    import {ref} from 'vue';
    import axios from "axios"

    const titleInput = ref('');
    const descriptionInput = ref('');
    const userposted = ref('');

    //checks if user is authenticated
    axios.get('/api/getsessioninfo')
        .then((response) => {
            if (response.data.outcome == "authenticated"){
                userposted.value = response.data.userid;
            }
            else{
                window.location.href = "/error403";
            }}
        )
        
const Submitform = () => {
    console.log(titleInput.value)
    axios.post('/api/createpost', {title:titleInput.value, description:descriptionInput.value, userposted: userposted.value})
        .then(alert('post created'))
        .then(window.location.href="/")
        .catch(error => console.log(error));
}
</script>
