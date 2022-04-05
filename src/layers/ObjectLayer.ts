import ObjectGrid from "./ObjectGrid";
import TextureLayer from "./TextureLayer";

export default class ObjectLayer extends TextureLayer {

    textures:HTMLImageElement[]

    constructor(_domCtx: CanvasRenderingContext2D, _textures:HTMLImageElement[]) {
        super(_domCtx)
        this.canvas.width = 1920
        this.canvas.height = 1920
        this.textures = _textures
    } 

    public loadObjects(_obj: ObjectGrid){
        for (let i = 0; i < this.canvas.width/this.blockSize; i++) {
            for (let j = 0; j < this.canvas.height/this.blockSize; j++) {
                if(_obj.grid[i][j] !== 0){ //temp
                    this.ctx.drawImage(this.textures[_obj.grid[i][j]], i*32, j*32)
                }
            }
        }
    }

    public draw():void {
        this.domCtx.drawImage(this.canvas, this.x, this.y)
    }

}

