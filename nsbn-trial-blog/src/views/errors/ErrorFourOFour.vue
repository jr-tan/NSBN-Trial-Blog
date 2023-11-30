<template>
    <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg">
    <h1> 404 not found </h1>
    <button @click="gohome" class="btn btn-primary mt-3"> Go home </button> 
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter()

const gohome = () => {
 router.push({name: 'home'})
}
</script>