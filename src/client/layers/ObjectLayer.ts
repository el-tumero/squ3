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
    //tutaj jest git o to własnie chodziło 

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

    // i teraz najlepsza część 

    // tworze ta funckje jako publiczna zebym mogl sie odniesc do niej gdzies daleko stad a zasadzie to w klasie UI
    // dzięki temu ze klasa UI ma odnosnik do obiektu klasy Map, a klasa Map posiada w sobie odnosnik do obiektu klasy
    // ObjectLayer bedziemy mogli sie odniesc do tej metody, wiem data flow na poteznym poziomie
    public deleteObject(_x:number, _y:number):void{
        // najłatwiej będzie usuwać blok który chcemy, z grida i ponownie wczytywać plansze
        
        console.log(_x, _y)
        this.objGrid.grid[_x][_y] = 0
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // wiadomo czyscimy nasz wirtualny canvasek
        this.loadObjects()
        // i to w zasadzie tyle

    }

    public draw():void {
        this.domCtx.drawImage(this.canvas, this.x, this.y)
    }

}

