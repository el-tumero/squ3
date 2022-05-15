export default class OtherPlayer {

    private layerCtx:CanvasRenderingContext2D

    private realX:number
    private realY:number


    private mvUp:boolean
    private mvDown:boolean
    private mvRight:boolean
    private mvLeft:boolean
  
    private speedX:number = 3
    private speedY: number = 3
   

    private destX:number = 0
    private destY:number = 0

    private directionX:string = 'none'
    private directionY:string = 'none'
    

    private spriteSize:number = 32
    private sprite:HTMLImageElement = new Image()
    private sx:number = 0
    private sy:number = 0
    

    constructor(_layerCtx: CanvasRenderingContext2D, _realX:number, _realY:number){
        this.layerCtx = _layerCtx
        this.realX = Math.floor(_realX/1.5) 
        this.realY = Math.floor(_realY/1.5) 

        this.mvUp = false
        this.mvDown = false
        this.mvRight = false
        this.mvLeft = false
    }




    public getRealX():number {
        return this.realX
    }

    public getRealY():number {
        return this.realY
    }

    public loadSpritesheet(_sprite:HTMLImageElement){
        this.sprite = _sprite
    }



    public dataFromSocket(data:any){

                this.destX = data.x
                this.destY = data.y
            
                if(data.y == 0) this.directionY = 'none'
                if(data.x == 0) this.directionX = 'none'

                if(data.y < this.realY) this.directionY = 'up'
                if(data.y > this.realY) this.directionY = 'down'

                if(data.x > this.realX) this.directionX = 'right'
                if(data.x < this.realX) this.directionX = 'left'

    }

    private animate(_frames: number, deltaX: number, deltaY:number ):void{

        if(this.directionY == "up"){
            this.sy = 3 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(this.directionY == "down"){
            this.sy = 0
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(this.directionX == "left"){
            this.sy = 1 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }
        if(this.directionX == "right"){
            this.sy = 2 * this.spriteSize
            if(_frames == 0) this.sx = 0
            if(_frames == 20) this.sx = this.spriteSize
            if(_frames == 40) this.sx = 2 * this.spriteSize
        }

        if(deltaX == 0) this.directionX = 'none'
        if(deltaY == 0) this.directionY = 'none'
        
    }


    public update(_frames:number):void{
  
        const deltaYBlocks:number = this.realY - this.destY
        const deltaXBlocks:number = this.destX - this.realX

        this.animate(_frames, deltaXBlocks, deltaYBlocks)

        if(deltaYBlocks > 0 && this.directionY == 'up'){
            this.mvUp = true
        }
        else{
            this.mvUp = false
        } 

        if(deltaYBlocks < 0 && this.directionY == 'down'){
            this.mvDown = true
        }
        else{
            this.mvDown = false
        } 

        if(deltaXBlocks > 0 && this.directionX == 'right'){
            this.mvRight = true
        }else{
            this.mvRight = false
        }

        if(deltaXBlocks < 0 && this.directionX == 'left'){
            this.mvLeft = true
        }else{
            this.mvLeft = false
        }

        
        // moving on screen
        if(this.mvUp){
            this.realY -= this.speedY
        } 
        if(this.mvDown){
            this.realY += this.speedY
        } 
        if(this.mvRight){
            this.realX += this.speedX
        } 
        if(this.mvLeft){
            this.realX -= this.speedX
        }

    }
    
    public draw():void{

        this.layerCtx.drawImage(this.sprite,
            this.sx,
            this.sy,
            this.spriteSize, 
            this.spriteSize, 
            this.realX, 
            this.realY, 
            this.spriteSize, 
            this.spriteSize)

    }


}