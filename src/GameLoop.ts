import Player from "./layers/Player";

export default class GameLoop{
    stop:boolean = false;
    frameCount:number = 0;
    fps:number 
    elapsed:number = 0
    fpsInterval:number = 0
    frames:number = 0
    now:number = 0
    then:number = 0
    startTime:number = 0
    drawArr:Array<any> = []
    updateArr:Array<any> = []

    ctx:CanvasRenderingContext2D
    
    
    constructor(_fps:number, _ctx:CanvasRenderingContext2D){
        this.fps = _fps
        this.ctx = _ctx
    }

    public addToDraw(_thingsToDraw:Array<any>){
        this.drawArr = _thingsToDraw
    }// bardziej dodanie arraya do arraya bedzie lepsze

    public addToUpdate(_thingsToUpdate:Array<any>){
        this.updateArr = _thingsToUpdate
    }

    private update():void{
        this.updateArr.forEach(element => {
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

    public startAnimating(fps:number) {
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
            this.draw();
        }
    }

}








