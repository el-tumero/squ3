import Letters from "./Letters";

export default class Textarea{

    private sprite:HTMLImageElement
    private letters:Letters
 

    private canvas:HTMLCanvasElement
    private ctx:CanvasRenderingContext2D
    private uiCtx:CanvasRenderingContext2D
    private text:string
    private textOffset:number = 20
    private interactionButton:string = "e"
    
    
    constructor(_letters:Letters, _uiCtx:CanvasRenderingContext2D, _text:string){
        this.letters = _letters
        this.sprite = _letters.getSprite()

        const [_ctx, _canvas] = this.createLayer()
        this.canvas = _canvas
        this.ctx = _ctx
        this.uiCtx = _uiCtx

        this.text = _text.toLocaleLowerCase(); // keys are lowercase

        //setting width and height
        this.canvas.width = 400
        this.canvas.height = 100

        //this.drawCharacters()
        
    }

    public changeText(_text:string):void{
        //console.log(this.text)
        if(this.text !== _text){
            this.text = _text.toLocaleLowerCase()
            this.drawCharacters()
        }
        
    }

    private drawCharacters():void{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        let space:number = 0;
            for (let i = 0; i < this.text.length; i++) {
                const cords:Array<number> = this.letters.getCords(this.text[i])
                this.ctx.drawImage(this.sprite, cords[0], cords[1], 32, 32,this.textOffset + space, 10, 32, 32)
                space += 34
            }
        space = 0

        const pressText:string = `press_${this.interactionButton}`
        for (let i = 0; i < pressText.length; i++) {
            const cords:Array<number> = this.letters.getCords(pressText[i])
            this.ctx.drawImage(this.sprite, cords[0], cords[1], 32, 32,this.textOffset + space, 42, 32, 32)
            space += 34
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