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

    direction:string = 'none'
    

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



            if(data.id == window.otherUserId){

                //const deltaXBlocks:number = Math.round( (this.realX - data.x) / 32 ) 
                //const deltaYBlocks:number = Math.round( (this.realY - data.y) / 32 )


                this.destY = data.y
                this.destX = data.x


                if(data.y == 0 && data.x == 0) this.direction = 'none'
                if(data.y < this.realY) this.direction = 'up'
                if(data.y > this.realY) this.direction = 'down'
                if(data.x > this.realX) this.direction = 'right'
                if(data.x < this.realX) this.direction = 'left'

                console.log(this.direction)

            }
        })
    }



    public update():void{


        const deltaYBlocks:number = Math.ceil( (this.realY - this.destY) / 32 )

        const deltaXBlocks:number = Math.ceil( (this.destX - this.realX) / 32 )

        //console.log(deltaXBlocks)

        // console.log(deltaYBlocks)

        if(deltaYBlocks > 0 && this.direction == 'up'){
            // console.log("moving up")
            this.mvUp = true
        }
        else{
            this.mvUp = false
        } 

        if(deltaYBlocks < 0 && this.direction == 'down'){
            // console.log("moving down")
            this.mvDown = true
        }
        else{
            this.mvDown = false
        } 

        if(deltaXBlocks > 0 && this.direction == 'right'){
            //console.log("moving right")
            this.mvRight = true
        }else{
            this.mvRight = false
        }

        if(deltaXBlocks < 0 && this.direction == 'left'){
            //console.log("moving right")
            this.mvLeft = true
        }else{
            this.mvLeft = false
        }

        //if(deltaYBlocks)



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