import Letters from "./Letters";

export default class Textarea{

    private sprite:HTMLImageElement
    private letters:Letters
 

    private canvas:HTMLCanvasElement
    private ctx:CanvasRenderingContext2D
    private uiCtx:CanvasRenderingContext2D
    private text:string
    private textOffset:number = 20
    
    
    constructor(_letters:Letters, _uiCtx:CanvasRenderingContext2D, _text:string){
        this.letters = _letters
        this.sprite = _letters.getSprite()

        const [_ctx, _canvas] = this.createLayer()
        this.canvas = _canvas
        this.ctx = _ctx
        this.uiCtx = _uiCtx

        this.text = _text.toLocaleLowerCase(); // temporary

        //setting width and height
        this.canvas.width = 400
        this.canvas.height = 100

        this.drawCharacters()
        
    }

    private drawCharacters():void{
        //console.log(this.sprite)
        
        this.sprite.onload = () => {
            let space:number = 0;
            for (let i = 0; i < this.text.length; i++) {
                const cords:Array<number> = this.letters.getCords(this.text[i])
                this.ctx.drawImage(this.sprite, cords[0], cords[1], 32, 32,this.textOffset + space, 10, 32, 32)
                space += 34
            }
        }
        
    }

    private createLayer():[CanvasRenderingContext2D, HTMLCanvasElement]{
        let canvas:HTMLCanvasElement = document.createElement('canvas')
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
        return [ctx, canvas]
    }

    public showText(ds:number, dy:number):void{
        this.uiCtx.drawImage(this.canvas, ds, dy)
    }

}