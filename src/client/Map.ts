import Atlas from "./layers/Atlas"
import ObjectGrid from "./layers/ObjectGrid"
import BackgroundLayer from "./layers/BackgroundLayer"
import ObjectLayer from "./layers/ObjectLayer"
import Collision from "./layers/Collision"
import Player from "./layers/Player"
import Interaction from "./layers/Interaction"
import { Socket } from "socket.io-client"
import OtherPlayer from "./layers/OtherPlayer"
import OtherPlayersLayer from "./layers/OtherPlayersLayer"




type MapObject = {
    id: number,
    x: number,
    y: number
}

type ColliderObject = {
    x: number,
    y: number,
}

type InteractionObject = {
    x:number,
    y:number,
    info:string,
    type:string
}

interface PlayersCords {
    [id: number]: Array<number>
}


export default class Map{
    private id:number
    private ctx:CanvasRenderingContext2D
    private backgroundLayer:BackgroundLayer
    private objectLayer:ObjectLayer;
    private blockSize:number = 32
    private localPlayer:Player
    private collisions:Array<Collision> = []
    private interactions:Array<Interaction> = []
    private socket:Socket
    private otherPlayersLayer:OtherPlayersLayer
    //private otherPlayer:OtherPlayer
    //private activePlayersId:Array<number> = [0, 1]
    //private playersCords:Array<Array<number>> = [[480, 480], [432, 336]] // NOTE must be stored in db in key-value pair
    private playersCords:PlayersCords = {}
    // NOTE
    // ONE BLOCK = 48
    // BECAUSE OF SCALE x1.5

    constructor(_ctx:CanvasRenderingContext2D, _id:number, _atlas:Atlas, _bgLayerBlockId:number, _objs:Array<MapObject>, _collisions:Array<ColliderObject>, _interactions:Array<InteractionObject>, _socket:Socket, _playersCords:PlayersCords){
        this.ctx = _ctx
        this.id = _id

        this.playersCords = _playersCords
        
        this.backgroundLayer = new BackgroundLayer(_ctx, _atlas, _bgLayerBlockId)
 
        this.objectLayer = new ObjectLayer(_ctx, _atlas, this.createGrid(_objs))

        this.objectLayer.loadObjects() // loading objects which are stored in grid

        this.socket = _socket // reference to socket
        
        this.otherPlayersLayer = this.createOtherPlayersLayer() // creating other players layer

        //console.log(_playersCords)

        this.localPlayer = this.createPlayer()
        this.loadPlayerSkin()
        this.addCollision(_collisions)
        this.addInteractions(_interactions)

        this.updateOtherPlayersPositions()
        this.updateOtherPlayersPresenece()
        
    
        
    }

    private createGrid(_objs:Array<MapObject>):ObjectGrid{
        const grid = new ObjectGrid()
        _objs.forEach(_obj => {
            grid.addObject(_obj.id, _obj.x, _obj.y)
        })
        return grid
    }

    private addCollision(_collisions:Array<ColliderObject>):void{
        _collisions.forEach(_collBlock => {
            this.collisions.push(new Collision(this, _collBlock.x, _collBlock.y, this.blockSize, this.blockSize))
        })
    }

    private addInteractions(_interactions:Array<InteractionObject>):void{
        _interactions.forEach(_intrBlock => {
            this.interactions.push(new Interaction(this.localPlayer, _intrBlock.x, _intrBlock.y, _intrBlock.info, _intrBlock.type))
        })
    }

    private createPlayer():Player {

        const id:number = window.userId as number

        const x:number = this.playersCords[id][1] * 1.5 // because of scale ;))
        const y:number = this.playersCords[id][2] * 1.5
        
        // PLAYERS CORDS
        // console.log(x, y)

        const player1 = new Player(this.ctx, x, y, this)


        this.applyOffset(-(480-x)/1.5, -(480-y)/1.5) //omg this is epic

        const playerImg:HTMLImageElement = new Image();
        playerImg.src = process.env.ASSETS_URL + 'spritesheets/default.png';    

        playerImg.onload = () => {
            player1.loadSpritesheet(playerImg)
        }
       
        return player1
        
    }

