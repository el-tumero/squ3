import TextureLayer from "./TextureLayer";
import Map from "../Map";

export default class UI extends TextureLayer {

    mapRef:Map

    constructor(_domCtx: CanvasRenderingContext2D, _mapRef:Map){
        super(_domCtx)
        this.mapRef = _mapRef
        this.canvas.width = 960
        this.canvas.height = 960

        this.initializeListeners()
    }

    private initializeListeners(){
        document.addEventListener("keydown", e => {
            if(e.key === "e"){
                this.mapRef.localPlayer.interactions.forEach(interaction => {
                    if(interaction.isInRange) console.log("Interaction!")
                });

            }
        })
    }


    private drawHint():void{
        this.mapRef.localPlayer.interactions.forEach(interaction => {
            if(interaction.isInRange) this.ctx.fillRect(480, 800, 200, 80)
            else this.ctx.clearRect(0, 0, 960, 960)
        });
    }
        
    public draw():void {
        this.drawHint()
        this.domCtx.drawImage(this.canvas, 0,0)
    }

}