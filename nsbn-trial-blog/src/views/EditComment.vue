<template>
    <div class="container">
        <div class="card card-body">
			<h2 class="text-center py-3"><strong>Edit comment</strong></h2>
            <form @submit.prevent="Submitform">
                    <p ref="postid" hidden>{{id}}</p>
                    <textarea v-model = "commentInput" class="form-control"></textarea>
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
    const commentInput = ref('');

    function verifyAuthnSetValues(responsedata){
        axios.get('/api/getprofileinfo')
        .then((profileresponse) => {
            if (profileresponse.data.userid == responsedata.usercommented && profileresponse.data.outcome=="authenticated"){
                commentInput.value = responsedata.commenttext
            } else{
                window.location.href= "/error403"
            }
        })
    }

    onBeforeMount(() => {
        axios.get('/api/getcomment?commentid='+id.value)
        .then ((response) => {
            if (response.data[0]){
                //get profile to check if its the same user as op
                verifyAuthnSetValues(response.data[0])
            }else{
                window.location.href = "/errorfourofour"
            }
        })
    })

    const Submitform = () =>{
        axios.post('/api/updatecomment?idp='+id.value, {newcomment:commentInput.value})
        window.location.href="/"
    }
</script>
