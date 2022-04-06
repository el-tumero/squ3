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

    // for now only one object
    private isCollide(a:any, b:any) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }

    public updatePositionInLayers(bgLayer:BackgroundLayer, objLayer: ObjectLayer):void{

        let horizontalRect = {
            x: this.realX + this.speed,
            y: this.realY,
            width: this.blockSize,
            height: this.blockSize
        }

        let verticalRect = {
            x: this.realX,
            y: this.realY + this.speed,
            width: this.blockSize,
            height: this.blockSize
        }

        let border = {
            x: 12*this.blockSize,
            y: 14*this.blockSize,
            width: 32,
            height: 32
        }

        
        if(this.mvUp) this.realY -= this.speed
        if(this.mvDown) this.realY += this.speed
        if(this.mvRight) this.realX += this.speed
        if(this.mvLeft) this.realX -= this.speed
        
        bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
        objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
        

        let speedY:number = Math.sign(horizontalRect.y - border.y) * 3
        let speedX:number = Math.sign(horizontalRect.x - border.x) * 3

        if(this.isCollide(verticalRect, border) && this.isCollide(horizontalRect, border)){
            console.log(speedX, speedY)
        
            while(speedY > 0){
                this.realY += 2 * speedY
                bgLayer.y = bgLayer.y - 2 * speedY
                objLayer.y = objLayer.y - 2 * speedY
                speedY = 0
            }

            while(speedX > 0){
                this.realX += 2 * speedX
                bgLayer.x = bgLayer.x - 2 * speedX
                objLayer.x = objLayer.x - 2* speedX
                speedX = 0
            }

        }
        else if(this.isCollide(verticalRect, border)){
            
            this.realY += speedY

            console.log('vert ' + speedY, this.realX, this.realY)

            bgLayer.y = bgLayer.y - speedY
            objLayer.y = objLayer.y - speedY
            // console.log('vert ')
        }
        else if(this.isCollide(horizontalRect, border)){
            
            this.realX += speedX
            console.log('horiz ' + speedX, this.realX, this.realY)
            bgLayer.x = bgLayer.x - speedX
            objLayer.x = objLayer.x - speedX
        
        }
       


        
        

        


        // console.log(this.realX, this.realY)
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