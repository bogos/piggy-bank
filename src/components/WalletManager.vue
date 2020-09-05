
<template>
    <div>
        <div class="wallet-container">
            <div class="wallet-welcome">
                <h1 class="title"> Hello {{ getAccount }}!</h1>
                <p class="sub-title"> Welcome to your cryptocurrency overview</p>
            </div>

            <div class="wallet-header">
                    <div class="sub-title">Create Wallet </div>
                    <button class="create-wallet-btn" @click="createWallet"> + </button>
            </div>

            <div class="card-container">
                <div 
                    v-for="wallet in getAllWallets" 
                    v-bind:key="wallet.id" 
                    :class="'card-item ' + 'card-color-'+removeZeroMod(wallet.id)"
                > 
                    <div :class="'card-eth-logo ' + 'bnt-color-'+removeZeroMod(wallet.id)">
                        <img src="../assets/images/ethereum.png"/>
                    </div>
                    <label class="card-description">Address</label>
                    <label class="card-address">{{ wallet.walletAddress }}</label>
                    <label class="card-description">Balance</label>
                    <label class="card-balance">ETH {{ wallet.balance }}</label>
                    <div class="card-buttons-container">
                        <button @click="openModal(wallet, wallet.id, getOperationType.DEPOSIT)" :class="'card-buttons ' + 'bnt-color-'+removeZeroMod(wallet.id)"> Deposit </button>
                        <button @click="openModal(wallet, wallet.id, getOperationType.WITHDRAW)" :class="'card-buttons ' + 'bnt-color-'+removeZeroMod(wallet.id)" > Withdraw </button>
                    </div>
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
            'createWallet'
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
        removeZeroMod(index) {
            const numCardColors = 4;
            return (((index + numCardColors - 1))  % numCardColors + 1);
        }
    },

    computed: {
        ...mapGetters([
            'getAccount',
            'getAllWallets',
            'getOperationType'
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
        padding: 0 5rem 20px 5rem;
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
        align-items: center;
        display: flex;
        margin: 40px 0;
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

    .card-color-1{
        background-color: $card-color-1;
    }

    .card-color-2{
        background-color: $card-color-2;
    }

    .card-color-3{
        background-color: $card-color-3;
    }

    .card-color-4{
        background-color: $card-color-4;
    }

    .bnt-color-1{
        background-color: $card-button-color-1;
        &:hover {
            background-color: darken($card-button-color-1, 20%)
        }
    }

    .bnt-color-2{
        background-color: $card-button-color-2;
        &:hover {
            background-color: darken($card-button-color-2, 20%)
        }
    }

    .bnt-color-3{
        background-color: $card-button-color-3;
        &:hover {
            background-color: darken($card-button-color-3, 20%)
        }
    }

    .bnt-color-4{
        background-color: $card-button-color-4;
        
        &:hover {
            background-color: darken($card-button-color-4, 20%)
        }
    }

    .card-item {
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

    @media (max-width: 500px) {
        .card-container {
            grid-template-columns: 1fr;
        }
    }

</style>