import Web3Instance from "./Web3Instance";


let web3i:Web3Instance;

document.getElementById('connectWalletBtn')?.addEventListener('click', e => {
    web3i = new Web3Instance();
    web3i.connectWallet();
})

document.getElementById('play')?.addEventListener('click', e => {
    web3i.get().eth.personal.sign("123", web3i.getMyAddress())
})
