import { Socket } from "socket.io-client"

type Message = {
    id: number
    content: string
}

export default class Chat {
    public chat:boolean = false

    private socket:Socket
    private mapId:number
    private playerId = window.userId

    constructor(_socket:Socket, _mapId:number){
        this.socket = _socket
        this.mapId =_mapId
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
    public showChat(){
        const chatWindow = document.getElementById("chat")
        chatWindow!.style.visibility= "visible"
    }

    private receiveMessages():void{
        this.socket.on("map" + this.mapId + "chat", (msg:Message) => {

            const para = document.createElement('p')
            const node = document.createTextNode(msg.id + ":   " + msg.content)
            para.appendChild(node)

            document.getElementById("chatOutputPanel")?.appendChild(para)
            // console.log(msg)
        })
    }

    private sendMessages():void{
        document.getElementById("btnSend")?.addEventListener("click", (e:Event) => {
            const msgInput:HTMLInputElement = document.getElementById("msgInput") as HTMLInputElement
            const msgCtn:Message = {id: this.playerId, content: msgInput.value}
            console.log(msgCtn)
            this.socket.emit("map" + this.mapId + "chat", msgCtn)
        })
    }


}