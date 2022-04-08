import BackgroundLayer from "./BackgroundLayer"
import ObjectLayer from "./ObjectLayer"
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


    constructor(_blockX:number, _blockY:number, _width:number, _height:number){
        this.border = {x: _blockX*this.blockSize, y: _blockY*this.blockSize, width: _width, height: _height}
        this.width = _width
        this.height = _height
    }

    public check(_bgLayer:BackgroundLayer, _objLayer:ObjectLayer, _player:Player){

        let collRect = {
            x: _player.realX - _player.speedX,
            y: _player.realY,
            width: this.blockSize + _player.speedX,
            height: this.blockSize,
        }


        let speedY:number = Math.sign(collRect.y - this.border.y) * _player.speed
        let speedX:number = Math.sign(collRect.x - this.border.x) * _player.speed

 
        if(this.isCollide(collRect, this.border) && (_player.realY > (this.border.y - 25)) && (_player.realY < (this.border.y + 25)) ){
            _player.realX += speedX
            _bgLayer.x -= speedX
            _objLayer.x -= speedX        
        }

        if(this.isCollide(collRect, this.border) && ( (_player.realY < (this.border.y - 25 )) || (_player.realY > (this.border.y + 25)) ) ){
            _player.realY += speedY
            _bgLayer.y -= speedY
            _objLayer.y -= speedY
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