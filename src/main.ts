import textures from "./textures/textures";
// import TextureLayer from "./TextureLayer";
import BackgroundLayer from "./layers/BackgroundLayer";
import Player from "./layers/Player";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// canvas 960x960



// wait til textures load ;)
textures[0].onload = () => {
    const backgroundLayer = new BackgroundLayer(ctx, textures[0])
    // backgroundLayer.draw()

    const player1 = new Player(ctx, 200, 200, textures[1])


// basic game loop
function update() {
    player1.updatePosition()
}
  
function draw() {
    backgroundLayer.draw()
    player1.draw()
}
  
function loop() {
    update()
    draw()
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)

}