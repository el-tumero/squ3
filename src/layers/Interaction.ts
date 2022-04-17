import Player from "./Player"

export default class Interaction {

    player:Player
    radiusValue:number = 0
    x:number
    y:number
    centerX:number
    centerY:number
    blockSize:number = 32
    isInRange:boolean = false
    info:string
    type:string

    constructor(_player:Player,_x:number,_y:number, _info:string, _type:string) {

        this.x = _x
        this.y = _y
        this.player = _player
        
        this.centerX = _x*this.blockSize+16
        this.centerY = _y*this.blockSize+16

        this.type = _type
        this.info = _info

    }

    // radius fun
    private radius(x1:number, y1:number, x2:number, y2:number):number {
        let a:number = x1 - x2
        let b:number = y1 - y2
        let c:number = Math.sqrt(a*a + b*b)

        return c
    }
    
    public check():void {
        let radius:number = this.radius(this.player.centerX, this.player.centerY, this.centerX, this.centerY)

        if( radius <= 64){
           this.isInRange = true
           return
        }
        this.isInRange = false
    }


}