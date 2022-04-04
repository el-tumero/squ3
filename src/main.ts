import textures from "./textures/textures";
// import TextureLayer from "./TextureLayer";
import BackgroundLayer from "./layers/BackgroundLayer";
import Player from "./layers/Player";
import ObjectGrid from "./layers/ObjectGrid";
import ObjectLayer from "./layers/ObjectLayer";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// canvas 960x960


// console.log(obj.grid);

// wait til textures load ;)
textures[2].onload = () => {
    const backgroundLayer = new BackgroundLayer(ctx, textures[0])
    // backgroundLayer.draw()
    const objLayer = new ObjectLayer(ctx, textures)

    const obj = new ObjectGrid()
    obj.addObject(2, 4, 4)
    obj.addObject(2, 24, 24)

    objLayer.loadObjects(obj)


    const player1 = new Player(ctx, 192, 192, textures[1])


// basic game loop
function update() {
    player1.updatePosition()
}
  
function draw() {
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