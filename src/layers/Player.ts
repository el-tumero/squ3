import Atlas from "./Atlas";
import BackgroundLayer from "./BackgroundLayer";
import ObjectLayer from "./ObjectLayer";
import TextureLayer from "./TextureLayer";

export default class Player extends TextureLayer{
    x:number
    y:number
    realX:number
    realY:number
    mvUp:boolean
    mvDown:boolean
    mvRight:boolean
    mvLeft:boolean
    skinId:number
    facing:String = 'none'
    speedX:number = 3
    speedY: number = 3;

    constructor(_domCtx: CanvasRenderingContext2D, _x:number, _y:number, _textureAtlas:Atlas, _skinId:number){
        super(_domCtx, _textureAtlas)
        this.x = _x
        this.y = _y
        this.realX = _x
        this.realY = _y
        this.mvUp = false
        this.mvDown = false
        this.mvRight = false
        this.mvLeft = false
        this.skinId = _skinId
        this.initControls()
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


    private isCollide(r1:any, r2:any){
        if(r1.x >= r2.x + r2.width) return false
        else if (r1.x + r1.width <= r2.x) return false
        else if (r1.y >= r2.y + r2.height) return false
        else if (r1.y + r1.height <= r2.y) return false
        else return true
    }

    public updatePositionInLayers(bgLayer:BackgroundLayer, objLayer: ObjectLayer):void{

        let collRect = {
            x: this.realX - this.speedX,
            y: this.realY,
            width: this.blockSize + this.speedX,
            height: this.blockSize
        }

        let borderRect = {
            x: 12*this.blockSize,
            y: 14*this.blockSize,
            width: 32,
            height: 32
        }

        
        if(this.mvUp) this.realY -= this.speedY
        if(this.mvDown) this.realY += this.speedY
        if(this.mvRight) this.realX += this.speedX
        if(this.mvLeft) this.realX -= this.speedX
        
        bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
        objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
        

        let speedY:number = Math.sign(collRect.y - borderRect.y) * this.speed
        let speedX:number = Math.sign(collRect.x - borderRect.x) * this.speed

 
        if(this.isCollide(collRect, borderRect) && (this.realY > (borderRect.y - 25)) && (this.realY < (borderRect.y + 25)) ){
            this.realX += speedX
            bgLayer.x -= speedX
            objLayer.x -= speedX
        
        }

        if(this.isCollide(collRect, borderRect) && ( (this.realY < (borderRect.y - 25 )) || (this.realY > (borderRect.y + 25)) ) ){
            this.realY += speedY
            bgLayer.y -= speedY
            objLayer.y -= speedY
        }
       
    }

    public draw():void{
        this.domCtx.drawImage(this.textureAtlas.texture,
            this.textureAtlas.cords[this.skinId].x, 
            this.textureAtlas.cords[this.skinId].y, 
            this.blockSize, 
            this.blockSize, 
            this.x, 
            this.y, 
            this.blockSize, 
            this.blockSize)
    }


}