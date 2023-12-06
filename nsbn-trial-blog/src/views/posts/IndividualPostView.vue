<template>
<div class="mx-auto">
    <h1><strong>{{title}}</strong></h1>
    <i>Posted by {{userPosted}}</i> <a v-if="edited==1"><i> (edited)</i></a>
    <br>
    <p>Posted on {{datePosted}} | {{ratings}} Likes</p>
    <h4>{{description}}</h4>
    <p hidden>{{currentuser}} </p>

    <div id="actions">
    <div id="loggedin">
    <button @click="ratePost" id="ratebutton" class="btn btn-primary"><i class="fas fa-thumbs-up"></i>Like </button>
    <button @click="editPost" id="editbutton" class="btn btn-warning"><i class="fas fa-edit"></i>Edit </button>
    <button class="btn btn-danger" id="deletebutton" @click="deletePost"><i class="fa fa-trash" aria-hidden="true"></i>Delete </button>
    </div>
    <h4 id="nologin"><strong> Make an account to create, like, and comment on posts! </strong></h4>
    </div>

    <br>
    <h4> {{commentcount}} Comments </h4>
    <div class="card pb-3">
    <CommentsCompo :pullId="id" :key="currentuser" :userId="currentuser">
    </CommentsCompo>
    </div>
</div>
</template>

<script setup>
    import CommentsCompo from '../../components/CommentsCompo.vue';
    import axios from "axios";
    import {ref, onBeforeMount} from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const title = ref(null);
    const userPosted=ref(null);
    const description = ref(null);
    const datePosted = ref(null);
    const currentuser = ref(null);
    const commentcount = ref(null);
    const edited = ref(null);
    const ratings = ref(null);
    const userPerms = ref(0);
    /* 0 - Not Logged In
    1 - Logged in but not same user
    2 - Same user as OP*/

    const id = ref(route.params.id);

    //sets values displayed for page
    function setValues(responsedata){
        title.value = responsedata.title;
        userPosted.value = responsedata.userPosted;
        description.value = responsedata.description;
        datePosted.value = responsedata.datePosted;
        commentcount.value = responsedata.commentscount;
        ratings.value = responsedata.ratingscount;
        edited.value=responsedata.isedited;
    }

    //removes buttons/divs depending on user
    function renderbyrole(userPosted){
        //gets session status
        axios.get('/api/getprofileinfo')
        .then((response) => {
             currentuser.value = response.data.userid;
            if (response.data.outcome== 'authenticated'){
                if (response.data.role != "admin"){
                    //user role is not admin
                    if (userPosted != response.data.userid){
                        //user posted value is not userid
                        //user posted is not the same
                        document.getElementById('deletebutton').remove();
                        document.getElementById('editbutton').remove();
                        userPerms.value = 1;
                        }
                    else{userPerms.value = 2;}
                }
                else{userPerms.value = 2;}
                    document.getElementById('nologin').remove();
                }
                else{
                    document.getElementById('loggedin').remove();
                }
        })
    }

    //update viewcount
    function updateViews(id){
        axios.post('/api/updateviews?idp='+id)
    }

    onBeforeMount (async () => {
        axios.get('/api/getpost?idp='+id.value)
        .then((response)=>{
                if (response.data[0]){
                    setValues(response.data[0])
                    renderbyrole(response.data[0].userPosted);
                    updateViews(id.value);
                }else{
                    router.push({name: 'errorfourofour'})
                }
           })
    })

//redirects to edit post page
const editPost = () => {
    if (userPerms.value == 2){
    router.push('../editpost/'+id.value)}
}

//delete post, will show warning before deleting post
const deletePost = () => {
    let text = "Are you sure you want to delete your post?";
    if (userPerms.value == 2){
        if (confirm(text) == true) {
        axios.post('/api/deletePost?idp='+id.value)
        .then(() => {alert('post deleted.' )
         window.location.href = "/"
        })
    }
    }
    }

//post rating feature
const ratePost = () => {
    if (userPerms.value == 1){
    axios.post('/api/ratepost?idp='+id.value)
    .then((outcome) => {
        if (outcome.data == "user rated"){
            alert("you have already rated on this post.")
        }else{
            window.location.reload();
        }
    })}
}

</script>   