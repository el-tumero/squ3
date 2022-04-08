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
    
    
    constructor(_fps:number){
        this.fps = _fps
    }


    // public update():void;
    // public draw():void;

    public getFrames(){
        return this.frames
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
    
        requestAnimationFrame(this.animate);
        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            // this.update();
            // this.draw(frames);
        }
    }

}








