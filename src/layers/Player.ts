import Atlas from "./Atlas";
import BackgroundLayer from "./BackgroundLayer";
import Collision from "./Collision";
import Interaction from "./Interaction";
import ObjectLayer from "./ObjectLayer";
import TextureLayer from "./TextureLayer";

export default class Player extends TextureLayer{
    x:number
    y:number
    realX:number
    realY:number
    centerX:number
    centerY:number
    mvUp:boolean
    mvDown:boolean
    mvRight:boolean
    mvLeft:boolean
    facing:String = 'none'
    speedX:number = 3
    speedY: number = 3;
    colliders:Array<Collision> = []
    bgLayer:BackgroundLayer
    objLayer:ObjectLayer
    interactions:Array<Interaction> = []
    

    spriteSize:number = 32
    sprite:HTMLImageElement = new Image()
    sx:number = 0
    sy:number = 0

    constructor(_domCtx: CanvasRenderingContext2D, _x:number, _y:number, _bgLayer:BackgroundLayer, _objLayer:ObjectLayer){
        super(_domCtx)
        this.x = _x
        this.y = _y
        this.realX = _x
        this.realY = _y
        this.centerX = this.realX+16
        this.centerY = this.realY+16
        this.mvUp = false
        this.mvDown = false
        this.mvRight = false
        this.mvLeft = false
        this.initControls()
        this.bgLayer = _bgLayer
        this.objLayer = _objLayer
    }

    private initControls():void{
        document.addEventListener('keydown', e=> {
            if(e.key == "ArrowUp"){
                this.mvUp = true
                this.facing = 'up'
            }
            if(e.key == "ArrowDown"){
                this.mvDown = true
                this.facing = 'down'
            }
            if(e.key == "ArrowRight"){
                this.mvRight = true
                this.facing = 'right'
            }
            if(e.key == "ArrowLeft"){
                this.mvLeft = true
                this.facing= 'left'
            }
            
        })

        document.addEventListener('keyup', e=> {
            if(e.key == "ArrowUp"){
                this.mvUp = false
                this.facing = 'up'
            }
            if(e.key == "ArrowDown"){
                this.mvDown = false
                this.facing = 'down'
            }
            if(e.key == "ArrowRight"){
                this.mvRight = false
                this.facing = 'right'
            }
            if(e.key == "ArrowLeft"){
                this.mvLeft = false
                this.facing= 'left'
            }
        })
    }

    public loadColliders(_colliders:Array<Collision>){
        this.colliders = _colliders
    }

    public loadInteractions(_interactions:Array<Interaction>){
        this.interactions = _interactions
    }

    public loadSpritesheet(_sprite:HTMLImageElement){
        this.sprite = _sprite
    }

    public updatePositionInLayers(_frames: number):void{



        // let borderRect = {
        //     x: 12*this.blockSize,
        //     y: 14*this.blockSize,
        //     width: 32,
        //     height: 32
        // }

        
        if(this.mvUp){
            this.realY -= this.speedY
            this.centerY = this.realY + 16
            this.animate(_frames, 'up')
        } 
        if(this.mvDown){
            this.realY += this.speedY
            this.centerY = this.realY+16
            this.animate(_frames, 'down')
        } 
        if(this.mvRight){
            this.realX += this.speedX
            this.centerX = this.realX+16
            this.animate(_frames, 'right')
        } 
        if(this.mvLeft){
        
            this.realX -= this.speedX
            this.centerX = this.realX+16
            this.animate(_frames, 'left')
        } 
        
        this.bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
        this.objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
        // sprawdzanie interakcji
        
        
        //this.interactions[0].check()

        this.interactions.forEach(interaction => {
            interaction.check()
        })

        this.colliders.forEach(collider => {
            collider.check(this.bgLayer, this.objLayer, this)
        });
        

       
    }

    private animate(_frames: number, _direction:String):void{
        // console.log(_frames)

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
            this.x, 
            this.y, 
            this.blockSize, 
            this.blockSize)

    }


}