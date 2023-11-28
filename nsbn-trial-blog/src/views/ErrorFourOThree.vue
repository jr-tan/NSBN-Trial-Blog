<template>
    <img src="https://www.awardspace.com/wp-content/uploads/2021/01/403-forbidden-1.jpg" width="500" height="300">
    <h1> 403 forbidden </h1>
    <button @click="gohome"> Go home </button> 
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter()

const gohome = () => {
 router.push({name: 'home'})
}
</script>