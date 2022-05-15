export default class TextureLayer {
    
    protected canvas:HTMLCanvasElement
    protected ctx:CanvasRenderingContext2D 
    protected domCtx:CanvasRenderingContext2D
    

    protected blockSize:number = 32

    protected speed:number = 3
    protected x:number = 0
    protected y:number = 0
    

    constructor(_domCtx: CanvasRenderingContext2D) {
       const [_ctx, _canvas] = this.createLayer();
       this.canvas = _canvas
       this.ctx = _ctx
       this.domCtx = _domCtx


       this.canvas.width = 960
       this.canvas.height = 960
    
    }

    public getSpeed():number{
        return this.speed
    }

    public getCords():void{
        console.log(this.x, this.y)
    }

    public colMoveX(_speedX:number){
        this.x -= _speedX
    }

    public colMoveY(_speedY:number){
        this.y -= _speedY
    }

    public updatePosition(_mvUp:boolean, _mvDown:boolean, _mvRight:boolean, _mvLeft:boolean):void{
        if(_mvUp) this.y += this.speed
        if(_mvDown) this.y -= this.speed
        if(_mvRight) this.x -= this.speed
        if(_mvLeft) this.x += this.speed
    }

    private createLayer():[CanvasRenderingContext2D, HTMLCanvasElement]{
        let canvas:HTMLCanvasElement = document.createElement('canvas')
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
        return [ctx, canvas]
    }
}