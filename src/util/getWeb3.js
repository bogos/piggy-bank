import Web3 from 'web3';

let getWeb3 = () => {

    // // Injected Provider 
    // if(window.web3 !== 'undefined') {
    //     var web3 = new Web3(window.web3.currentProvider);
    //     console.log(web3);
    //     return web3;
    // } else {
    //     return (new Error('Unable to connect to Metamask'));
    // }
}


export default getWeb3;