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
    deltaX:number = 0
    deltaY:number = 0
    destX:number = 0
    destY:number = 0
    ready:boolean = false;
    moveDone:boolean = false;
    

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
                this.realX = data.x
                this.realY = data.y
            }
            // console.log(data)

            // this.destX = data.x
            // this.destY = data.y

            // this.deltaX = this.realX - data.x
            // this.deltaY = this.realY - data.y

            // this.ready = true

            // console.log(this.deltaX, this.deltaY)
        })
    }


    private initControls():void{
        document.addEventListener('keydown', e=> {
            if(e.key == "p"){
                this.realX += 3;
            }
            if(e.key == "o"){
                this.realX -= 3;
            }
        })
    }
        
        
        

        

       
    

    private animate(_frames: number, _direction:String):void{

        if(_direction == "up"){
            this.sy = 3 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(_direction == "down"){
            this.sy = 0
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(_direction == "left"){
            this.sy = 1 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(_direction == "right"){
            this.sy = 2 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        
    }


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