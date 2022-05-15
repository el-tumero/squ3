import Atlas from "./layers/Atlas";
import GameLoop from "./GameLoop";
import Map from "./Map";
import UI from "./layers/UI";
import map1Data from "./mapsData/map1.json" // importuje dane mapy z pliku
import map2Data from "./mapsData/map2.json"
import map3Data from "./mapsData/map3.json"
import Chat from "./layers/Chat";
import {io} from "socket.io-client"


declare global {
    interface Window {
        userId:any
        otherUserId:any
    }
}
// TO TEŻ MOCNO NA SZYBKO

interface PlayersCords {
    [id: number]: Array<number>
}


var socket = io(process.env.SOCKET_URL!)

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
// transform(a, b, c, d, e, f)
ctx.scale(1.5,1.5)
// canvas 960x960

// loading texture atlas
const atlasImg:HTMLImageElement = new Image();
atlasImg.src = process.env.ASSETS_URL + "atlas.png"

const game = new GameLoop(60, ctx)
let mainAtlas:Atlas;


const mapsData:Array<any> = [map1Data, map2Data, map3Data]

// INFO: na razie działa tylko usuwanie obiektów z warstwy obiektowej, nie znika kolizja, to jest do dodanie i do pomyslenia

// VERY TEMPORARY (TO DELETE SOON GUYS) \/

const urlParams = new URLSearchParams(window.location.search)
const userId = urlParams.get('user');

window.userId = userId
// console.log(userId)

if(userId == '0'){
    window.otherUserId = 1
}

if(userId == '1'){
    window.otherUserId = 0
}




document.addEventListener("changeMap", async (e) => {

    

    //console.log()
    const oldId:number = (<any>e).detail.from as number
    const id:number = (<any>e).detail.to as number
    const mapData = mapsData[id -1]

    socket.emit("changeMap", { from: oldId, to: id, who: userId })

    //console.log(id)
    //console.log("MAP CHANGE!")
    //const realId:number = id - 1

    const response = await fetch('http://localhost:3000/mapdata?id='+ id)
    const playersOnMap = await response.json()


    const nMap = new Map(ctx, id, mainAtlas, mapData.backgroundLayerBlockId, mapData.objList, mapData.colliders, mapData.interactions, socket, playersOnMap)

    

    document.addEventListener("openDoor", (e) => {
        console.log('door opened')
        const x:number = (<any>e).detail.x as number
        const y:number = (<any>e).detail.y as number

        nMap.deleteObject(x, y)
        
    })
    const nChat = new Chat//(false)
    const ui = new UI(ctx, nMap, nChat)

    game.addToDraw([nMap, ui])
    game.addToUpdate([ui, nMap.getOtherPlayersLayer()]) //dodac update innych graczy
    game.addToUpdatePlayer([nMap.getLocalPlayer()])


})


atlasImg.onload = async () => {

    mainAtlas = new Atlas(256, 256, atlasImg, 32)

    const response = await fetch('http://localhost:3000/mapdata?id=1')
    const playersOnMap = await response.json()
    // console.log(json)
    //as PlayersCords

    const map1 = new Map(ctx, 1, mainAtlas, map1Data.backgroundLayerBlockId, map1Data.objList, map1Data.colliders, map1Data.interactions, socket, playersOnMap)
    const chat1 = new Chat//(false)
    const ui = new UI(ctx, map1, chat1)

    game.addToDraw([map1, ui])
    game.addToUpdate([ui, map1.getOtherPlayersLayer()]) // otherPlayers
    game.addToUpdatePlayer([map1.getLocalPlayer()])

    game.startAnimating()

}

