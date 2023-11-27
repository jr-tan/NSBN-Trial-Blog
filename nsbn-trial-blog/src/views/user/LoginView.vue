<template>
    <div class="container">

            <form @submit.prevent="Submitform">
                <div class="text-danger"></div>

                <div>
                    <label class="col-sm-2 col-form-label">Email:</label>
                    <input v-model="topInput" required/>
                </div>

                <div>
                    <label class="col-sm-2 col-form-label">Password:</label>
                    <input v-model="pwdInput" required/>
                </div>

                <div class="col-sm-10">
                    <input id="login" type="submit" value="Login" class="btn btn-primary" />
                </div>
            </form>

        </div>
</template>

<script setup>
    import axios from "axios";
    import {ref} from 'vue';

    const topInput = ref('');
    const pwdInput = ref('');

    console.log(topInput.value)

    const Submitform = () => {
        axios.post('http://localhost:8080/api/login', {topinput : topInput.value, passwordinput:pwdInput.value})
        .then((response) => {
            let responseinfo = ref(null)
            responseinfo.value = response.data
            console.log(responseinfo.value.value)
            alert(responseinfo.value.value)
            })
    }
</script>