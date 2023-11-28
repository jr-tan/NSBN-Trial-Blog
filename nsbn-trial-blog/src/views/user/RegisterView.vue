<template>
  <NavbarVue>
</NavbarVue>

 <div class="row">
	<div class="col-md-6 mx-auto">
		<div class="card card-body">
			<h3 class="text-center">Account Register</h3>
			<form @submit.prevent="Submitform">
				<div class="form-group">
					<label for="name">Username</label>
					<input type="text" class="form-control" v-model = "usernameInput" required>
				</div>
                <div class="form-group">
					<label for="name">Biography</label>
					<input type="text" class="form-control"  v-model = "bioInput" required>
				</div>
                <div class="form-group">
					<label for="name">Name</label>
					<input type="text" class="form-control" v-model = "nameInput" required>
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input  type="email" class="form-control" v-model = "emailInput" required>
				</div>
				<div class="alert alert-danger" role="alert" v-if ="ErrorforPassword"  > {{ErrorforPassword}} </div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" class="form-control"  v-model = "passwordInput" required>
				</div>
				<div class="form-group">
					<label for="password2">Confirm Password</label>
					<input type="password" class="form-control" v-model = "finalisepasswordInput" required>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	</div>
</div>
</template>

<script setup>

import {ref} from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router'

const router = useRouter()

	const ErrorforPassword = ref('');
	const passwordInput = ref('');
	const finalisepasswordInput = ref('');
	const usernameInput = ref('');
	const descriptionInput = ref('');
	const emailInput = ref('');
	
const Submitform = () => {

	let readytoSubmit = false
	console.log(passwordInput.value)
	// regex validation for password
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
	//8-10 chars, at least 1 uppercase, 1 lowecase, 1 number, 1 special character
	const checkmatches = regex.test(passwordInput.value)
	ErrorforPassword.value = checkmatches != false ? '': 'Password must meet the following : 8-10 chars, at least 1 uppercase, 1 lowecase, 1 number, 1 special character'

	//checking if password input matches
	if (passwordInput.value == finalisepasswordInput.value){
		readytoSubmit = true
		if (ErrorforPassword.value == 'Password must meet the following : 8-10 chars, at least 1 uppercase, 1 lowecase, 1 number, 1 special character'){
			readytoSubmit = false
		}
	}else{
		ErrorforPassword.value = "Password does not match.";
	}

	if (readytoSubmit == true){
	console.log(readytoSubmit)
	console.log('form will be submiited')

	axios.post('http://localhost:8080/api/createuser', {username:usernameInput.value, userbio:descriptionInput.value, email:emailInput.value, password:passwordInput.value})
	.then(router.push({name: 'login'}))
	}}

</script>
