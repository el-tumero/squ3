// @ts-ignore
import Web3 from 'web3/dist/web3.min.js'
import Contract from '../../../contracts/artifacts/Squ3SkinsABI.json'

declare global {
  interface Window {
      ethereum:any,
  }
}

const {ethereum} = window

export default class Web3Instance{

  web3:Web3
  networkId:number = 0
  nftTextureContract:any
  myAddress:string | null = ''

  public get(){
    return this.web3
  }
  

  public async connectWallet(){
    if(ethereum){
      this.web3 = new Web3(ethereum)
      try{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.myAddress = accounts[0]
        this.networkId = await this.web3.eth.net.getId()
        document.getElementById('disconnect')?.classList.remove('hidden');
        document.getElementById('playbutton')?.classList.remove('hidden');
        this.showAddress(this.myAddress)
        console.log(accounts)
      } catch (error:any) {
        if (error.code === 4001) {
          console.log("User rejected request")
        }
      }
    }
  }

  public async disconnectWallet(){
    if(ethereum){
      try{
        console.log("disconnected!")
        document.getElementById('disconnect')?.classList.add('hidden');
      } catch (error){
        console.log(error)
      }
    }
  }

  public async showAddress(myAddress:string | null){
    const Address_textfield:  HTMLElement | null = document.querySelector("#connected_address");
    if (Address_textfield != null){
      Address_textfield.innerText = `Connected as: ${myAddress}`;
    }
  }


  public async createContractInterface(){
    const abi = Contract
    const contact_address = "0x425493f30662deB8722ca13DBf265E9a9cfC2CC2"
    this.nftTextureContract = new this.web3.eth.Contract(abi, contact_address)

    this.retrieveTokenURI()
  }

  public async mint(_url:string){
    console.log(_url)
    console.log(this.myAddress)
    this.nftTextureContract.methods.createCollectible(_url).send({from: this.myAddress, value:0})
  }

  public getMyAddress():string{
    return this.myAddress as string
  }

  public async retrieveTokenURI(){
    // const ownedTokenId = await this.nftTextureContract.methods.tokenOfOwnerByIndex(this.myAddress, 3).call()

    // const tokenURI = await this.nftTextureContract.methods.tokenURI(ownedTokenId).call()

    // let image = document.createElement('img')
    // image.src = tokenURI;

    // document.getElementById('page_content')?.appendChild(image);
    // image.style.transform = `scale(0.1)`
    

    // const response = await this.nftTextureContract.methods.tokenURI(2).call()
    // console.log(tokenURI)



  }


}





//const bsctestnetUrl:string = "https://data-seed-prebsc-1-s1.binance.org:8545"



