import TextureLayer from "./TextureLayer";
import OtherPlayer from "./OtherPlayer";

interface ActivePlayers {
    [key: number]: OtherPlayer
}

export default class OtherPlayersLayer extends TextureLayer{


    private activePlayers:ActivePlayers = {}

    constructor(_domCtx: CanvasRenderingContext2D){
        super(_domCtx)
        this.canvas.width = 1920
        this.canvas.height = 1920
    }

    public movePlayer(data:any):void{ 
        if(this.activePlayers[data.id] == null) return
        this.activePlayers[data.id].dataFromSocket(data)    
    }

    public deletePlayer(_id:number):void{
        delete this.activePlayers[_id]
    }

    public createPlayer(_id:number, _cords:Array<number>):void{
        //console.log(_id, _cords)
        
        const otherPlayer = new OtherPlayer(this.ctx, _cords[1], _cords[2])
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