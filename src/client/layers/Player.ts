import Map from "../Map";
import Collision from "./Collision";
import Interaction from "./Interaction";
import TextureLayer from "./TextureLayer";

export default class Player extends TextureLayer{
    x:number
    y:number
    private realX:number
    private realY:number
    centerX:number
    centerY:number
    mvUp:boolean
    mvDown:boolean
    mvRight:boolean
    mvLeft:boolean
    facing:String = 'none'
    speedX:number = 3
    speedY: number = 3
    colliders:Array<Collision> = []
    map:Map
    interactions:Array<Interaction> = []
    

    spriteSize:number = 32
    sprite:HTMLImageElement = new Image()
    sx:number = 0
    sy:number = 0

    constructor(_domCtx: CanvasRenderingContext2D, _x:number, _y:number, _map:Map){
        super(_domCtx)
        this.x = _x/1.5
        this.y = _y/1.5
        this.realX = _x/1.5
        this.realY = _y/1.5
        this.centerX = this.realX+16
        this.centerY = this.realY+16
        this.mvUp = false
        this.mvDown = false
        this.mvRight = false
        this.mvLeft = false
        this.initControls()
        this.map = _map

        this.interactions = _map.getInteractions()
        this.colliders = _map.getColliders()
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

    // public loadColliders(_colliders:Array<Collision>){
    //     this.colliders = _colliders
    // }

    // public loadInteractions(_interactions:Array<Interaction>){
    //     this.interactions = _interactions
    // }

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

    public updatePositionInLayers(_frames: number):void{

        // console.log(_frames)

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
        
        // aktualizowanie pozycji warstw
        this.map.updateLayersPosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)

        if(this.realX < 0){
            this.realX += this.speed
            this.map.updateLayersPosition(false, false, true, false)
        }
        if(this.realX > 960*2 - this.blockSize){
            this.realX -= this.speed
            this.map.updateLayersPosition(false, false, false, true)
        }
        if(this.realY < 0){
            this.realY += this.speed
            this.map.updateLayersPosition(false, true, false, false)
        }
        if(this.realY > 960*2 - this.blockSize){
            this.realY -= this.speed
            this.map.updateLayersPosition(true, false, false, false)
        }
        
        
        // sprawdzanie interakcji oraz kolizji
        
        this.interactions.forEach(interaction => {
            interaction.check()
        })

        this.colliders.forEach(collider => {
            collider.check()
        });
        

       
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
            this.x, 
            this.y, 
            this.blockSize, 
            this.blockSize)

    }


    public getInteractions():Array<Interaction>{
        return this.interactions
    }

}