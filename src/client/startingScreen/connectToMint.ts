// @ts-ignore
import Web3 from 'web3/dist/web3.min.js'
import Web3Instance from "./connectWallet"

declare global{
    interface EventTarget {
        files:Array<File>
    }
}
interface formRequest {
    name?: string;
    creator: string
    base64?: string;
}

let formInp : formRequest = JSON.parse('{ "name": "", "base64": "" }');

const web3instance:Web3Instance = new Web3Instance()
let web3:Web3;


const connectButton: HTMLElement | null = document.querySelector("#connect")

const disconnectButton: HTMLElement | null = document.querySelector("#disconnect")

const submit: HTMLElement | null = document.querySelector("#submit")


const texturename: HTMLElement | null = document.querySelector("#txtName")

const result: HTMLElement | null = document.querySelector("#result")

const inputHandler = function(e:any) {
    // display current txtname in div
    // result!.innerText = e.target.value;
    formInp.name = e.target.value
    // display current name (last keyboard input)
    console.log(formInp.name)
  }
  
  texturename?.addEventListener('input', inputHandler);

disconnectButton?.addEventListener("click", async(e) => {
    window.location.reload();
})




submit?.addEventListener("click", async(e) => {
    e.preventDefault()
    console.log(formInp)

    

    const imgSize = (formInp.base64!.length * (3/4)) - 2

    if(web3instance.myAddress){

        formInp.creator = web3instance.getMyAddress()

        if(imgSize < 20000){
        const rawRes = await fetch('http://localhost:3000/mint', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formInp)
        })

        const json = await rawRes.json()
        console.log(json)
        
        web3instance.mint(json.response)


    }else{
        console.log("Connect wallet!")
    }
    }



})


connectButton?.addEventListener("click", async(e) => {
    await web3instance.connectWallet()
    web3 = web3instance.get()
    web3instance.createContractInterface()


    

    // web3instance.retrieveTokenURI()

    // web3instance.receiveFromTestContract()

    // const balance = await web3.eth.getBalance('0x1Fb0d6ecb9709b539013C05B6C96201501eE68df')
    // console.log(balance)

})

document.getElementById("photo")!.onchange= function(e: Event) {
    const file:File = event?.target?.files[0] as File

    const previewImg:HTMLImageElement = document.getElementById('output') as HTMLImageElement 

    previewImg.src = window.URL.createObjectURL(file)
    
    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = function(evt:any){
        // console.log(evt.target?.result)
        formInp.base64 = evt.target?.result
    }
   
}