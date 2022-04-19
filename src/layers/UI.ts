import TextureLayer from "./TextureLayer";
import Map from "../Map";
import Interaction from "./Interaction";
import Letters from "./ui/Letters";
import Textarea from "./ui/Textarea";

type UITextureSet = {
    panel:HTMLImageElement
    // letters:HTMLCanvasElement
}

export default class UI extends TextureLayer {

    private mapRef:Map
    private intrRef:Interaction | null = null
    private isDetected:boolean = false
    private isActive:boolean = false
    private panelTexture:HTMLImageElement = new Image()
    private font:Letters
    private hintTextarea:Textarea

    constructor(_domCtx: CanvasRenderingContext2D, _mapRef:Map){
        super(_domCtx)
        this.mapRef = _mapRef
        this.canvas.width = 960
        this.canvas.height = 960

        this.loadTextures() 

        this.initializeListeners()

        this.font = new Letters()
        this.hintTextarea = new Textarea(this.font, this.ctx, "")
        
    }

    private loadTextures():void{
        const panelTexture:HTMLImageElement = new Image();
        panelTexture.src = "../assets/graphics/ui/panel.png"
        panelTexture.onload = () => {
            this.panelTexture = panelTexture;
        }

        
    }

    private initializeListeners():void{
        document.addEventListener("keydown", e => {
            if(e.key === "e"){
                if(this.intrRef !== null && this.intrRef.isInRange() && !this.isActive){
                    this.isActive = true
                    if(this.intrRef.getType() === 'talk') console.log('Hi bro!')
                    if (this.intrRef.getType() === 'open' )
                    {
                        console.log('open da door')
                        
                        
                        const doorOpenEvent:CustomEvent = new CustomEvent('openDoor', {detail: {x: this.intrRef.getX(), y:this.intrRef.getY()}});
                        document.dispatchEvent(doorOpenEvent)
                    }
                    
                    if(this.intrRef.getInfo().includes("portal")){
                        let mapId:number = Number(this.intrRef.getInfo()[6])
                        const mapChangeEvent:CustomEvent = new CustomEvent('changeMap', {detail: {to: mapId} });
                        document.dispatchEvent(mapChangeEvent)
                    }
                }
            }
        })
    }

    private detectInteraction():void{
        
        this.mapRef.getLocalPlayer().getInteractions().forEach(interaction => {
            if(interaction.isInRange()){
                this.intrRef = interaction
                this.isDetected = true
                this.hintTextarea.changeText(interaction.getType())
            }
        });

        if(this.intrRef !== null && !this.intrRef.isInRange()){
            this.isDetected = false
            this.isActive = false
        }


    }

    private drawHint():void{
        if(this.isDetected && !this.isActive){
            this.ctx.drawImage(this.panelTexture, 280, 800)//this.ctx.fillRect(480-200, 800, 400, 100)
            this.hintTextarea.showText(280, 800)
        } 
        if(this.isDetected && this.isActive) {
            this.ctx.clearRect(0,0 ,960, 960)
            // this.ctx.fillRect(320,320,100,100)
        }
        if (!this.isDetected && !this.isActive ) this.ctx.clearRect(0,0,960,960)
    }


    public update(): void {
        this.detectInteraction()
    }
        
    public draw():void {
        this.drawHint()
        this.domCtx.drawImage(this.canvas, 0,0)
    }

}