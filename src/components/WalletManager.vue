
<template>
    <div class="wallet-container">

        <div class="wallet-welcome">
            <h1 class="title"> Hello {{ getAccount[0] }}!</h1>
            <p class="sub-title"> Welcome to your cryptocurrency overview</p>
        </div>

        <div class="wallet-header">
                <div class="sub-title">Create Wallet </div>
                <button class="create-wallet-btn" @click="createWallet"> + </button>
        </div>

        <div class="card-container">
            <div 
                v-for="(wallet, index) in getAllWallets" 
                v-bind:key="index" 
                class="card-item"
            > 
                <div class="card-eth-logo">
                    <img src="../assets/images/ethereum.png"/>
                </div>
                <div class="card-description">Address</div>
                <div class="card-address">{{ wallet }}</div>
                <div class="card-description">Balance</div>
                <div class="card-balance">$1000</div>
                <div class="card-buttons-container">
                    <!-- <input type=text /> -->
                    <button @click="depositEthers(wallet)" class="card-buttons"> Send to </button>
                    <button @click="depositEthers(wallet)" class="card-buttons"> Withdraw </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';

export default {
    name: "Enter",

    methods: {
        ...mapActions([
            'setWeb3', 
            'setContractMethod',
            'setAccount',
            'setNumberWallets',
            'setAllWallets',
            'createWallet'
        ]),

        depositEthers(e) {
            this.$store.dispatch("depositEthers", e);
        },
    },

    computed: {
        ...mapGetters([
            'getAccount',
            'getAllWallets',
        ]),
    },

    async created() {
        await this.setWeb3();
        await this.setContractMethod();
        await this.setAccount();
        await this.setNumberWallets();
        await this.setAllWallets();
    },
}
</script>

<style lang="scss">

    * {
        box-sizing: border-box;
    }

    $white-color: #ffffff;
    $card-color-1: #ff6f67;
    $card-color-2: #6d5ffd;
    $card-color-3: #ffd05d;
    $card-color-4: #60dfb2;
    $card-button-color-1:#ca4e45;
    $card-button-color-2: #4e41cc;
    $card-button-color-3: #f2b122;
    $card-button-color-4: #1cd389;
    
    .wallet-container {
        padding: 0 5rem;
    }
    
    .wallet-welcome {
        margin: 35px 0px;
    }

    .title {
        margin: 0px;
        font-weight: 400;
        font-size: 2rem;
    }
    
    .sub-title {
        margin: -5px 0px 0px 0px;
        font-weight: 300;
        font-size: 1.3rem;
        color: #787878;
    }

    .wallet-header {
        display: flex;
        align-items: center;
        margin: 40px 0;
    }

    .create-wallet-btn {
        cursor: pointer;
        border-radius: 100px;
        border: 0px;
        background-color: #e0e4e8;
        width: 50px;
        height: 50px;
        font-size: 2.5rem;
        margin-left: 15px;
        color: #a6acb6;

        &:hover{
            background-color: darken(#e0e4e8, 10%);
            color: darken(#a6acb6, 10%);
        }
    }

    .card-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2.6rem;
    }

    .card-item {
        background: $card-color-2;
        padding: 1.2rem;
        border-radius: 15px;
        color: $white-color;
        display:flex;
        flex-direction: column;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;

        &:hover{
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
        }
    }

    .card-eth-logo {
        align-items: center;
        background-color: $card-button-color-2;
        border-radius: 5px;
        display: flex;
        height: 45px;
        justify-content: center;
        position: relative;
        width: 45px;

        img {
            height: calc(100% - 17px);
            width: calc(100% - 30px);
        }
    }

    .card-description {
        font-size: 14px;
        font-weight: 300;
        margin: 25px 0px 5px 0px;
    }

    .card-address {
        font-size: 17px;
        font-weight: 400;
    }

    .card-balance {
        font-size: 32px;
        font-weight: 500;
    }

    .card-buttons-container{
        cursor: pointer;
        border: 0px;
        border-width: 0px;
        display: flex;
        justify-content: flex-end;
        margin-top: -15px;
    }

    .card-buttons {
        min-width: 100px;
        border-style: none;
        font-family: "Gotham", sans-serif;
        font-weight: 300;
        color: $white-color;
        background-color: $card-button-color-2;
        border-radius: 6px;
        font-size: 14px;
        padding: 12px;
        margin-bottom: 7px;
    
        &:hover {
            background-color: darken($card-button-color-2, 20%)
        }

        
        &:last-child {
         margin-left:10px   
        }
    }

    @media (max-width: 500px) {
        .card-container {
            grid-template-columns: 1fr;
        }
    }

</style>