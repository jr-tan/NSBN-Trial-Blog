<template>
  <NavbarVue>
</NavbarVue>
	<div class="col-md-6 mx-auto">
		<div class="card card-body">
            <h2 class="py-3"><strong>Login</strong></h2>
            <form @submit.prevent="Submitform">
                <div class="text-danger"></div>
                <div class="form-group">
					<label for="email" class="pb-2">Username</label>
					<input name="email" class="form-control" v-model="topInput" required>
				</div>
				<div class="form-group py-3">
					<label for="password" class="pb-2">Password</label>
					<input type="password" name="password" class="form-control"  v-model="pwdInput" required>
				</div>
				<div class="form-group py-4">
					<a href="/register"><strong>Not registered?</strong></a> | <a href="/forgetpassword"><strong>Forget password?</strong></a>
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
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const topInput = ref('');
    const pwdInput = ref('');

    console.log(topInput.value)

    //submits for login and checks
    const Submitform = () => {
        axios.post('http://localhost:8080/api/login', {topinput : topInput.value, passwordinput:pwdInput.value})
        .then((response) => {
            let responseinfo = ref(null)
            responseinfo.value = response.data
            console.log(responseinfo.value.outcome)
            if (responseinfo.value.outcome == 'success'){
            router.push({name: 'home'})}
            else{
                alert(responseinfo.value.outcome +', please try again')
            }
            })
    }
</script>