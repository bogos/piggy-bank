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
        account: "",
        contract: {},
        deployedContractAddress: "0xf986f5bE8c5782cf29243329208372a2aa196e5C",
        isOpenModal: false,
        numberWallets: 0,
        
        wallets: [],
        web3: {},
        walletInfo: {
            id: 0,
            walletAddress: "",
            typeOperation: 0
        }
    },

    getters:{
        getAccount: (state) => {
            return state.account[0];
        },
        
        getAllWallets: (state) => {
            return state.wallets;
        },

        getOperationType: () => {
            return {
                DEPOSIT: 1,
                WITHDRAW: 2
            };
        },
    },

    actions: {

        async setWeb3({ commit }) {
        
            let web3;
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
                let enabled = await window.ethereum.enable();
                console.log(enabled);
                
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
                
                let id = i;
                let walletAddressFunc = state.contract.methods.wallets(state.account[0], i).call();            
                let balanceFunc = state.contract.methods.balanceWallet(i).call();

                const [walletAddress, balance] = await Promise.all([walletAddressFunc, balanceFunc]);

                let walletData = {
                    id,
                    walletAddress,
                    balance: state.web3.utils.fromWei(`${balance}`, "ether")
                };

                wallets.push(walletData)
            }
            console.log("SET_WALLETS", wallets);
            commit("SET_WALLETS", wallets);
        },

        async createWallet({ commit, state }) {

            try {
                let wallet = await state.contract.methods.createPiggyWallet().send({from: state.account[0]})
                .on('receipt', (receipt) => {
                        const walletInfo = {
                            walletAddress: receipt.events.WalletCreated.returnValues._address,
                            id: this.state.wallets.length + 1,
                            balance: 0,
                        }
                        commit("CREATE_WALLET", walletInfo);
                    }
                );
                
                console.log("CREATE_WALLET", wallet);
            } catch {
                alert("Failed creating wallet");
            }
        },

        async depositEthers({ state, dispatch}, payload) {
            
            try {
                const {to, value} = payload;
                let contractAddress = await new state.web3.eth.Contract(PiggyWalletABI, to.walletAddress);
                let weiValue = state.web3.utils.toWei(`${value}`, "ether");
                let receipt = await contractAddress.methods.deposit().send({from: state.account[0], value: weiValue});
                dispatch('setAllWallets');
                console.log("DEPOSIT_ETHERS", receipt);
            } catch (err) {
                console.log(err);
            }
        },

        async withdrawEthers({ state, dispatch }, payload) {
            try {
                
                const {walletAddress, value} = payload;
                let contractAddress = await new state.web3.eth.Contract(PiggyWalletABI, walletAddress);
                let weiValue = state.web3.utils.toWei(`${value}`, "ether");
                let receipt = await contractAddress.methods.sendEther(state.account[0], weiValue).send({from: state.account[0]});
                dispatch('setAllWallets');
                console.log("WITHDRAW_ETHERS", receipt);
            } catch (err) {
                console.log(err);
            }
        },

        // TODO: Separate methods by use
        openModal({ commit }) {
            commit("OPEN_MODAL");
        },

        closeModal({ commit }) {
            commit("CLOSE_MODAL");
        },

        setWalletAddress({ commit }, payload) {
            commit("SET_WALLET_ADDRESS", payload);
        },

        setTypeModal({ commit }, payload) {
            commit("SET_TYPE_MODAL", payload);
        },

        setWalletInfo({ commit }, payload){
            commit("SET_WALLET_INFO", payload);
        }

    },

    mutations: {
        SET_WEB3: (state, web3) => (state.web3 = web3),
        SET_CONTRACT_METHOD: (state, contract) => (state.contract = contract),
        SET_ACCOUNT: (state, account) => (state.account = account),
        SET_WALLETS: (state, wallets) => (state.wallets = wallets),
        SET_NUMBER_WALLETS: (state, numberWallets) => (state.numberWallets = numberWallets),
        CREATE_WALLET: (state, wallet) => (state.wallets.unshift(wallet)),
        SET_WALLET_INFO: (state, walletInfo) => (state.walletInfo = walletInfo),

        OPEN_MODAL: (state) => (state.isOpenModal = true),
        CLOSE_MODAL: (state) => (state.isOpenModal = false),
        SET_TYPE_MODAL: (state, payload) => (state.typeModal = payload),

        SET_WALLET_ADDRESS: (state, walletAddress) => (state.selectedWalletAddres = walletAddress)
    },
});