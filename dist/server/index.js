/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nconst socket_io_1 = __webpack_require__(/*! socket.io */ \"socket.io\");\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst app = (0, express_1.default)();\nconst port = 3000;\nconst server = http_1.default.createServer(app);\nconst io = new socket_io_1.Server(server, {\n    cors: {\n        origin: '*'\n    }\n});\n// for hardcoded cords\nconst playersDb = {\n    0: [1, 480, 480],\n    1: [1, 432, 336]\n};\nObject.values(playersDb).forEach(playerData => {\n    playerData[1] = playerData[1] / 1.5;\n    playerData[2] = playerData[2] / 1.5;\n});\nconst connectedPlayers = {}; // i need to do connected players per map ;)\nconst NUMBER_OF_MAPS = 3;\n// console.log(Object.entries(playersDb))\n// function getKeyByValue(object:any, value:any) {\n//     return Object.keys(object).find(key => object[key][0] === value);\n//   }\napp.use((0, cors_1.default)());\napp.get('/', (req, res) => {\n    res.send('Test');\n});\napp.get('/player', (req, res) => {\n    const id = Number(req.query.id);\n    if (isNaN(id))\n        return;\n    res.json({ \"map\": playersDb[id][0] });\n});\napp.get('/mapdata', (req, res) => {\n    const id = req.query.id;\n    const playerDbFormated = Object.entries(playersDb);\n    const result = playerDbFormated.filter(entry => entry[1][0] == id);\n    const json = Object.fromEntries(result);\n    res.json(json);\n});\napp.use('/assets', express_1.default.static(path_1.default.join(process.cwd(), 'assets')));\nconst mapsCache = [[], [], [], [], []];\n// console.log(mapsCache[1])\nfor (let i = 1; i < NUMBER_OF_MAPS + 1; i++) {\n    setTimeout(() => {\n        setInterval(() => {\n            mapsCache[i].forEach((data) => {\n                io.emit(\"map\" + i + \"recv\", data);\n            });\n            mapsCache[i] = [];\n        }, 250);\n    }, 50 * i);\n}\nio.on(\"connection\", socket => {\n    const playerId = socket.handshake.query.id;\n    if (playerId == 'null')\n        return;\n    // if(playerId.length == 0) return\n    const playerIdNum = Number(playerId);\n    console.log(\"player \" + playerId + \" connected!\");\n    connectedPlayers[playerId] = true;\n    let location = { id: -1, x: -1, y: -1 };\n    socket.on(\"changeMap\", data => {\n        playersDb[data.who][0] = data.to;\n        io.emit(\"changeMap\", data);\n        sendMapListener(data.to);\n    });\n    socket.on(\"disconnect\", reason => {\n        console.log(\"player \" + playerId + \" disconnected!\");\n        clearInterval(updatePositionInDBInterval);\n        connectedPlayers[playerId] = false;\n        delete connectedPlayers[playerId];\n    });\n    sendMapListener(playersDb[playerIdNum][0]);\n    msgBroadcast(playersDb[playerIdNum][0]);\n    function msgBroadcast(_mapId) {\n        socket.on(\"map\" + _mapId + \"chat\", (msg) => {\n            io.emit(\"map\" + _mapId + \"chat\", msg);\n        });\n    }\n    function sendMapListener(_mapId) {\n        socket.on(\"map\" + _mapId + \"send\", (data) => {\n            // console.log(_mapId)\n            if (data.id == playerIdNum) {\n                location = data;\n                mapsCache[_mapId].push(data);\n            }\n        });\n    }\n    function updatePositionInDB() {\n        if (location.id != -1) {\n            playersDb[playerIdNum][1] = location.x;\n            playersDb[playerIdNum][2] = location.y;\n            // console.log(playersDb[playerIdNum])\n        }\n    }\n    const updatePositionInDBInterval = setInterval(updatePositionInDB, 1000);\n    // server-side validation -> trzeba zrobić!! JOI LIBRARY\n});\nserver.listen(port, () => {\n    console.log(\"Server is runinn at port \" + port);\n});\n\n\n//# sourceURL=webpack://typescript-template/./src/server/index.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.ts");
/******/ 	
/******/ })()
;