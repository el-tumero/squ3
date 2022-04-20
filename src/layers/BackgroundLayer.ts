import Atlas from "./Atlas";
import TextureLayer from "./TextureLayer";

export default class BackgroundLayer extends TextureLayer{

    private textureId:number
    private textureAtlas:Atlas

    constructor(_domCtx: CanvasRenderingContext2D, _textureAtlas:Atlas, _textureId:number){
        super(_domCtx)
        this.textureAtlas = _textureAtlas
        this.canvas.width = 1920 + 640
        this.canvas.height = 1920 + 640
        this.textureId = _textureId
        this.setBackground() 
  
    }

    private setBackground():void{
        for(let i = 0; i<(this.canvas.width/this.blockSize) - 20; i++){
            for (let j = 0; j < (this.canvas.height/this.blockSize) - 20; j++) {
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

    public draw():void {
        this.domCtx.drawImage(this.canvas, this.x-320, this.y-320)
    }


}