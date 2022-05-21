import Web3Instance from "./Web3Instance";


let web3i:Web3Instance;

document.getElementById('connectWalletBtn')?.addEventListener('click', e => {
    web3i = new Web3Instance();
    web3i.connectWallet();
})

document.getElementById('checkSession')?.addEventListener('click', async (e:Event) => {
    const res = await fetch(process.env.GENERAL_URL + "getid")
    const resJson = await res.json()
    console.log(resJson)
})

document.getElementById('logoutBtn')?.addEventListener('click', async (e:Event) => {
    const res = await fetch(process.env.GENERAL_URL + "logout")
    const resJson = await res.json()
    console.log(resJson)
})

document.getElementById('play')?.addEventListener('click', async (e:Event) => {

    const res = await fetch(process.env.GENERAL_URL + "authphrase")
    const resJson = await res.json()
    const signature:string = await web3i.get().eth.personal.sign(resJson.hashedPhrase, web3i.getMyAddress())

    // console.log(signature)
    
    const resToken = await fetch(process.env.GENERAL_URL + "auth", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({public_key: web3i.getMyAddress(), signature: signature})
    })

    const token = await resToken.json()


    console.log(token)
})
