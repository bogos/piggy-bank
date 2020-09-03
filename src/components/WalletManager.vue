
<template>
    <div>
        <div> Account: {{ getAccount[0] }} </div>

        <button @click="createWallet">Create </button>

        <div class="wallet-container">
            <div v-for="(wallet, index) in getAllWallets" v-bind:key="index" class="wallet-item"> 
                <div>Address: {{ wallet }}</div>
                <div>Balance: 0</div>
                <input type=text />
                <button @click="depositEthers(wallet)"> Send To Other </button>
                <button @click="depositEthers(wallet)"> Withdraw </button>
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

<style sc>

    .wallet-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .wallet-item {
        border: 1px solid #ccc;
        background: white;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }

    @media (max-width: 500px) {
        .wallet-container {
            grid-template-columns: 1fr;
        }
    }

</style>