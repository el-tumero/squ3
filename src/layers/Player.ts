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



        if(this.isCollide({x: this.realX, y: this.realY, height: 32, width:32}, {x: 12*this.blockSize, y: 14*this.blockSize, height: 32, width:32})){
            if(this.facing == 'left'){
                this.mvLeft = false
            } 

            if(this.facing == 'down'){
                this.mvDown = false
            }

            if(this.facing == 'up'){
                this.mvUp = false
            }

            if(this.facing == 'right'){
                this.mvRight = false
            }

            




            bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
            objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)

                if(this.mvUp) this.realY -= this.speed
                if(this.mvDown) this.realY += this.speed
                if(this.mvRight) this.realX += this.speed
                if(this.mvLeft) this.realX -= this.speed

            console.log('coolll')
            // if(this.facing == 'up'){
            //     bgLayer.y -= 0.3
            //     objLayer.y -= 0.3
            //     this.realY += 0.3
            // }
            // bgLayer.x =- 1
            // bgLayer.y =- 1
            // this.realX +=
            //console.log('Collision!')
        }

        if(!this.isCollide({x: this.realX, y: this.realY, height: 32, width:32}, {x: 12*this.blockSize, y: 14*this.blockSize, height: 32, width:32})){
            bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
            objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft)
            if(this.mvUp) this.realY -= this.speed
            if(this.mvDown) this.realY += this.speed
            if(this.mvRight) this.realX += this.speed
            if(this.mvLeft) this.realX -= this.speed
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