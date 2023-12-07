<template>

    <div v-if="test.userId != ''">
        <br>
        <h4>
        <strong>Create a comment</strong></h4>
        <form @submit.prevent="Submitform">
            <br>
            <p ref="postid" hidden>{{test.pullId}}</p>
            <p ref="getuserid" hidden>{{test.userId}}</p>
            <textarea v-model = "commentInput" class="form-control mx-auto" style="width:98%"></textarea>
            <button id="butAddVideo" type="submit" class="btn btn-primary mt-3">Post
            </button>
            <br>
        </form>
    </div>
    <div class="row pt-4" >
    <div v-for="item in comments" v-bind:key="item">
        <hr>
        <h5 class="container"><strong>{{item.commenttext}}</strong></h5>
        <p>By <router-link :to="{name: 'userprofile',params: { id:item.usercommented}}">{{item.usercommented}}</router-link> | {{item.datecommented}}  <a v-if="item.isedited==1">(edited)</a></p>
        <p hidden>{{item.commentsid}}</p>
        <router-link :to="{name: 'editcomment',params: { id:item.commentsid}}"><button class="btn btn-warning" v-if="item.usercommented == test.userId" href=""><i class="fa fa-edit" aria-hidden="true"></i>Edit</button></router-link>
        <button class="btn btn-danger" v-if="item.usercommented == test.userId" @click="deleteComment(item.commentsid)"><i class="fas fa-trash"></i>Delete</button>
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

axios.get('/api/getcomment?idp='+test.pullId)
    .then((response) => (comments.value = response.data));

const Submitform = () =>{
    axios.post('/api/createcomment', {commenttext: commentInput.value, usercommented:String(getuserid.value.innerHTML), postcommented:postid.value.innerHTML})
    window.location.reload();
}

const deleteComment = (id) => {
    let text = "Are you sure you want to delete your comment?";
    if (confirm(text) == true) {
        axios.post('/api/deletecomment',{idp:id})
        .then(() => {  
            alert('comment deleted.')
            location.reload();
        })
    }}
</script>