import Atlas from "./layers/Atlas";
import GameLoop from "./GameLoop";
import Map from "./Map";
import UI from "./layers/UI";
import map1Data from "./mapsData/map1.json" // importuje dane mapy z pliku
import map2Data from "./mapsData/map2.json"
import map3Data from "./mapsData/map3.json"
import Chat from "./layers/Chat";
import {io, Socket} from "socket.io-client"


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






// INFO: na razie działa tylko usuwanie obiektów z warstwy obiektowej, nie znika kolizja, to jest do dodanie i do pomyslenia

// VERY TEMPORARY (TO DELETE SOON GUYS) \/

// const urlParams = new URLSearchParams(window.location.search)
// const userId = urlParams.get('user');
// window.userId = userId

// ENTRY SETUP



(async () => {
    
    const state:boolean = await getUserId()
    if(state){
        var socket =  await io(process.env.SOCKET_URL!)
        start(socket)
    }

})()


async function getUserId():Promise<boolean>{
    const resUserId = await fetch('/getId')
    const resJson = await resUserId.json()
    const userPublickey = resJson.message

    if(userPublickey == "error"){
        alert("User not authenticated!")
        return false
    }

    window.userId = userPublickey
    console.log(userPublickey)
    return true



    
}






// canvas 960x960



function start(socket:Socket){

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.scale(1.5,1.5)

// loading texture atlas
const atlasImg:HTMLImageElement = new Image();
atlasImg.src = process.env.ASSETS_URL + "atlas.png"

const game = new GameLoop(60, ctx)
let mainAtlas:Atlas;

const mapsData:Array<any> = [map1Data, map2Data, map3Data]

let ui:UI | null

let currentMap:Map | null

document.addEventListener("changeMap", async (e) => {

    currentMap?.turnOffListeners()
    game.clearArrays()

    //console.log()
    const oldId:number = (<any>e).detail.from as number
    const id:number = (<any>e).detail.to as number
    const mapData = mapsData[id -1]

    

    //console.log(id)
    //console.log("MAP CHANGE!")
    //const realId:number = id - 1

    const response = await fetch(process.env.GENERAL_URL + 'mapdata?id='+ id)
    const playersOnMap = await response.json()


    currentMap = new Map(ctx, id, mainAtlas, mapData.backgroundLayerBlockId, mapData.objList, mapData.colliders, mapData.interactions, socket, playersOnMap)


    // document.addEventListener("openDoor", (e) => {
    //     console.log('door opened')
    //     const x:number = (<any>e).detail.x as number
    //     const y:number = (<any>e).detail.y as number

    //     currentMap?.deleteObject(x, y)
        
    //})
    //const nChat = new Chat(socket, id)//(false)
    ui = new UI(ctx, currentMap, socket)

    game.addToDraw([currentMap, ui])
    game.addToUpdate([ui, currentMap.getOtherPlayersLayer()]) //dodac update innych graczy
    game.addToUpdatePlayer([currentMap.getLocalPlayer()])


})


atlasImg.onload = async () => {
    console.log("Graphics loaded!")

    mainAtlas = new Atlas(256, 256, atlasImg, 32)

    const playerResponse = await fetch(process.env.GENERAL_URL+ 'player')
    const localPlayerData = await playerResponse.json()

    // console.log(localPlayerData)
    

    const mapResponse = await fetch(process.env.GENERAL_URL+ 'mapdata?id=' + localPlayerData.map)
    const playersOnMap = await mapResponse.json()

    // console.log(playersOnMap)


    const mapData = mapsData[localPlayerData.map - 1]  

    currentMap = new Map(ctx, localPlayerData.map, mainAtlas, mapData.backgroundLayerBlockId, mapData.objList, mapData.colliders, mapData.interactions, socket, playersOnMap)
    const chat = new Chat(socket, localPlayerData.map)//(false)
    ui = new UI(ctx, currentMap, socket, chat)



    game.addToDraw([currentMap, ui])
    game.addToUpdate([ui, currentMap.getOtherPlayersLayer()]) // otherPlayers
    game.addToUpdatePlayer([currentMap.getLocalPlayer()])

    game.startAnimating()

}
}