    private async loadPlayerSkin():Promise<void>{

        const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/'
        const serverResponse = await fetch('/contractdata?id='+window.userId)
        const serverResponseJson = await serverResponse.json()

        if(serverResponseJson.cid !== 'err'){
            const ipfsMetadata = await fetch(ipfsGateway + serverResponseJson.cid)
            const ipfsMetadataJson = await ipfsMetadata.json()

            console.log(ipfsMetadataJson)
        
            const playerImg:HTMLImageElement = new Image();
            playerImg.src = ipfsGateway + ipfsMetadataJson.imgCid

            playerImg.onload = () => {
                this.localPlayer.loadSpritesheet(playerImg)
            }
        }

        


    }

    private applyOffset(_x:number, _y:number):void{
        this.otherPlayersLayer.colMoveX(_x)
        this.backgroundLayer.colMoveX(_x)
        this.objectLayer.colMoveX(_x)  

        this.otherPlayersLayer.colMoveY(_y)
        this.backgroundLayer.colMoveY(_y)
        this.objectLayer.colMoveY(_y)  
    }

    private createOtherPlayersLayer():OtherPlayersLayer{

        const otherPlayersLayer = new OtherPlayersLayer(this.ctx)

        const ids = Object.keys(this.playersCords)
       
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i] as unknown
            if(ids[i] != window.userId) otherPlayersLayer.createPlayer(id as any, this.playersCords[id as any])
            
        }

        return otherPlayersLayer

    }

    private updateOtherPlayersPositions():void{
        this.socket.on("map" + this.id + "recv", data => {
            if(data.id !== window.userId){
                this.otherPlayersLayer.movePlayer(data)
            }
        })
    }

    public turnOffListeners():void{
        this.socket.off("changeMap")
        this.socket.off("map" + this.id + "recv")
    }

    private updateOtherPlayersPresenece():void{

        this.socket.on("changeMap", async(data) => {
          
            // changemap socket data
            // console.log(data)
            if(data.who !== window.userId){
                if(data.from == this.id){
                    this.otherPlayersLayer.deletePlayer(data.who)
                    delete this.playersCords[data.who]
                }

                if(data.to == this.id){
                    // console.log('not returned ;(')
                        const response = await fetch(process.env.GENERAL_URL + 'mapdata?id='+ this.id)
                        const playersOnMap = await response.json()
                        this.playersCords[data.who] = playersOnMap[data.who]
                        //console.log(playersOnMap[data.who])
                    this.otherPlayersLayer.createPlayer(data.who, this.playersCords[data.who])
                    
                }


            }

            

        })
    }

    public updateLayersPosition(mvUp:boolean, mvDown:boolean, mvRight:boolean, mvLeft:boolean):void{
        this.backgroundLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft)
        this.objectLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft)
        this.otherPlayersLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft)
    }

    public getColliders():Array<Collision>{
        return this.collisions
    }

    public getInteractions():Array<Interaction>{
        return this.interactions
    }

    public getSocket():Socket{
        return this.socket
    }

    public getOtherPlayersLayer():OtherPlayersLayer{
        return this.otherPlayersLayer
    }

    public draw(){
        this.backgroundLayer.draw()
        this.objectLayer.draw()
        // this.otherPlayer.draw() // to remove soon
        this.otherPlayersLayer.draw()
        this.localPlayer.draw()
    }

    public colMoveX(_speedX:number){
        this.localPlayer.colMoveX(_speedX)
        this.otherPlayersLayer.colMoveX(_speedX)
        this.backgroundLayer.colMoveX(_speedX)
        this.objectLayer.colMoveX(_speedX)    
    }

    public colMoveY(_speedY:number){
        this.localPlayer.colMoveY(_speedY)
        this.otherPlayersLayer.colMoveY(_speedY)
        this.backgroundLayer.colMoveY(_speedY)
        this.objectLayer.colMoveY(_speedY)    
    }
    public deleteObject(_x:number,_y:number){
        this.objectLayer.deleteObject(_x,_y)
    }

    public getId():number{
        return this.id
    }

    public getLocalPlayer():Player{
        return this.localPlayer
    }


}