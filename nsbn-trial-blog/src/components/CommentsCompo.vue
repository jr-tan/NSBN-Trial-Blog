<template>
    <div v-if="test.userId != ''">
        <h3 class="mx-3">
        <strong>Create a comment</strong></h3>
        <form @submit.prevent="Submitform">
            <p ref="postid" hidden>{{test.pullId}}</p>
            <p ref="getuserid" hidden>{{test.userId}}</p>
            <textarea v-model = "commentInput" class="form-control"></textarea>
            <button id="butAddVideo" type="submit" class="btn btn-primary mb-5">Post
            </button>
        </form>
    </div>
     <div class="card">
        <div class="row" v-for="item in comments" v-bind:key="item">
            <p><strong>{{item.usercommented}}</strong></p>
            <p>{{item.commenttext}}</p>
            <p hidden>{{item.commentsid}}</p>
            <router-link :to="{name: 'deletecomment',params: { id:item.commentsid}}"><button class="btn btn-danger" v-if="item.usercommented == test.userId" href="">Delete</button></router-link>
            <router-link :to="{name: 'editcomment',params: { id:item.commentsid}}"><button class="btn btn-danger" v-if="item.usercommented == test.userId" href="">Edit</button></router-link>
            <hr>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {defineProps } from 'vue';
import axios from "axios";

const postid = ref('');
const commentInput = ref('')
const getuserid = ref('')
const comments = ref(null);

const test = defineProps({ 
    pullId : String,
    userId: String})

axios.get('http://localhost:8080/api/getcomment?idp='+test.pullId)
.then((response) => (comments.value = response.data));

const Submitform = () =>{
console.log(getuserid.value)
axios.post('http://localhost:8080/api/createcomment', {commenttext: commentInput.value, usercommented:String(getuserid.value.innerHTML), postcommented:postid.value.innerHTML})
window.location.reload();
}
</script>