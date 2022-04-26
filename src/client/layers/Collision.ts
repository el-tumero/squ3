import Map from "../Map"
import Player from "./Player"

type Rectangle = {
    x: number
    y: number
    width: number
    height: number
}


export default class Collision{
    private blockSize:number = 32
    private border:Rectangle
    private width:number
    private height:number
    private map:Map
    private player:Player
    private playerSpeed:number


    constructor(_map:Map, _blockX:number, _blockY:number, _width:number, _height:number){
        this.border = {x: _blockX*this.blockSize, y: _blockY*this.blockSize, width: _width, height: _height}
        this.width = _width
        this.height = _height
        this.map = _map
        this.player = _map.getLocalPlayer()
        this.playerSpeed = _map.getLocalPlayer().getSpeed()
    }

    public check(){

        let collRect = {
            x: this.player.getRealX() - this.playerSpeed,
            y: this.player.getRealY(),
            width: this.blockSize + this.playerSpeed,
            height: this.blockSize,
        }


        let speedY:number = Math.sign(collRect.y - this.border.y) * this.player.getSpeed()
        let speedX:number = Math.sign(collRect.x - this.border.x) * this.player.getSpeed()

        const playerRealY:number = this.player.getRealY()

 
        if(this.isCollide(collRect, this.border) && (playerRealY > (this.border.y - 25)) && (playerRealY < (this.border.y + 25)) ){
            this.map.colMoveX(speedX)
        }

        if(this.isCollide(collRect, this.border) && ( (playerRealY< (this.border.y - 25 )) || (playerRealY > (this.border.y + 25)) ) ){
            this.map.colMoveY(speedY)
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