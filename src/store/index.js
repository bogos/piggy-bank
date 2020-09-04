import Vue from 'vue';
import Vuex from 'vuex';
import Web3 from 'web3';
// import todos from './modules/todos.js';

// Import ABI
import PiggyManagerABI from '../contracts/abi/PiggyManager.json';
import PiggyWalletABI from '../contracts/abi/PiggyWallet.json';


// Load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    
    strict: false,
    state:{
        deployedContractAddress: "0x3c0BCcC1c37F6633D71379E6D18145F1aE5971e2",
        web3: {},
        contract: {},
        wallets: [],
        numberWallets: 0,
        account: "",
    },

    getters:{
        getAccount: (state) => {
            return state.account;
        },
        getAllWallets: (state) => {
            return state.wallets;
        },
    },

    actions: {

        async setWeb3({ commit }) {
        
            let web3;
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);

                let enabled = await window.ethereum.enable();
        
                console.log(enabled);
                console.log(web3);

                // Make a transaction
                // let response = await contract.methods.createPiggyWallet().send({from: enabled[0]});

                // Make a call in a contract
                // let response = await contract.methods.wallets(enabled[0], 0).call();

            } else if (window.web3) {
                web3 = new Web3(window.web3.currentProvider);
            } else {
                // TODO better handle of metamask
                window.alert(
                    'Non-Ethereum browser detected. You should consider trying MetaMask!',
                );
            }

            commit('SET_WEB3', web3);
        },

        async setContractMethod( {commit, state} ) {
            let contract = await new state.web3.eth.Contract(PiggyManagerABI, state.deployedContractAddress);
            console.log("SET_CONTRACT_METHOD", contract);
            commit('SET_CONTRACT_METHOD', contract);
        },

        async setAccount ({commit}) {
            
            let account;

            if(window.ethereum){
                account = await window.ethereum.enable();
            } else {
                window.alert(
                    'No Account detected.'
                );
            }
            console.log("SET_ACCOUNT", account)
            commit("SET_ACCOUNT", account)
        },

        async setNumberWallets({ commit, state }){

            let response = await state.contract.methods.getNumberWallets().call();            
            
            console.log("SET_NUMBER_WALLETS", response);
            commit("SET_NUMBER_WALLETS", response);
        },

        async setAllWallets ({ commit, state }) {

            let wallets = [];
            for(let i = 0; i < state.numberWallets; i++) {
                let response = await state.contract.methods.wallets(state.account[0], i).call();            
                wallets.push(response)
            }
            console.log("SET_WALLETS", wallets);
            commit("SET_WALLETS", wallets);
        },

        async createWallet({ commit, state }) {

            try {
                let wallet = await state.contract.methods.createPiggyWallet().send({from: state.account[0]})
                .on('receipt', (receipt) => {
                    let contractAddress = receipt.events.WalletCreated.returnValues._address;
                        commit("CREATE_WALLET", contractAddress);
                    }
                );
                
                console.log("CREATE_WALLET", wallet);
            } catch {
                alert("Failed creating wallet");
            }
        },

        async depositEthers({ state }, payload) {

            let contractAddress = await new state.web3.eth.Contract(PiggyWalletABI, payload);

            let value = state.web3.utils.toWei("0.05", "ether");
            
            let receipt = await contractAddress.methods.deposit().send({from: state.account[0], value});

            console.log("DEPOSIT_ETHERS", receipt);
        }
    },

    mutations: {
        SET_WEB3: (state, web3) => (state.web3 = web3),
        SET_CONTRACT_METHOD: (state, contract) => (state.contract = contract),
        SET_ACCOUNT: (state, account) => (state.account = account),
        SET_WALLETS: (state, wallets) => (state.wallets = wallets),
        SET_NUMBER_WALLETS: (state, numberWallets) => (state.numberWallets = numberWallets),
        CREATE_WALLET: (state, wallet) => (state.wallets.unshift(wallet)),
        DEPOSIT_ETHERS: (state, wallet) => (state.wallet = wallet),
    },
});