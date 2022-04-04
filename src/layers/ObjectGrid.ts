export default class ObjectGrid{
    
    grid:number[][] = []

    blockSize:number = 32
    canvasWidth:number = 960
    canvasHeight:number = 960
    
    constructor(){
        this.init()
    }

    private init(){
        for (let i = 0; i < this.canvasWidth/this.blockSize; i++) {
            this.grid[i] = []
            for (let j = 0; j < this.canvasHeight/this.blockSize; j++) {
                this.grid[i][j] = 0
            }
        }
    }

    public addObject(_id:number, _xCell:number, _yCell:number){
        this.grid[_xCell][_yCell] = _id
    }
} 