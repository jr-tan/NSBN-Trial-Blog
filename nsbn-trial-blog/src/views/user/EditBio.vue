<template>
    <div class="container">
        <div class="card card-body">
			<h2 class="text-center py-3"><strong>Edit biography</strong></h2>
            <form @submit.prevent="Submitform">
                    <p ref="postid" hidden>{{id}}</p>
                    <textarea v-model = "newbioInput" class="form-control"></textarea>
                    <button id="butAddVideo" type="submit" class="btn btn-primary mt-3">Post
                    </button>
            </form>   
        </div>
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const id = ref(route.params.id);
    const newbioInput = ref('');

    function verifyAuthnSetValues(responsedata){
        axios.get('/api/getsessioninfo')
        .then((profileresponse) => {
            if (profileresponse.data.userid == responsedata.publicusername && profileresponse.data.outcome=="authenticated"){
                newbioInput.value = responsedata.userbio
            } else{
                window.location.href= "/error403"
            }
        })
    }

    onBeforeMount(() => {
        axios.get('/api/getuser?publicusername='+id.value)
        .then ((response) => {
            if (response.data){
                //get session info to check if its the same user
                verifyAuthnSetValues(response.data)
            }else{
                window.location.href = "/errorfourofour"
            }
        })
    })

    const Submitform = () =>{
        axios.post('/api/updatebio', {publicusername:id.value, newbio:newbioInput.value})
        window.location.href="/"
    }
</script>