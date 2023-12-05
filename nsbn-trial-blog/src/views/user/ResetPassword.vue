<template>
	<div class="col-md-6 mx-auto">
		<div class="card card-body">
            <h2 class="py-3"><strong>Reset Password</strong></h2>
			<div class="alert alert-danger" role="alert" v-if ="ErrorforPassword"  > {{ErrorforPassword}} </div>
            <form @submit.prevent="Submitform">
                <div class="text-danger"></div>
                <div class="form-group">
					<label for="username" class="pb-2">Enter the new password of your account {{username}}</label>
					<input name="username" type="password" class="form-control" v-model="Password" required>
				</div>
                <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import axios from "axios";
    import {ref} from 'vue';
    import {useRoute } from 'vue-router';
    const route = useRoute()

    const Userinfo = ref('');
    const Username = ref('');
    const Password = ref('');
	const ErrorforPassword = ref('');
    const id = ref(route.params.id);

     //checks if user is authenticated
    axios.get('/api/getuserbyid?idp='+id.value)
    .then((response) => { 
        if (response.data == "no user"){
            window.location.href = "/errorfourofour"}
        else{
            Userinfo.value = response.data
            Username.value = response.data.publicusername}
        if (response.data.hasrequestedtoreset == 0){
            axios.get('/api/getprofileinfo')
            .then((sessionresponse) => {
                if (response.data.publicusername != sessionresponse.data.userid){
                    window.location.href = "/errorfourofour"
                }
            })
        }})
    //submits for login and checks

    const Submitform = () => {
        //Password regex
        // regex validation for password
        const pwdregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
        //8-10 chars, at least 1 uppercase, 1 lowecase, 1 number, 1 special character
        const checkmatches = pwdregex.test(Password.value)
        if (checkmatches == false){
            ErrorforPassword.value = 'Password must meet the following : 8-10 chars, at least 1 uppercase, 1 lowecase, 1 number, 1 special character'}
        else{
            axios.post('/api/updatepassword', {username : Userinfo.value.publicusername, newpassword:Password.value})
            .then((response) => {
                if (response.data == 'update done')
                {
                    alert('Password has been reset successfully')
                    window.location.href= "/login"
                }
                else{
                    alert('An error occured, please try again')
                }})
        }
    }
</script>