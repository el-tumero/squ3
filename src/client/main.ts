import Atlas from "./layers/Atlas";
import GameLoop from "./GameLoop";
import Map from "./Map";
import UI from "./layers/UI";
import map1Data from "./mapsData/map1.json" // importuje dane mapy z pliku
import map2Data from "./mapsData/map2.json"
import map3Data from "./mapsData/map3.json"
import Chat from "./layers/Chat";


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
// transform(a, b, c, d, e, f)
ctx.scale(1.5,1.5)
// canvas 960x960

// loading texture atlas
const atlasImg:HTMLImageElement = new Image();
atlasImg.src = '../assets/graphics/atlas.png'

const game = new GameLoop(60, ctx)
let mainAtlas:Atlas;


const mapsData:Array<any> = [map1Data, map2Data, map3Data]

// INFO: na razie działa tylko usuwanie obiektów z warstwy obiektowej, nie znika kolizja, to jest do dodanie i do pomyslenia

document.addEventListener("changeMap", (e) => {
    //console.log()

    const id:number = (<any>e).detail.to as number
    const mapData = mapsData[id -1]
    //console.log("MAP CHANGE!")

    const nMap = new Map(ctx, id, mainAtlas, mapData.backgroundLayerBlockId, mapData.objList, mapData.colliders, mapData.interactions)

    document.addEventListener("openDoor", (e) => {
        console.log('door opened')
        const x:number = (<any>e).detail.x as number
        const y:number = (<any>e).detail.y as number

        nMap.deleteObject(x, y)
        
    })
    const nChat = new Chat//(false)
    const ui = new UI(ctx, nMap, nChat)

    game.addToDraw([nMap, ui])
    game.addToUpdate([ui])
    game.addToUpdatePlayer([nMap.getLocalPlayer()])


})


atlasImg.onload = () => {
    mainAtlas = new Atlas(256, 256, atlasImg, 32)

    const map1 = new Map(ctx, 1, mainAtlas, map1Data.backgroundLayerBlockId, map1Data.objList, map1Data.colliders, map1Data.interactions)
    const chat1 = new Chat//(false)
    const ui = new UI(ctx, map1, chat1)

    game.addToDraw([map1, ui])
    game.addToUpdate([ui])
    game.addToUpdatePlayer([map1.getLocalPlayer()])

    game.startAnimating()

}
