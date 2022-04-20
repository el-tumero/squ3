import Atlas from "./Atlas";
import TextureLayer from "./TextureLayer";

export default class BackgroundLayer extends TextureLayer{

    private textureId:number
    private textureAtlas:Atlas

    constructor(_domCtx: CanvasRenderingContext2D, _textureAtlas:Atlas, _textureId:number){
        super(_domCtx)
        this.textureAtlas = _textureAtlas
        this.canvas.width = 2560
        this.canvas.height = 2560
        // 2560 = 1920 + 640
        this.textureId = _textureId
        this.setBackground()
        this.outerBgLeft()
        this.outerBgRight()
        this.outerBgUp()
        this.outerBgDown()
        // 2560 / 32 = 80
        // for 80*blocksize, 10*blocksize (320)height, draw
    }

    private setBackground():void{
        for(let i = 0; i<(this.canvas.width/this.blockSize) - 20; i++){
            for (let j = 0; j < (this.canvas.height/this.blockSize)-20; j++) {
                this.ctx.drawImage(this.textureAtlas.texture, 
                    this.textureAtlas.cords[this.textureId].x, 
                    this.textureAtlas.cords[this.textureId].y, 
                    this.blockSize, 
                    this.blockSize, 
                    i*this.blockSize + 320, 
                    j*this.blockSize + 320, 
                    this.blockSize, 
                    this.blockSize)
            }
        }
    }
    private outerBgLeft():void{
        for (let i = 0; i < (this.canvas.width/this.blockSize)/8; i++) {
            for (let j = 0; j < (this.blockSize)*10; j++) {
                this.ctx.drawImage(this.textureAtlas.texture, 
                    this.textureAtlas.cords[this.textureId-1].x, 
                    this.textureAtlas.cords[this.textureId-1].y, 
                    this.blockSize, 
                    this.blockSize, 
                    i*this.blockSize,
                    j*this.blockSize,
                    this.blockSize, 
                    this.blockSize)
            }
            
        }
    }
    private outerBgRight():void{
        for (let i = 70; i < (this.canvas.width/this.blockSize); i++) {
            for (let j = 0; j < (this.blockSize)*10; j++) {
                this.ctx.drawImage(this.textureAtlas.texture, 
                    this.textureAtlas.cords[this.textureId-1].x, 
                    this.textureAtlas.cords[this.textureId-1].y, 
                    this.blockSize, 
                    this.blockSize, 
                    i*this.blockSize,
                    j*this.blockSize,
                    this.blockSize, 
                    this.blockSize)
            }
            
        }
    }
    private outerBgUp():void{
        for (let i = 0; i < (this.canvas.width/this.blockSize); i++) {
            for (let j = 0; j < (this.canvas.height/this.blockSize)/8; j++) {
                this.ctx.drawImage(this.textureAtlas.texture, 
                    this.textureAtlas.cords[this.textureId-1].x, 
                    this.textureAtlas.cords[this.textureId-1].y, 
                    this.blockSize, 
                    this.blockSize, 
                    i*this.blockSize,
                    j*this.blockSize,
                    this.blockSize, 
                    this.blockSize)
            }
            
        }
    }
    private outerBgDown():void{
        for (let i = 0; i < (this.canvas.width/this.blockSize); i++) {
            for (let j = 70; j < (this.canvas.height/this.blockSize); j++) {
                this.ctx.drawImage(this.textureAtlas.texture, 
                    this.textureAtlas.cords[this.textureId-1].x, 
                    this.textureAtlas.cords[this.textureId-1].y, 
                    this.blockSize, 
                    this.blockSize, 
                    i*this.blockSize,
                    j*this.blockSize,
                    this.blockSize, 
                    this.blockSize)
            }
            
        }
    }



    public draw():void {
        // this.domCtx.drawImage(this.canvas, this.x, this.y)
        this.domCtx.drawImage(this.canvas, this.x-320, this.y-320)
    }


}