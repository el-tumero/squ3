import Atlas from "./layers/Atlas"
import ObjectGrid from "./layers/ObjectGrid"
import BackgroundLayer from "./layers/BackgroundLayer"
import ObjectLayer from "./layers/ObjectLayer"
import Collision from "./layers/Collision"
import Player from "./layers/Player"
import Interaction from "./layers/Interaction"

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
    id:number
    // atlas:Atlas
    ctx:CanvasRenderingContext2D
    backgroundLayer:BackgroundLayer
    objectLayer:ObjectLayer
    blockSize:number = 32
    localPlayer:Player
    collisions:Array<Collision> = []
    interactions:Array<Interaction> = []


    constructor(_ctx:CanvasRenderingContext2D, _id:number, _atlas:Atlas, _bgLayerBlockId:number, _objs:Array<MapObject>, _collisions:Array<ColliderObject>, _interactions:Array<InteractionObject>){
        this.ctx = _ctx
        this.id = _id
        
        this.backgroundLayer = new BackgroundLayer(_ctx, _atlas, _bgLayerBlockId)
        this.objectLayer = new ObjectLayer(_ctx, _atlas)
        this.objectLayer.loadObjects(this.createGrid(_objs))
        

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
            this.collisions.push(new Collision(_collBlock.x, _collBlock.y, this.blockSize, this.blockSize))
        })
    }

    private addInteractions(_interactions:Array<InteractionObject>):void{
        _interactions.forEach(_intrBlock => {
            this.interactions.push(new Interaction(this.localPlayer, _intrBlock.x, _intrBlock.y, _intrBlock.info, _intrBlock.type))
        })
    }

    private createPlayer():Player {
        const player1 = new Player(this.ctx, 480-(32/2), 480-(32/2), this.backgroundLayer, this.objectLayer)

        const playerImg:HTMLImageElement = new Image();
        playerImg.src = '../assets/graphics/spritesheets/player_spritesheet.png'    

        playerImg.onload = () => {
            player1.loadSpritesheet(playerImg)
        }

        player1.loadColliders(this.collisions)

        player1.loadInteractions(this.interactions)

        return player1

    }



}