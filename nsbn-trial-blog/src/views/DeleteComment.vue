<template>
 <h1>Deleting comment {{id}}</h1>   
 <p>(I know there are better way to do this, I have tried using axios but I just gave up)</p>
 <p> <strikethrough> If it works, it works </strikethrough></p>
</template>
<script setup>
    import {ref} from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const id = ref(route.params.id);

    console.log(id.value)
    axios.post('http://localhost:8080/api/deletecomment', {idp:id.value});
    console.log('dele');
    window.location.href="http://localhost:8080/";
</script>