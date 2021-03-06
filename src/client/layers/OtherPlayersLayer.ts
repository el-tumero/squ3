import TextureLayer from "./TextureLayer";
import OtherPlayer from "./OtherPlayer";

interface ActivePlayers {
    [key: string]: OtherPlayer
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

    public createPlayer(_id:string, _cords:Array<number>):void{
        //console.log(_id, _cords)
        
        const otherPlayer = new OtherPlayer(this.ctx, _cords[1] * 1.5, _cords[2] * 1.5)
        this.activePlayers[_id] = otherPlayer

        const playerImg:HTMLImageElement = new Image();

        // request po skina

        playerImg.src = process.env.ASSETS_URL + 'spritesheets/default.png';    

        playerImg.onload = () => {
            otherPlayer.loadSpritesheet(playerImg)
        }

        this.loadPlayerSkin(otherPlayer, _id)
    }

    private async loadPlayerSkin(_player:OtherPlayer, _id:string):Promise<void>{

        const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/'
        const serverResponse = await fetch('/contractdata?id='+_id)
        const serverResponseJson = await serverResponse.json()

        if(serverResponseJson.cid !== 'err'){
            const ipfsMetadata = await fetch(ipfsGateway + serverResponseJson.cid)
            const ipfsMetadataJson = await ipfsMetadata.json()

            console.log(ipfsMetadataJson)
        
            const playerImg:HTMLImageElement = new Image();
            playerImg.src = ipfsGateway + ipfsMetadataJson.imgCid

            playerImg.onload = () => {
                _player.loadSpritesheet(playerImg)
            }
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