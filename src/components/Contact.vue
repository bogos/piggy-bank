<template>
  <div class="container">
     <div class="contact-container">
        <div class="contact-container-header">
            <h1 class="title">Contact Us!</h1>
               <p class="sub-title"> Leave us your questions </p>
         </div>
         <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="sendEmail" class="contact-form">
               
               <label> First Name </label>
               <ValidationProvider name="First Name" rules="required|alpha" v-slot="{ errors }">
                  <input type="text" v-model="userData.firstname" /><br>
                  <span class="error">{{ errors[0] }}</span>
               </ValidationProvider>


               <label> Last Name </label>
               <ValidationProvider name="Last Name" rules="required|alpha" v-slot="{ errors }">
                  <input type="text" v-model="userData.lastname" /><br>
                  <span class="error">{{ errors[0] }}</span>
               </ValidationProvider>


               <label> Phone </label>
               <ValidationProvider name="Phone" rules="required|numeric" v-slot="{ errors }">
                  <input type="text" v-model="userData.phone" /><br>
                    <span class="error">{{ errors[0] }}</span>
               </ValidationProvider>


               <label> Email </label>
               <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                  <input type="email" v-model="userData.email" /><br>
                     <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>

               <label> Text area </label>
               <ValidationProvider name="Text area" rules="required|alpha_num" v-slot="{ errors }">
                  <textarea v-model="userData.textarea"> </textarea>
                  <span class="error">{{ errors[0] }}</span>
               </ValidationProvider>

               <button type="submit" :disabled="invalid">Send</button>
            </form>
         </ValidationObserver>

      </div>
   </div>
</template>

<script>
import axios from 'axios';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
    name: 'contact',

    data(){
         return{
            userData: {
               firstname: '',
               lastname: '',
               phone: '',
               email: '',
               textarea: '',
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
    },
    components: {
           ValidationProvider,
           ValidationObserver
    }
}
</script>
<style lang="scss">
   span {
      display: block;
   }

   .error {
      color: red;
      font-size: 14px;
   }
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

      label{
         font-weight: 300;
         font-size: 18px;
         margin-top: 20px;
      }

      input, textarea, button {
         width: 100%;
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

         &:hover:not([disabled="disabled"]){
            background-color: darken(#edeef2, 40%)
         }
      }
   }
</style>