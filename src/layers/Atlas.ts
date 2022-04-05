type Coordinates = {
    x: number
    y: number
}

export default class Atlas{
    
    cords:Array<Coordinates> = []
    width:number
    height:number
    blockSize:number
    texture:HTMLImageElement

    constructor(_width:number, _height:number, _texture:HTMLImageElement, _blockSize:number){
        this.width = _width
        this.height = _height
        this.blockSize = _blockSize
        this.texture = _texture
        this.init()
    }

    private init(){
        for (let i = 0; i <= this.width/this.blockSize ; i++) {
            for (let j = 0; j <= this.height/this.blockSize; j++) {
                this.cords.push({x: j*this.blockSize, y: i*this.blockSize})
            }
        }
    }
}

