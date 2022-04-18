import Atlas from "./layers/Atlas";
import GameLoop from "./GameLoop";
import Map from "./Map";
import UI from "./layers/UI";
import map1Data from "./mapsData/map1.json" // importuje dane mapy z pliku
import map2Data from "./mapsData/map2.json"
import ObjectGrid from "./layers/ObjectGrid";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
// ctx.scale(1.75,1.75)

// canvas 960x960

// loading texture atlas
const atlasImg:HTMLImageElement = new Image();
atlasImg.src = '../assets/graphics/atlas.png'

const game = new GameLoop(60, ctx)
let mainAtlas:Atlas;


const mapsData:Array<any> = [map1Data, map2Data]

// INFO: na razie działa tylko usuwanie obiektów z warstwy obiektowej, nie znika kolizja, to jest do dodanie i do pomyslenia

document.addEventListener("changeMap", (e) => {
    //console.log()

    const id:number = (<any>e).detail.to as number
    const mapData = mapsData[id -1]
    //console.log("MAP CHANGE!")

    const nMap = new Map(ctx, id, mainAtlas, mapData.backgroundLayerBlockId, mapData.objList, mapData.colliders, mapData.interactions)
    // ^ objGrid byl dodany, a objLayer nie ?
    // tak ma być bo ObjectLayer jest tworzony na postawie objGrid tam dalej więc 
    // dobra wiem gdze jest błąd, ktory ci wszystko mieszal, mamy ObjectGrid jako klase i objGrid jako atrybut elemntu json
    // zmienie jego nazwe na objList zeby sie nie mieszalo (robie zmiany w jsonie i w mainie)

    document.addEventListener("openDoor", (e) => {
        // dzieki arrow function na gorze i tutaj e w document.addEventlistener("openDoor") i e w document.addeventListner("changeMap") to inne e
        // jesli to nie jasne to napisz
        console.log('door opened')
        const x:number = (<any>e).detail.x as number
        const y:number = (<any>e).detail.y as number
        //console.log()
        // usuwanko
        nMap.objectLayer.deleteObject(x, y)
        
    })

    const ui = new UI(ctx, nMap)

    game.addToDraw([nMap.backgroundLayer, nMap.objectLayer, nMap.localPlayer, ui])
    game.addToUpdate([ui])
    game.addToUpdatePlayer([nMap.localPlayer])


})


atlasImg.onload = () => {
    mainAtlas = new Atlas(256, 256, atlasImg, 32)

    const map1 = new Map(ctx, 1, mainAtlas, map1Data.backgroundLayerBlockId, map1Data.objList, map1Data.colliders, map1Data.interactions)
    // gdzie ma byc ten objGrid dodany i jak ? ? ? 
    const ui = new UI(ctx, map1)

    
    game.addToDraw([map1.backgroundLayer, map1.objectLayer, map1.localPlayer, ui])
    game.addToUpdate([ui])
    game.addToUpdatePlayer([map1.localPlayer])

    game.startAnimating(60)


}

