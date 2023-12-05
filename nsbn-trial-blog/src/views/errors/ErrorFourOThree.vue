<template>
    <img src="https://www.awardspace.com/wp-content/uploads/2021/01/403-forbidden-1.jpg" width="500" height="300">
    <h1> 403 forbidden </h1>
    <button @click="gohome" class="btn btn-primary"> Go home </button> 
</template>

<script setup>
    const gohome = () => {
      window.location.href = "/"
    }
</script>