<template>
    <div class="py-2">
        <h1><strong>{{Profileinfo.publicusername}}</strong></h1>
        <h4>{{Profileinfo.userbio}}</h4>
    </div>
    <div id="actions" class="pb-3">
        <button @click="sendRequest" id="sendpwdrequest" class="btn btn-warning">Send Password Request</button>       
        <button @click="resetPassword" id="resetpassword" class="btn btn-warning">Change Password</button>       
        <button @click="changeBio" id="changebio" class="btn btn-primary">Change Bio</button>    
    </div>
    <h3> Posts by {{Profileinfo.publicusername}} </h3>
      <PostsListCompo :intent="'specificuser'" :key="'specificuser'" :userId="id">
  </PostsListCompo>
</template>
<script setup>
    import PostsListCompo from '../../components/PostsListCompo.vue';
    import axios from "axios";
    import {ref, onMounted} from 'vue';
    import {useRoute } from 'vue-router';

    const route = useRoute();
    const id = ref(route.params.id);
    //ID IN THIS CASE IS THE PUBLIC USERNAME NOT INTERNAL ID
    const Profileinfo = ref('');
    const SessionInfo = ref('');
    const userPerms = ref(0);
    /* 0 - Not Logged In
    1 - Logged in but not same user
    2 - Same user as OP
    3 - admin*/

    function setSessionInfo() {
        axios.get('/api/getsessioninfo')
        .then((response) => SessionInfo.value = response.data)
    }

    function renderbyrole(){
        if (SessionInfo.value.role == "not logged in"){
            userPerms.value = 0;
            document.getElementById('actions').remove();
        }
        else{
            if (Profileinfo.value.publicusername != SessionInfo.value.userid){
                    //session user is not username
                if (SessionInfo.value.role == "admin"){
                    userPerms.value = 3;
                    document.getElementById('resetpassword').remove(); 
                }  
                else{
                    userPerms.value = 1;
                    document.getElementById('actions').remove();
                }
            }else{
                userPerms.value = 2;
                document.getElementById('sendpwdrequest').remove(); 
            }
        }
    }
    onMounted(() => {
        setSessionInfo()
        axios.get('/api/getuser?publicusername='+id.value)
        .then((response) => {
            if (response.data != "no user"){
                Profileinfo.value = response.data
                renderbyrole()
            }else{
                window.location.href = "/errorfourofour"
            }
        })})

    const sendRequest = () =>{
        if (userPerms.value == 3){
            axios.post('/api/changepasswordrequest', {userid : Profileinfo.value.publicusername})
        .then((response) => {
            if (response.data == 'message sent'){
                alert('email has been sent, check your inbox')
                window.location.href= "/";}
            else{
                alert('An error occured, please try again')
            }
            }) 
        }
    }

    const resetPassword = () => {
        if (userPerms.value == 2){
        window.location.href="/resetpassword/"+Profileinfo.value.userid}
    }

    const changeBio = () => {
        if (userPerms.value >= 2){
        window.location.href="/editbio/"+Profileinfo.value.publicusername}
        //why admin can also edit? in case of moderation
    }
</script>