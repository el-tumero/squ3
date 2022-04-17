import Atlas from "./layers/Atlas";
import GameLoop from "./GameLoop";
import Map from "./Map";
import UI from "./layers/UI";
import map1Data from "./mapsData/map1.json" // importuje dane mapy z pliku
import map2Data from "./mapsData/map2.json"

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// canvas 960x960

// loading texture atlas
const atlasImg:HTMLImageElement = new Image();
atlasImg.src = '../assets/graphics/atlas.png'

const game = new GameLoop(60, ctx)
let mainAtlas:Atlas;


const mapsData:Array<any> = [map1Data, map2Data]


document.addEventListener("changeMap", (e) => {
    //console.log()

    const id:number = (<any>e).detail.to as number
    const mapData = mapsData[id -1]
    //console.log("MAP CHANGE!")

    const nMap = new Map(ctx, id, mainAtlas, mapData.backgroundLayerBlockId, mapData.objGrid, mapData.colliders, mapData.interactions)

    const ui = new UI(ctx, nMap)

    game.addToDraw([nMap.backgroundLayer, nMap.objectLayer, nMap.localPlayer, ui])
    game.addToUpdate([ui])
    game.addToUpdatePlayer([nMap.localPlayer])


})


atlasImg.onload = () => {
    mainAtlas = new Atlas(256, 256, atlasImg, 32)

    const map1 = new Map(ctx, 1, mainAtlas, map1Data.backgroundLayerBlockId, map1Data.objGrid, map1Data.colliders, map1Data.interactions)

    const ui = new UI(ctx, map1)


    game.addToDraw([map1.backgroundLayer, map1.objectLayer, map1.localPlayer, ui])
    game.addToUpdate([ui])
    game.addToUpdatePlayer([map1.localPlayer])

    game.startAnimating(60)


}

