<template>

  <NavbarVue>
</NavbarVue>
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
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const titleInput = ref('');
    const descriptionInput = ref('');
    const getuserinfo = ref(null);
    const userposted = ref('');

    axios.get('http://localhost:8080/api/getprofileinfo')
        .then((response) => {getuserinfo.value = response.data
        console.log(getuserinfo.value)
            if (getuserinfo.value.outcome == "authenticated"){
                userposted.value = getuserinfo.value.userid;
            }
            else{
                router.push({name: 'errorfourothree'})
            }}
        )
        


const Submitform = () => {
    console.log(titleInput.value)
    axios.post('http://localhost:8080/api/createpost', {title:titleInput.value, description:descriptionInput.value, userposted: userposted.value})
    .then((response) => {
    console.log(response)
    alert('post created')
    router.push({name: 'home'})
    })
    .catch(error => console.log(error))
}


</script>
