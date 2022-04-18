import ObjectGrid from "./ObjectGrid";
import TextureLayer from "./TextureLayer";
import Atlas from "./Atlas";

export default class ObjectLayer extends TextureLayer {

    textureAtlas:Atlas
    objGrid:ObjectGrid

    constructor(_domCtx: CanvasRenderingContext2D, _textureAtlas:Atlas, _objGrid:ObjectGrid) {
        super(_domCtx)
        this.textureAtlas = _textureAtlas
        this.objGrid = _objGrid
        this.canvas.width = 1920
        this.canvas.height = 1920
    } 

    public loadObjects(){
        for (let i = 0; i < this.canvas.width/this.blockSize; i++) {
            for (let j = 0; j < this.canvas.height/this.blockSize; j++) {
                if(this.objGrid.grid[i][j] !== 0){ //temp
                    this.ctx.drawImage(this.textureAtlas.texture, 
                        // thisobjGrid
                        this.textureAtlas.cords[this.objGrid.grid[i][j]].x, 
                        this.textureAtlas.cords[this.objGrid.grid[i][j]].y, 
                        this.blockSize, 
                        this.blockSize, 
                        i*this.blockSize, 
                        j*this.blockSize, 
                        this.blockSize, 
                        this.blockSize)
                }
            }
        }
    }

    public draw():void {
        this.domCtx.drawImage(this.canvas, this.x, this.y)
    }

}

