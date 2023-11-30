<template>

  <NavbarVue>
</NavbarVue>
<div class="mx-auto col-md-8">
    <h1><strong>{{title}}</strong></h1>
    <i>Posted by {{userPosted}}</i>
    <br>
    <p>Posted on {{datePosted}}</p>
    <p>{{description}}</p>
    <p hidden>{{currentuser}} </p>

    <div id="actions">
    <button @click="ratePost" id="ratebutton" class="btn btn-primary"><i class="fas fa-thumbs-up"></i>Like </button>
    <button @click="editPost" id="editbutton" class="btn btn-warning"><i class="fas fa-edit"></i>Edit </button>
    <button class="btn btn-danger" id="deletebutton" @click="deletePost"><i class="fa fa-trash" aria-hidden="true"></i>Delete </button>
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
    import NavbarVue from '../components/HeaderNFooter/NavBar.vue';
    import CommentsCompo from '../components/CommentsCompo.vue';
    import axios from "axios";
    import {ref} from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
        
    const title = ref(null);
    const userPosted=ref(null);
    const description = ref(null);
    const datePosted = ref(null);
    const getuserinfo = ref(null);
    const currentuser = ref(null);
    const commentcount = ref(null);

    const id = ref(route.params.id);
    const posts = ref(null);

    //updates view count of the post, auto redirects to 404
    axios.post('http://localhost:8080/api/updateviews?idp='+id.value)
    .then((response) => {
        if (response.data == 'no posts'){
            router.push({name:'errorfourofour'})
        }
        else{
            //gets post based on the id
            let requestlink = ref('http://localhost:8080/api/getpost?idp='+id.value)
            axios.get(requestlink.value)
            .then((response) => {
                posts.value = response.data;
                //console.log(posts.value.length)
                if (posts.value){
                    title.value = posts.value[0].title;
                    userPosted.value = posts.value[0].userPosted;
                    description.value = posts.value[0].description;
                    datePosted.value = posts.value[0].datePosted;
                    commentcount.value = posts.value[0].commentscount;}
                else{
                    router.push({name: 'errorfourofour'});
                }
                })

            //temporary 0.3s timeout to determine request is fully received before comparing accordingly
            setTimeout(() => 
            //gets information of user logged in, and removes action buttons accordingly
            axios.get('http://localhost:8080/api/getprofileinfo')
                .then((response) => {getuserinfo.value = response.data
                currentuser.value = getuserinfo.value.userid;
                    if (getuserinfo.value.outcome == 'authenticated'){
                        if (getuserinfo.value.role != "admin"){
                            //user role is not admin
                            if (userPosted.value != getuserinfo.value.userid){
                                //user posted value is not userid
                                //user posted is not the same
                                document.getElementById('deletebutton').remove();
                                document.getElementById('editbutton').remove();                    }
                        }
                        document.getElementById('nologin').remove();
                    }
                    else{
                        document.getElementById('deletebutton').remove();
                        document.getElementById('editbutton').remove();
                        document.getElementById('ratebutton').remove();
                    }
                    })
                    ,300);
                }
    })

//redirects to edit post page
const editPost = () => {
    router.push('../editpost/'+id.value)
}

//delete post, will show warning before deleting post
const deletePost = () => {
    let text = "Are you sure you want to delete your post?";
    if (confirm(text) == true) {
        axios.post('http://localhost:8080/api/deletePost?idp='+id.value)
        .then(() => {  alert('post deleted.')
            window.location.href = "http://localhost:8080/"
        })
    }}

//post rating feature
const ratePost = () => {
    axios.post('http://localhost:8080/api/ratepost?idp='+id.value)
    .then((outcome) => {
        if (outcome.data == "user rated"){
            alert("you have already rated on this post.")
        }
    }
    )
}

</script>   