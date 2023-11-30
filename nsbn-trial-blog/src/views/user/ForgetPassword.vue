<template>
	<div class="col-md-6 mx-auto">
		<div class="card card-body">
            <h2 class="py-3"><strong>Forget Password</strong></h2>
            <form @submit.prevent="Submitform">
                <div class="text-danger"></div>
                <div class="form-group">
					<label for="username" class="pb-2">Enter the username of your account</label>
					<input name="username" class="form-control" v-model="Username" required>
				</div>
                <button type="submit" class="btn btn-primary  mt-3">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import axios from "axios";
    import {ref} from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const Username = ref('');


    //submits for login and checks
    const Submitform = () => {
        axios.post('http://localhost:8080/api/changepasswordrequest', {userid : Username.value})
        .then((response) => {
            if (response.data == 'message sent'){
                alert('email has been sent, check your inbox')
                router.push({name: 'home'})}
            else{
                alert('An error occured, please try again')
            }
            })
    }
</script>