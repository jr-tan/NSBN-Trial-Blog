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
    const commentInput = ref('');
    const router = useRouter();

    axios.get('http://localhost:8080/api/getcomment?commentid='+id.value)
    .then((response) => {comments.value = response.data
    commentInput.value = comments.value[0].commenttext});

    const Submitform = () =>{
        axios.post('http://localhost:8080/api/updatecomment?idp='+id.value, {newcomment:commentInput.value})
        router.push({name: 'home'})
    }
</script>
