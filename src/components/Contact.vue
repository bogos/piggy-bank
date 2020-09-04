<template>
  <div class="wrapper">
      <h1>Contact Us</h1>
      <form @submit.prevent="sendEmail">
         <input type="text" placeholder="Firstname" v-model="userData.firstname" /><br>
         <input type="text" placeholder="Lastname" v-model="userData.lastname" /><br>
         <input type="text" placeholder="Username" v-model="userData.username" /><br>
         <input type="email" placeholder="Email" v-model="userData.email" /><br>
         <input type="password" placeholder="Choose a password" v-model="userData.password" /><br>
         <button>Create account</button>
      </form>
   </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'contact',

    data(){
         return{
            userData: {
               firstname: '',
               lastname: '',
               username: '',
               email: '',
               password: ''
            },
            successMessage: '',
            errorMessage: ''
         }
    },
    methods: {
        async sendEmail() {
            let sendEmailNotification ="https://us-central1-dsbuilder-50bf4.cloudfunctions.net/sendEmailNotification";
            const response = await axios.post(sendEmailNotification, this.userData);
            console.log("RESPONSE", response);
        }
    }
}
</script>

<style>

</style>