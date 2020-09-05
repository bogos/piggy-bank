<template>
    <div>
        <div class="modal-background"></div>
        <div class="modal-container">
            <div class="modal-card">

                <div v-if="this.$store.state.walletInfo.typeOperation == getOperationType.DEPOSIT"
                     class="modal-card-content">
                    <div class="close-btn" @click="closeModal"> X </div>

                    <h1 style="text-align:center"> Deposit in my Wallet </h1>
                    <label class="modal-card-description">Wallet Address</label>
                    <div class="modal-card-address"> {{ this.$store.state.walletInfo.walletAddress.walletAddress }}</div>

                    <label class="modal-card-description">Amount </label>
                    <input type="text" class="modal-card-input"  v-model.number="value" @keypress="onlyNumber"/>

                    <label v-if="errorInput" class="error-label">Please enter valid values</label>
                    
                    <button @click="depositEthers" class="modal-card-btn">Deposit</button>
                </div>

                <div v-if="this.$store.state.walletInfo.typeOperation == getOperationType.WITHDRAW" 
                    class="modal-card-content">
                   <div class="close-btn" @click="closeModal"> X </div>

                    <h1 style="text-align:center"> Withdraw from my Wallet </h1>
                    <label class="modal-card-description">My Address</label>
                    <div class="modal-card-address"> {{ getAccount }}</div>

                    <label class="modal-card-description">Amount </label>
                    <input type="text" class="modal-card-input"  v-model.number="value" @keypress="onlyNumber"/>

                    <label v-if="errorInput" class="error-label">Please enter valid values</label>
                    
                    <button @click="withDrawEthers" class="modal-card-btn">Withdraw</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "Modal",

    data() {
         return{
            value: '',
            successMessage: '',
            errorMessage: '',
            errorInput: false
         }
    },

    methods: {
        depositEthers() {
            if(isNaN(this.value)) {
                this.errorInput = true;
                return;
            } 

            const payload = {
                to: this.$store.state.walletInfo.walletAddress,
                value: this.value
            };

            this.$store.dispatch("depositEthers", payload);
            this.$store.dispatch("closeModal");
            this.error = false;
        },

        withDrawEthers() {

            var payload = {
                ...this.$store.state.walletInfo.walletAddress,
                value : this.value
            }

            this.$store.dispatch("withdrawEthers", payload);
            this.$store.dispatch("closeModal");
        },

        closeModal() {
            this.$store.dispatch("closeModal");
        },
        onlyNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                $event.preventDefault();
            }
        }
    },

    computed: {
        ...mapGetters(['getOperationType', 'getAccount'])
    }
}
</script>

<style lang="scss">

    $modal-background-color: #e0e4e8;
    .modal-background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: #000;
        opacity: 0.7;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: hidden;
    }

    .modal-container {
        display: flex;
        justify-items: center;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .modal-card {
        background-color: $modal-background-color;
        border-radius: 15px;
        min-width: 500px;
        position: relative;
        z-index: 4000;
    }

    .modal-card-content {
        padding: 30px;
        display: flex;
        flex-direction: column;
    }

    .modal-card-input {
        width: 100%;
        height: 44px;
    }

    .modal-card-description {
        font-size: 16px;
        font-weight: 400;
        margin: 25px 0px 5px 0px;

        &:first-child {
            margin: 0px;
        }
    }

    .modal-card-address {
        font-size: 17px;
        font-weight: 400;
    }

    .modal-card-balance {
        font-size: 32px;
        font-weight: 500;
    }

    .modal-card-btn {
        cursor: pointer;
        margin: 25px 0px 5px 0px;
        height: 44px;
        background-color: #4e41cc;
        border:none;
        color: white;
        text-transform: uppercase ;
    }

    .close-btn {
        cursor: pointer;
        position: absolute;
        right: 25px;
        font-size: 25px;
        top: 15px;
        font-weight: bold;
        border-radius: 50px;
        width: 43px;
        height: 43px;
        text-align: center;
        background-color: darken($modal-background-color, 20%);
        color: white;
        transition: 0.3s;

        &:hover{
            background-color: darken($modal-background-color, 40%);
        }
    }

    .error-label{
        text-align: center;
        color: red;
        font-weight: 300;
        font-size: 14px;
    }

</style>