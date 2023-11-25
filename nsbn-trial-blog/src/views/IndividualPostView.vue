<template>
    <h1>{{posts[id-1].title}}</h1>
    <i>{{posts[id-1].userPosted}}</i>
    <br>
    <p>{{posts[id-1].description}}</p>
    <br>
    <p>{{posts[id-1].datePosted}}</p>

</template>

<script>
import icheated from '../testData/posts.json'
export default {
    data(){
        return{
            id : this.$route.params.id,
            posts : icheated
        }
    }
}
</script>