import Atlas from "./layers/Atlas"
import ObjectGrid from "./layers/ObjectGrid"
import BackgroundLayer from "./layers/BackgroundLayer"
import ObjectLayer from "./layers/ObjectLayer"
import Collision from "./layers/Collision"
import Player from "./layers/Player"
import Interaction from "./layers/Interaction"
import { Socket } from "socket.io-client"
import OtherPlayer from "./layers/OtherPlayer"




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
    private otherPlayer:OtherPlayer
    private playersCords:Array<Array<number>> = [[464, 464], [320, 256]]

    constructor(_ctx:CanvasRenderingContext2D, _id:number, _atlas:Atlas, _bgLayerBlockId:number, _objs:Array<MapObject>, _collisions:Array<ColliderObject>, _interactions:Array<InteractionObject>, _socket:Socket){
        this.ctx = _ctx
        this.id = _id
        
        this.backgroundLayer = new BackgroundLayer(_ctx, _atlas, _bgLayerBlockId)
 
        this.objectLayer = new ObjectLayer(_ctx, _atlas, this.createGrid(_objs))

        
        

        this.objectLayer.loadObjects()

        this.socket = _socket
        //console.log(this.socket)


        this.otherPlayer = this.createOtherPlayers()

        this.localPlayer = this.createPlayer()
        this.addCollision(_collisions)
        this.addInteractions(_interactions)
        //console.log(this.localPlayer.interactions[0])

    
        
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

        const x:number = this.playersCords[id][0]
        const y:number = this.playersCords[id][1]

        const player1 = new Player(this.ctx, x, y, this)
        // const player1 = new Player(this.ctx, 480-(32/2), 480-(32/2), this)

        const playerImg:HTMLImageElement = new Image();
        playerImg.src = process.env.ASSETS_URL + 'spritesheets/player_spritesheet' + window.userId + '.png';    

        playerImg.onload = () => {
            player1.loadSpritesheet(playerImg)
        }
       
        return player1
        
    }

    private createOtherPlayers():OtherPlayer{

        const id:number = window.otherUserId as number

        const x = this.playersCords[id][0]
        const y = this.playersCords[id][1]

        // const cords:Array<number> = [playerCords[], playerCords] 


        // trzeba stworzyc warstwe nowych playerow
        const otherPlayer = new OtherPlayer(this.objectLayer.getCtx(), x, y, this)

        const playerImg:HTMLImageElement = new Image();
        playerImg.src = process.env.ASSETS_URL + 'spritesheets/player_spritesheet' + id+ '.png';    

        playerImg.onload = () => {
            this.otherPlayer.loadSpritesheet(playerImg)
        }

        return otherPlayer
    }


    public updateLayersPosition(mvUp:boolean, mvDown:boolean, mvRight:boolean, mvLeft:boolean):void{
        this.backgroundLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft)
        this.objectLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft)
        // megaTemp
        this.otherPlayer.update();
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

    public draw(){
        this.backgroundLayer.draw()
        this.objectLayer.draw()
        this.otherPlayer.draw()
        this.localPlayer.draw()
    }

    public colMoveX(_speedX:number){
        this.localPlayer.colMoveX(_speedX)
        this.backgroundLayer.colMoveX(_speedX)
        this.objectLayer.colMoveX(_speedX)    
    }

    public colMoveY(_speedY:number){
        this.localPlayer.colMoveY(_speedY)
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