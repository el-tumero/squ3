import Map from "../Map";
import Collision from "./Collision";
import Interaction from "./Interaction";
import TextureLayer from "./TextureLayer";
import { io, Socket } from "socket.io-client";


export default class OtherPlayer extends TextureLayer{

    private realX:number
    private realY:number


    mvUp:boolean
    mvDown:boolean
    mvRight:boolean
    mvLeft:boolean
  
    speedX:number = 3
    speedY: number = 3
   
    map:Map
   
    socket:Socket
    //deltaXBlocks:number = 0
    //deltaYBlocks:number = 0
    
    prevY = 0


    destX:number = 0
    destY:number = 0
    ready:boolean = false;
    moveDone:boolean = false;

    movedX:number = 0
    movedY:number = 0

    directionX:string = 'none'
    directionY:string = 'none'
    

    spriteSize:number = 32
    sprite:HTMLImageElement = new Image()
    sx:number = 0
    sy:number = 0

    constructor(_domCtx: CanvasRenderingContext2D, _realX:number, _realY:number, _map:Map){
        super(_domCtx)

        this.realX = Math.floor(_realX/1.5)
        this.realY = Math.floor(_realY/1.5)

        this.mvUp = false
        this.mvDown = false
        this.mvRight = false
        this.mvLeft = false

        this.map = _map
        this.socket = _map.getSocket()

        //this.initControls()

        //console.log(this.socket)

        // this.dataFromSocket()

        this.dataFromSocket()
    }




    public getRealX():number {
        return this.realX
    }

    public getRealY():number {
        return this.realY
    }

    public override colMoveX(_speedX: number): void {
        this.realX += _speedX
    }

    public override colMoveY(_speedY: number): void {
        this.realY += _speedY
    }

    public loadSpritesheet(_sprite:HTMLImageElement){
        this.sprite = _sprite
    }



    private dataFromSocket(){
        this.socket.on("moveOther", data => {
            //console.log(data)

            // console.log(data)

            // console.log(data)

            if(data.id == window.otherUserId){

                //const deltaXBlocks:number = Math.round( (this.realX - data.x) / 32 ) 
                //const deltaYBlocks:number = Math.round( (this.realY - data.y) / 32 )

                this.destX = data.x
                this.destY = data.y
            


                //console.log(data.x ,data.y)
                //console.log(this.realX, this.realY)


                if(data.y == 0) this.directionY = 'none'
                if(data.x == 0) this.directionX = 'none'

                if(data.y < this.realY) this.directionY = 'up'
                if(data.y > this.realY) this.directionY = 'down'

                if(data.x > this.realX) this.directionX = 'right'
                if(data.x < this.realX) this.directionX = 'left'

                // console.log(this.direction)

            }
        })
    }

    private animate(_frames: number, deltaX: number, deltaY:number ):void{

        if(this.directionY == "up"){
            this.sy = 3 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(this.directionY == "down"){
            this.sy = 0
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(this.directionX == "left"){
            this.sy = 1 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(this.directionX == "right"){
            this.sy = 2 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }

        if(deltaX == 0) this.directionX = 'none'
        if(deltaY == 0) this.directionY = 'none'
        
    }


    public update(_frames:number):void{

        // NOTE
        // animacja sie nie przerywa cos trzeba na to poradzic? np jak delta = 0 no to siema
        // nwm cos sie psuje jeszcze
  
        const deltaYBlocks:number = Math.round( (this.realY - this.destY) / 32 )

        const deltaXBlocks:number = Math.round( (this.destX - this.realX) / 32 )

        this.animate(_frames, deltaXBlocks, deltaYBlocks)

        //console.log(deltaXBlocks)

        // console.log(deltaYBlocks)

        if(deltaYBlocks > 0 && this.directionY == 'up'){
            // console.log("moving up")
            this.mvUp = true
        }
        else{
            this.mvUp = false
        } 

        if(deltaYBlocks < 0 && this.directionY == 'down'){
            // console.log("moving down")
            this.mvDown = true
        }
        else{
            this.mvDown = false
        } 

        if(deltaXBlocks > 0 && this.directionX == 'right'){
            //console.log("moving right")
            this.mvRight = true
        }else{
            this.mvRight = false
        }

        if(deltaXBlocks < 0 && this.directionX == 'left'){
            //console.log("moving right")
            this.mvLeft = true
        }else{
            this.mvLeft = false
        }

        



        if(this.mvUp){
            this.realY -= this.speedY
        } 
        if(this.mvDown){
            this.realY += this.speedY
        } 
        if(this.mvRight){
            this.realX += this.speedX
        } 
        if(this.mvLeft){
            this.realX -= this.speedX
        }

    }

    // private initControls():void{
    //     document.addEventListener('keydown', e=> {
    //         if(e.key == "p"){
    //             this.realX += 3;
    //         }
    //         if(e.key == "o"){
    //             this.realX -= 3;
    //         }
    //     })
    // }
        
    
    public draw():void{

        this.domCtx.drawImage(this.sprite,
            this.sx,
            this.sy,
            this.blockSize, 
            this.blockSize, 
            this.realX, 
            this.realY, 
            this.blockSize, 
            this.blockSize)

    }


}