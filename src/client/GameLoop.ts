import Player from "./layers/Player";

export default class GameLoop{
    private stop:boolean = false;
    private frameCount:number = 0;
    private fps:number 
    private elapsed:number = 0
    private fpsInterval:number = 0
    private frames:number = 0
    private now:number = 0
    private then:number = 0
    private startTime:number = 0
    private drawArr:Array<any> = []
    private updatePlayerArr:Array<any> = []
    private updateArr:Array<any> = []
    private ctx:CanvasRenderingContext2D
    
    
    constructor(_fps:number, _ctx:CanvasRenderingContext2D){
        this.fps = _fps
        this.ctx = _ctx
    }

    public addToDraw(_thingsToDraw:Array<any>){
        this.drawArr = _thingsToDraw
    }

    public addToUpdatePlayer(_thingsToUpdate:Array<any>){
        this.updatePlayerArr = _thingsToUpdate
        // console.log(process.env.ASSETSURL)
    }

    public addToUpdate(_thingsToUpdate:Array<any>):void{
        this.updateArr = _thingsToUpdate
    }


    public clearArrays():void{
        this.drawArr = []
        this.updatePlayerArr = []
        this.updateArr = []
    }

    private update():void{
        this.updateArr.forEach(element => {
            element.update(this.frames)
        })
    }

    private updatePlayer():void{
        this.updatePlayerArr.forEach(element => {
            element.updatePositionInLayers(this.frames)
        })
    }

    private draw():void{
        this.ctx.clearRect(0,0,960,960)
        this.drawArr.forEach(element => {

           element.draw()
            
        });
    }


    private framesUpdate(){
        this.frames++;
        if (this.frames == 60) this.frames = 0;
    }

    public startAnimating() {
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
        
        this.animate();
    }

    private animate() {
        if (this.stop) {
            return;
        }
        this.framesUpdate()
        requestAnimationFrame(() => this.animate());

        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            // this.loop()
            this.update();
            this.updatePlayer();
            this.draw();
        }
    }

}








