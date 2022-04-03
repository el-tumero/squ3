import TextureLayer from "./TextureLayer";

export default class Player extends TextureLayer{
    x:number
    y:number
    mvUp:boolean
    mvDown:boolean
    mvRight:boolean
    mvLeft:boolean
    skin:HTMLImageElement
    speed:number = 3

    constructor(_domCtx: CanvasRenderingContext2D, _x:number, _y:number, _skin:HTMLImageElement){
        super(_domCtx)
        this.x = _x
        this.y = _y
        this.mvUp = false
        this.mvDown = false
        this.mvRight = false
        this.mvLeft = false
        this.skin = _skin
        this.initControls()
    }

    private initControls():void{
        document.addEventListener('keydown', e=> {
            if(e.key == "ArrowUp"){
                this.mvUp = true
            }
            if(e.key == "ArrowDown"){
                this.mvDown = true
            }
            if(e.key == "ArrowRight"){
                this.mvRight = true
            }
            if(e.key == "ArrowLeft"){
                this.mvLeft = true
            }
            
        })

        document.addEventListener('keyup', e=> {
            if(e.key == "ArrowUp"){
                this.mvUp = false
            }
            if(e.key == "ArrowDown"){
                this.mvDown = false
            }
            if(e.key == "ArrowRight"){
                this.mvRight = false
            }
            if(e.key == "ArrowLeft"){
                this.mvLeft = false
            }
        })
    }

    public updatePosition():void{
        if(this.mvUp) this.y -= this.speed
        if(this.mvDown) this.y += this.speed
        if(this.mvRight) this.x += this.speed
        if(this.mvLeft) this.x -= this.speed

    }

    public draw():void{
        this.domCtx.drawImage(this.skin, this.x, this.y)
    }


}