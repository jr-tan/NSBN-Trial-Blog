<template>
  <NavbarVue>
</NavbarVue>
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
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import NavbarVue from '../../components/HeaderNFooter/NavBar.vue';
    import axios from "axios";
    import {ref} from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter()
    const route = useRoute()

    const Userinfo = ref('');
    const Username = '';
    const Password = ref('');
	const ErrorforPassword = ref('');
    const id = ref(route.params.id);

    axios.get('http://localhost:8080/api/getuserbyid?idp='+id.value)
    .then((response) => { 
    if (response.data != "no user"){
        Userinfo.value = response.data
        Username.value = response.data.publicusername
        if (response.data.hasrequestedtoreset==0){
            router.push({name: "errorfourofour"})
        }
    else{
        router.push({name: "errorfourofour"})
    }}})
    //submits for login and checks

    const Submitform = () => {
        //Password regex
        // regex validation for password
        const pwdregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
        //8-10 chars, at least 1 uppercase, 1 lowecase, 1 number, 1 special character
        const checkmatches = pwdregex.test(Password.value)
        console.log(checkmatches)
        if (checkmatches == false){
            ErrorforPassword.value = 'Password must meet the following : 8-10 chars, at least 1 uppercase, 1 lowecase, 1 number, 1 special character'}
        else{
            axios.post('http://localhost:8080/api/updatepassword', {username : Userinfo.value.publicusername, newpassword:Password.value})
            .then((response) => {
                if (response.data == 'update done')
                {
                    alert('Password has been reset successfully')
                    router.push({name: 'home'})}
                else{
                    alert('An error occured, please try again')
                }})
        }
    }
</script>