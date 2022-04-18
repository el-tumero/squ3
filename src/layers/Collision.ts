import BackgroundLayer from "./BackgroundLayer"
import ObjectLayer from "./ObjectLayer"
import Map from "../Map"
import Player from "./Player"

type Rectangle = {
    x: number
    y: number
    width: number
    height: number
}


export default class Collision{
    blockSize:number = 32
    border:Rectangle
    width:number
    height:number
    map:Map


    constructor(_map:Map, _blockX:number, _blockY:number, _width:number, _height:number){
        this.border = {x: _blockX*this.blockSize, y: _blockY*this.blockSize, width: _width, height: _height}
        this.width = _width
        this.height = _height
        this.map = _map
    }

    public check(){

        let collRect = {
            x: this.map.localPlayer.realX - this.map.localPlayer.speedX,
            y: this.map.localPlayer.realY,
            width: this.blockSize + this.map.localPlayer.speedX,
            height: this.blockSize,
        }


        let speedY:number = Math.sign(collRect.y - this.border.y) * this.map.localPlayer.speed
        let speedX:number = Math.sign(collRect.x - this.border.x) * this.map.localPlayer.speed

 
        if(this.isCollide(collRect, this.border) && (this.map.localPlayer.realY > (this.border.y - 25)) && (this.map.localPlayer.realY < (this.border.y + 25)) ){
            this.map.localPlayer.realX += speedX
            this.map.backgroundLayer.x -= speedX
            this.map.objectLayer.x -= speedX        
        }

        if(this.isCollide(collRect, this.border) && ( (this.map.localPlayer.realY < (this.border.y - 25 )) || (this.map.localPlayer.realY > (this.border.y + 25)) ) ){
            this.map.localPlayer.realY += speedY
            this.map.backgroundLayer.y -= speedY
            this.map.objectLayer.y -= speedY
        }

    }

    private isCollide(r1:Rectangle, r2:Rectangle){
        if(r1.x >= r2.x + r2.width) return false
        else if (r1.x + r1.width <= r2.x) return false
        else if (r1.y >= r2.y + r2.height) return false
        else if (r1.y + r1.height <= r2.y) return false
        else return true
    }
} 