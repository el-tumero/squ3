import BackgroundLayer from "./layers/BackgroundLayer";
import Player from "./layers/Player";
import ObjectGrid from "./layers/ObjectGrid";
import ObjectLayer from "./layers/ObjectLayer";
import Atlas from "./layers/Atlas";
import Collision from "./layers/Collision";
import GameLoop from "./GameLoop";
import Map from "./Map";
import Interaction from "./layers/Interaction";
import UI from "./layers/UI";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// canvas 960x960

// loading texture atlas
const atlasImg:HTMLImageElement = new Image();
atlasImg.src = '../assets/graphics/atlas.png'



atlasImg.onload = () => {
    const mainAtlas = new Atlas(256, 256, atlasImg, 32)

    const objGrid = [
        {id: 2, x: 4,y: 4},
        {id: 2, x: 4,y: 3},
        {id: 3, x: 6,y: 8},
        {id: 2, x: 24,y: 24},
        {id: 2, x: 32,y: 32},
        {id: 18, x: 12,y: 14},

    ]

    const colliders = [
        {x: 4, y: 4},
        {x: 4, y: 3},
        {x: 12, y: 14},
        {x: 6, y: 8},
    ]

    const map1 = new Map(ctx, 1, mainAtlas, 1, objGrid, colliders)

    const ui = new UI(ctx, map1)

    const game = new GameLoop(60, ctx)

    game.addToDraw([map1.backgroundLayer, map1.objectLayer, map1.localPlayer, ui])
    game.addToUpdate([ui])
    game.addToUpdatePlayer([map1.localPlayer])

    game.startAnimating(60)


}

