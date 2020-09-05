
<template>
    <div>
        <div class="wallet-container">
            <div class="wallet-welcome">
                <h1 class="title"> Hello {{ getAccount }}!</h1>
                <p class="sub-title"> Welcome to your cryptocurrency overview</p>
            </div>

            <div class="wallet-header">
                    <div class="wallet-header-info rigth-separator"> Balance: <span class="balance"> ETH {{ this.$store.state.allBalance }} </span> </div>
                    <div class="wallet-header-info">Add Wallet 
                        <button class="create-wallet-btn" @click="createWallet"> + </button>
                    </div>
            </div>
            <div v-if="getIsLoading" class="loading-img"><img src="../assets/images/loading.svg"/></div>

            <div class="card-container">
                <div 
                    v-for="wallet in getAllWallets" 
                    v-bind:key="wallet.id" 
                    :class="'card-item ' + 'card-color-'+calculateMODColors(wallet.id)"
                > 
                    <div :class="'card-eth-logo ' + 'bnt-color-'+calculateMODColors(wallet.id)">
                        <img src="../assets/images/ethereum.png"/>
                    </div>
                    <label class="card-description">Address</label>
                    <label class="card-address">{{ wallet.walletAddress }}</label>
                    <label class="card-description">Balance</label>
                    <label class="card-balance">ETH {{ wallet.balance }}</label>
                    <div class="card-buttons-container">
                        <button @click="openModal(wallet, wallet.id, getOperationType.DEPOSIT)" :class="'card-buttons ' + 'bnt-color-'+calculateMODColors(wallet.id)"> Deposit </button>
                        <button @click="openModal(wallet, wallet.id, getOperationType.WITHDRAW)" :class="'card-buttons ' + 'bnt-color-'+calculateMODColors(wallet.id)" > Withdraw </button>
                    </div>
                    <div v-if="getIsLoading" class="loading"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';

export default {
    name: "Enter",
    components: {
    },

    methods: {
        ...mapActions([
            'setWeb3', 
            'setContractMethod',
            'setAccount',
            'setNumberWallets',
            'setAllWallets',
            'createWallet',
            'setAllBalance'
        ]),

        openModal(wallet, index, type) {

            const payload = {
                id: index,
                walletAddress: wallet,
                typeOperation: type
            };

            console.log("MODAL", payload);
            this.$store.dispatch("openModal");
            this.$store.dispatch("setWalletInfo", payload);
        },
        
        // Remove, use Id from card to evaluate the color or consider select and save a card color.
        calculateMODColors(index) {
            const numCardColors = 4;
            return (index % numCardColors);
        }
    },

    computed: {
        ...mapGetters([
            'getAccount',
            'getAllWallets',
            'getOperationType',
            'getIsLoading'
        ]),
    },

    async created() {
        await this.setWeb3();
        await this.setContractMethod();
        await this.setAccount();
        await this.setNumberWallets();
        await this.setAllWallets();
        await this.setAllBalance();
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
        padding: 0 1rem 20px 1rem;
    }
    
    .wallet-welcome {
        margin: 35px 0px;
    }

    .title {
        font-size: 2rem;
        font-weight: 400;
        margin: 0px;
    }
    
    .sub-title {
        color: #787878;
        font-size: 1.3rem;
        font-weight: 300;
        margin: -5px 0px 0px 0px;
    }

    .wallet-header {
        display: flex;
        flex-direction: row;
        margin: 40px 0;
        align-items: center;
    }

    .wallet-header-info {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #787878;
        font-size: 1.3rem;
        font-weight: 300;
    }

    .balance {
        display: inline;
        font-size: 32px;
        margin-left: 15px;
        font-weight: 500;
    }

    .rigth-separator {
        margin-right: 30px;
        border-right: 2px solid #e0e4e8;
        padding-right: 30px;
    }


    .create-wallet-btn {
        cursor: pointer;
        background-color: #e0e4e8;
        border-radius: 100px;
        border: 0px;
        color: #a6acb6;
        height: 50px;
        font-size: 2.5rem;
        margin-left: 15px;
        width: 50px;

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

    .card-color-0{
        background-color: $card-color-1;
    }

    .card-color-1{
        background-color: $card-color-2;
    }

    .card-color-2{
        background-color: $card-color-3;
    }

    .card-color-3{
        background-color: $card-color-4;
    }

    .bnt-color-0{
        background-color: $card-button-color-1;
        &:hover {
            background-color: darken($card-button-color-1, 20%)
        }
    }

    .bnt-color-1{
        background-color: $card-button-color-2;
        &:hover {
            background-color: darken($card-button-color-2, 20%)
        }
    }

    .bnt-color-2{
        background-color: $card-button-color-3;
        &:hover {
            background-color: darken($card-button-color-3, 20%)
        }
    }

    .bnt-color-3{
        background-color: $card-button-color-4;
        
        &:hover {
            background-color: darken($card-button-color-4, 20%)
        }
    }

    .card-item {
        padding: 1.2rem;
        border-radius: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        color: $white-color;
        display:flex;
        flex-direction: column;
        position: relative;
        transition: 0.3s;

        &:hover{
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
        }
    }

    .card-eth-logo {
        align-items: center;
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
        font-size: 18px;
        font-weight: 300;
        margin: 25px 0px 5px 0px;
    }

    .card-address {
        font-size: 19px;
        font-weight: 400;
    }

    .card-balance {
        font-size: 32px;
        font-weight: 500;
    }

    .card-buttons-container{
        border: 0px;
        border-width: 0px;
        display: flex;
        justify-content: flex-end;
        margin-top: -15px;
    }

    .card-buttons {
        cursor: pointer;
        min-width: 100px;
        border-style: none;
        font-family: "Gotham", sans-serif;
        font-weight: 300;
        color: $white-color;
        border-radius: 6px;
        font-size: 14px;
        padding: 12px;
        margin-bottom: 7px;
        
        &:last-child {
         margin-left:10px   
        }
    }

    .loading-img {
        width: 100%;
        text-align: center;
        margin-bottom: 30px;

        img {
            width: 4rem;
            animation:spin 4s linear infinite;
        }
    }

    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }



    .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.2;
        left: 0;
        top: 0;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
    }

    @media (max-width: 500px) {
        .card-container {
            grid-template-columns: 1fr;
        }
    }

</style>