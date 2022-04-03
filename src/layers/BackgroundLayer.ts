import TextureLayer from "./TextureLayer";

export default class BackgroundLayer extends TextureLayer{
    texture:HTMLImageElement

    constructor(_domCtx: CanvasRenderingContext2D, _texture:HTMLImageElement){
        super(_domCtx)
        this.texture = _texture
        this.setBackground() 
    }

    private setBackground():void{
        // console.log(this.canvas.width/this.blockSize)
        for(let i=0; i<this.canvas.width/this.blockSize; i++){
            for (let j = 0; j < this.canvas.height/this.blockSize; j++) {
                this.ctx.drawImage(this.texture, i*this.blockSize, j*this.blockSize)
            }
        }
    }


}