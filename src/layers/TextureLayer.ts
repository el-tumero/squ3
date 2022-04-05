export default class TextureLayer {
    
    canvas:HTMLCanvasElement
    ctx:CanvasRenderingContext2D
    domCtx: CanvasRenderingContext2D

    blockSize:number = 32

    speed:number = 3
    x:number = 0
    y:number = 0
    

    constructor(_domCtx: CanvasRenderingContext2D) {
       const [_ctx, _canvas] = this.createLayer();
       this.canvas = _canvas
       this.ctx = _ctx
       this.domCtx = _domCtx

       this.canvas.width = 960
       this.canvas.height = 960
    
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

    // public draw():void {
    //     this.domCtx.drawImage(this.canvas, 0, 0)
    // }
}