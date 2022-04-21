export default class Chat {
    public chat:boolean = false

    // constructor(){
    // }

    public isChat():boolean{
        this.chat = !this.chat
        return this.chat
    }
    public hideChat(){
        const chatWindow = document.getElementById("chat")
        chatWindow!.style.visibility= "hidden"
    }
    public showChat(){
        const chatWindow = document.getElementById("chat")
        chatWindow!.style.visibility= "visible"
    }

    // public chatToggle():void{
    //     const chatWindow = document.getElementById("chat")
    //     if (this.chat == true) {
    //         this.showChat()
    //     } else {
    //         this.hideChat()
    //     }
    // }

}