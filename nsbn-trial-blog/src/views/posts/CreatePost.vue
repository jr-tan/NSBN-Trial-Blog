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
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const titleInput = ref('');
    const descriptionInput = ref('');
    const getuserinfo = ref(null);
    const userposted = ref('');

    //checks if user is authenticated
    axios.get('http://localhost:8080/api/getprofileinfo')
        .then((response) => {getuserinfo.value = response.data
        console.log(getuserinfo.value);
            if (getuserinfo.value.outcome == "authenticated"){
                userposted.value = getuserinfo.value.userid;
            }
            else{
                router.push({name: 'errorfourothree'});
            }}
        )
        


const Submitform = () => {
    console.log(titleInput.value)
    axios.post('http://localhost:8080/api/createpost', {title:titleInput.value, description:descriptionInput.value, userposted: userposted.value})
    .then((response) => {
    console.log(response);
    alert('post created');
    router.push({name: 'home'});
    })
    .catch(error => console.log(error));
}


</script>
