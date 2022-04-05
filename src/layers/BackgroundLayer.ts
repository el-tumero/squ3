import TextureLayer from "./TextureLayer";

export default class BackgroundLayer extends TextureLayer{
    texture:HTMLImageElement


    constructor(_domCtx: CanvasRenderingContext2D, _texture:HTMLImageElement){
        super(_domCtx)
        this.canvas.width = 1920
        this.canvas.height = 1920
        this.texture = _texture
        this.setBackground() 
  
    }

    private setBackground():void{
        for(let i = 0; i<this.canvas.width/this.blockSize; i++){
            // console.log(i)
            for (let j = 0; j < this.canvas.height/this.blockSize; j++) {
                this.ctx.drawImage(this.texture, i*this.blockSize, j*this.blockSize)
            }
        }
    }

    public draw():void {
        this.domCtx.drawImage(this.canvas, this.x, this.y)
    }


}