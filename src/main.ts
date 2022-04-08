import textures from "./textures/textures";
import BackgroundLayer from "./layers/BackgroundLayer";
import Player from "./layers/Player";
import ObjectGrid from "./layers/ObjectGrid";
import ObjectLayer from "./layers/ObjectLayer";
import Atlas from "./layers/Atlas";
import Collision from "./layers/Collision";
import GameLoop from "./GameLoop";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// let secondsPassed:number
// let oldTimeStamp:number
// let fps

// canvas 960x960

// loading texture atlas
const atlasImg:HTMLImageElement = new Image();
atlasImg.src = '../assets/graphics/atlas.png'

const playerImg:HTMLImageElement = new Image();
playerImg.src = '../assets/graphics/spritesheets/player_spritesheet.png'


atlasImg.onload = () => {
    const mainAtlas = new Atlas(256, 256, atlasImg, 32)
    const backgroundLayer = new BackgroundLayer(ctx, mainAtlas, 1)
    const player1 = new Player(ctx, 480-(32/2), 480-(32/2))


    
    playerImg.onload = () => {
        player1.loadSpritesheet(playerImg)
    } 

    const objLayer = new ObjectLayer(ctx, mainAtlas)

    const grid = new ObjectGrid()
    grid.addObject(2, 4, 4)
    grid.addObject(2, 4, 3)
    grid.addObject(2, 24, 24)
    grid.addObject(2, 32, 32)

    grid.addObject(18, 12, 14)

    objLayer.loadObjects(grid)


    

    // crate array of collision blocks
    let collisionBlocks:Array<Collision> = [
        new Collision(4, 4, 32, 32),
        new Collision(4, 3, 32, 32),
        new Collision(12, 14, 32, 32)
    ]

    // loading collision blocks to player
    collisionBlocks.forEach(collider => {
        player1.loadColliders(collisionBlocks)
    });



    const game = new GameLoop(60)

    
// basic game loop
function update() {
    // game.getFrames(frames => {

    // })
    player1.updatePositionInLayers(backgroundLayer, objLayer, frames)
    // player1.animate(frames, 'up')
}
  
function draw(_frames:number) {
    ctx.clearRect(0,0,960,960)
    backgroundLayer.draw()
    objLayer.draw()
    player1.draw(_frames)
}



// gameloop = new GameLoop

//gameloop.startAnimating(60)
// gameloop.draw(() => {
// player1.draw()
//})

// gameloop.update(frames => {
// player1.animate(frames)
//})


// startAnimating(60);




}

