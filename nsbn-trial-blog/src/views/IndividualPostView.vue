<template>

  <NavbarVue>
</NavbarVue>

    <h1>{{title}}</h1>
    <i>Posted by {{userPosted}}</i>
    <br>
    <p>Posted on {{datePosted}}</p>
    <p>{{description}}</p>

    <div id="actions">
    <button @click="editPost" id="editbutton" class="btn btn-outline-primary"><i class="fas fa-edit"></i>Edit </button>
    <button @click="deletePost" id="deletebutton" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i>Delete </button>
    <p id="nologin"> Make a account to make your own posts! </p>
    </div>
</template>

<script setup>
    import NavbarVue from '../components/HeaderNFooter/NavBar.vue';
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

    const id = ref(route.params.id);
    const posts = ref(null);

    //updates view count of the post
    axios.post('http://localhost:8080/api/updateviews?idp='+id.value);


    let requestlink = ref('http://localhost:8080/api/getpost?idp='+id.value)
    axios.get(requestlink.value)
    .then((response) => {
        posts.value = response.data;
        //console.log(posts.value.length)
        if (posts.value.length ==  1){
            title.value = posts.value[0].title;
            userPosted.value = posts.value[0].userPosted;
            description.value = posts.value[0].description;
            datePosted.value = posts.value[0].datePosted;}
        else{
            router.push({name: 'errorfourofour'});
        }
        })

    //temporary 0.3s timeout to determine request is fully received before comparing accordingly
    setTimeout(() => 
    //gets information of user logged in
    axios.get('http://localhost:8080/api/getprofileinfo')
        .then((response) => {getuserinfo.value = response.data
            console.log(getuserinfo.value.userid)
            console.log(userPosted.value)
            if (getuserinfo.value.outcome == 'authenticated'){
                if (getuserinfo.value.role != "admin"){
                    //not admin
                    //console.log(getuserinfo.value.userid);
                    if (userPosted.value != getuserinfo.value.userid){
                        //user posted value is not userid
                        document.getElementById('deletebutton').remove();
                        document.getElementById('editbutton').remove();
                    }
                }
                document.getElementById('nologin').remove();
            }
            else{
                document.getElementById('deletebutton').remove();
                document.getElementById('editbutton').remove();
            }
            })
            ,300);


const editPost = () => {
    router.push('../editpost/'+id.value)
}

const deletePost = () => {
    axios.post('http://localhost:8080/api/deletePost?idp='+id.value)
    .then(() => {  alert('post deleted.')
    router.push({name: 'home'})}
    )
}

</script>   