import TextureLayer from "./TextureLayer";
import OtherPlayer from "./OtherPlayer";
import { Socket } from "socket.io-client";

interface PlayersId {
    [key: number]: OtherPlayer
}

export default class OtherPlayersLayer extends TextureLayer{

    private socket:Socket

    private activePlayers:PlayersId = {}

    constructor(_domCtx: CanvasRenderingContext2D, _socket: Socket){
        super(_domCtx)
        this.socket = _socket
        this.canvas.width = 1920
        this.canvas.height = 1920
        this.movePlayers()
    }


    private movePlayers():void{
        this.socket.on("moveOther", data => {
            if(data.id !== window.userId){
                this.activePlayers[data.id].dataFromSocket(data)
            }
        })
    }


    public createPlayer(_id:number, _cords:Array<number>){
        //console.log(_id, _cords)
        
        const otherPlayer = new OtherPlayer(this.ctx, _cords[0], _cords[1])
        this.activePlayers[_id] = otherPlayer

        const playerImg:HTMLImageElement = new Image();
        playerImg.src = process.env.ASSETS_URL + 'spritesheets/player_spritesheet' + _id+ '.png';    

        playerImg.onload = () => {
            otherPlayer.loadSpritesheet(playerImg)
        }
    }


    public update(_frames:number):void{
        for(const id in this.activePlayers){
            this.activePlayers[id].update(_frames)
        }
    }


    public draw():void{

        for(const id in this.activePlayers){
            this.activePlayers[id].draw()
        }


        this.domCtx.drawImage(this.canvas, this.x, this.y)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    }

}