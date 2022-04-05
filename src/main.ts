import textures from "./textures/textures";
import BackgroundLayer from "./layers/BackgroundLayer";
import Player from "./layers/Player";
import ObjectGrid from "./layers/ObjectGrid";
import ObjectLayer from "./layers/ObjectLayer";
import Atlas from "./layers/Atlas";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// canvas 960x960

// loading texture atlas
const atlasImg:HTMLImageElement = new Image();
atlasImg.src = '../assets/graphics/atlas.png'

atlasImg.onload = () => {
    const mainAtlas = new Atlas(256, 256, atlasImg, 32)
    const backgroundLayer = new BackgroundLayer(ctx, mainAtlas, 1)
    

    const objLayer = new ObjectLayer(ctx, mainAtlas)

    const grid = new ObjectGrid()
    grid.addObject(2, 4, 4)
    grid.addObject(2, 24, 24)
    grid.addObject(2, 32, 32)

    grid.addObject(2, 12, 14)


    for (let i = 0; i < 6; i++) {
        grid.addObject(2, 3, i)
        grid.addObject(2, 4, i)
        
    }


    objLayer.loadObjects(grid)


    const player1 = new Player(ctx, 480-(32/2), 480-(32/2), mainAtlas, 18)


// basic game loop
function update() {
    player1.updatePositionInLayers(backgroundLayer, objLayer)
}
  
function draw() {
    ctx.clearRect(0,0,960,960)
    backgroundLayer.draw()
    objLayer.draw()
    player1.draw()
}
  
function loop() {
    update()
    draw()
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)

}