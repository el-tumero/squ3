import ObjectGrid from "./ObjectGrid";
import TextureLayer from "./TextureLayer";
import Atlas from "./Atlas";

export default class ObjectLayer extends TextureLayer {


    constructor(_domCtx: CanvasRenderingContext2D, _textureAtlas:Atlas) {
        super(_domCtx, _textureAtlas)
        this.canvas.width = 1920
        this.canvas.height = 1920
    } 

    public loadObjects(_obj: ObjectGrid){
        for (let i = 0; i < this.canvas.width/this.blockSize; i++) {
            for (let j = 0; j < this.canvas.height/this.blockSize; j++) {
                if(_obj.grid[i][j] !== 0){ //temp
                    this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[_obj.grid[i][j]].x, this.textureAtlas.cords[_obj.grid[i][j]].y, this.blockSize, this.blockSize, i*this.blockSize, j*this.blockSize, this.blockSize, this.blockSize)
                }
            }
        }
    }

    public draw():void {
        this.domCtx.drawImage(this.canvas, this.x, this.y)
    }

}

