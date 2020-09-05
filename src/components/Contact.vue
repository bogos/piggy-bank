<template>
  <div class="container">
     <div class="contact-container">
        <div class="contact-container-header">
            <h1 class="title">Contact Us!</h1>
               <p class="sub-title"> Leave us your questions </p>
         </div>
            <form @submit.prevent="sendEmail" class="contact-form">
               
               <label> First Name </label>
               <input type="text" v-model="userData.firstname" /><br>

               <label> Last Name </label>
               <input type="text" v-model="userData.lastname" /><br>

               <label> Phone </label>
               <input type="text" v-model="userData.username" /><br>

               <label> Email </label>
               <input type="email" v-model="userData.email" /><br>

               <label> Text area </label>
               <textarea v-model="userData.textarea"> </textarea>
               <button>Send</button>
            </form>
      </div>
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
               phone: '',
               email: '',
               textarea: ''
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
<style lang="scss">
   .contact-container {
         padding: 0 5rem 20px 5rem; 
   }

   .contact-container-header {
      margin: 35px 0px;
   }

   .contact-form {
      display:flex;
      flex-direction: column;
      max-width: 500px;

      input, textarea, button {
         font-family: "Gotham";
         border: none;
         background-color: #edeef2;
         padding: 10px;
      }

      input, button{
         height: 44px;
      }

      textarea{
         height: 160px;
      }

      button {
         margin-top: 15px;
         background-color: darken(#edeef2, 20%);
         font-weight: 500;
         font-size: 1rem;
         text-transform: uppercase;

         &:hover{
            background-color: darken(#edeef2, 40%)
         }
      }
   }
</style>