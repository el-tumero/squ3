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

    mapRef:Map
    intrRef:Interaction | null = null
    isDetected:boolean = false
    isActive:boolean = false
    panelTexture:HTMLImageElement = new Image()
    font:Letters
    testTextArea:Textarea

    constructor(_domCtx: CanvasRenderingContext2D, _mapRef:Map){
        super(_domCtx)
        this.mapRef = _mapRef
        this.canvas.width = 960
        this.canvas.height = 960

        this.loadTextures() 

        this.initializeListeners()

        this.font = new Letters()
        this.testTextArea = new Textarea(this.font, this.ctx, "kliknij_e")
        
    }

    private loadTextures():void{
        const panelTexture:HTMLImageElement = new Image();
        panelTexture.src = "../assets/graphics/ui/panel.png"
        panelTexture.onload = () => {
            this.panelTexture = panelTexture;
        }

        
    }

    private initializeListeners(){
        document.addEventListener("keydown", e => {
            if(e.key === "e"){
                if(this.intrRef !== null && this.intrRef.isInRange && !this.isActive){
                    this.isActive = true
                }
            }
        })
    }

    private detectInteraction():void{

        this.mapRef.localPlayer.interactions.forEach(interaction => {
            if(interaction.isInRange){
                this.intrRef = interaction
                this.isDetected = true
            } 
        });

        if(this.intrRef !== null && !this.intrRef.isInRange){
            this.isDetected = false
            this.isActive = false
        }


    }

    private drawHint():void{
        if(this.isDetected && !this.isActive){
            this.ctx.drawImage(this.panelTexture, 280, 800)//this.ctx.fillRect(480-200, 800, 400, 100)
            this.testTextArea.showText(280, 800)
        } 
        if(this.isDetected && this.isActive) {
            this.ctx.clearRect(0,0 ,960, 960)
            this.ctx.fillRect(320,320,100,100)
        }
        if (!this.isDetected && !this.isActive ) this.ctx.clearRect(0,0,960,960)
    }

    // private drawInteraction():void{
    //     if(this.isActive) this.ctx.fillRect(100, 100, 0, 0)
    // }

    public update(): void {
        this.detectInteraction()
    }
        
    public draw():void {
        this.drawHint()
        this.domCtx.drawImage(this.canvas, 0,0)
    }

}