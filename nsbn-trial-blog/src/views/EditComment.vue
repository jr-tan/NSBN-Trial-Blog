<template>
 <form @submit.prevent="Submitform">
        <p ref="postid" hidden>{{id}}</p>
        <textarea v-model = "commentInput" class="form-control"></textarea>
        <button id="butAddVideo" type="submit" class="btn btn-primary mb-5">Post
        </button>
    </form>   
</template>

<script setup>
    import {ref} from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const id = ref(route.params.id);
    const comments = ref(null);
    const getuserinfo = ref(null);
    const commentInput = ref('');
    const usercommented = ref('');
    const router = useRouter();

    //checks if op is the same as logged in user
    axios.get('http://localhost:8080/api/getprofileinfo')
    .then((response) => {getuserinfo.value = response.data
        if (response.data.userid == getuserinfo.value.userid && response.data.isauthenticated == true){
            //bypass
        }
        else{
            router.push({name: 'errorfourothree'})
        }}
        )

    axios.get('http://localhost:8080/api/getcomment?commentid='+id.value)
    .then((response) => {comments.value = response.data[0]
    if (comments.value){
    commentInput.value = comments.value.commenttext
    usercommented.value = comments.value.usercommented}
    else{
        router.push({name: 'errorfourothree'})
    }});

    const Submitform = () =>{
        axios.post('http://localhost:8080/api/updatecomment?idp='+id.value, {newcomment:commentInput.value})
        router.push({name: 'home'})
    }
</script>
