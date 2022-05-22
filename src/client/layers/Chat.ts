import { Socket } from "socket.io-client"

type Message = {
    id: string
    content: string
}

export default class Chat {
    public chat:boolean = false

    private socket:Socket
    private mapId:number
    private playerId = window.userId
    private state:string

    constructor(_socket:Socket, _mapId:number){
        this.socket = _socket
        this.mapId =_mapId
        this.state = "hidden"
        //console.log(this.mapId)

        this.sendMessages()
        this.receiveMessages()
    }

    public isChat():boolean{
        this.chat = !this.chat
        return this.chat
    }
    public hideChat(){
        const chatWindow = document.getElementById("chat")
        chatWindow!.style.visibility= "hidden"
        
    }
    public async showChat(){
        setTimeout(() => {
            const chatWindow = document.getElementById("chat")
        chatWindow!.style.visibility= "visible"
        this.state = "visible"
        const msgInput:HTMLInputElement = document.getElementById("msgInput") as unknown as HTMLInputElement
        msgInput.focus()
        }, 100)
        
        // msgInput.value = "123"
    }

 
    private receiveMessages():void{
        this.socket.on("chat", (msg:Message) => {

            const para = document.createElement('p')

            // console.log(msg.id.length)

            const id = msg.id.slice(0,5) + "..." + msg.id.slice(37,42) 

            const node = document.createTextNode(id + ":   " + msg.content)
            para.appendChild(node)

            document.getElementById("chatOutputPanel")?.appendChild(para)
            // console.log(msg)
        })
    }

    private sendEvent():void{
        if(this.state === 'visible'){
            const msgInput:HTMLInputElement = document.getElementById("msgInput") as unknown as HTMLInputElement
            const msgCtn:Message = {id: this.playerId, content: msgInput.value}
            this.socket.emit("chat", msgCtn)
            msgInput.value = ""
        }
    }

    private sendMessages():void{

            document.getElementById("btnSend")?.addEventListener("click", (e:Event) => {
                this.sendEvent()
            })
    
            document.addEventListener('keydown', (e:KeyboardEvent) => {
                if(e.key === "Enter"){
                    this.sendEvent()
                }
            })
    }



    


}