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

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\r\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\r\nconst socket_io_1 = __webpack_require__(/*! socket.io */ \"socket.io\");\r\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nconst crypto_js_1 = __webpack_require__(/*! crypto-js */ \"crypto-js\");\r\nconst web3_1 = __importDefault(__webpack_require__(/*! web3 */ \"web3\"));\r\nconst express_session_1 = __importDefault(__webpack_require__(/*! express-session */ \"express-session\"));\r\nconst connect_mongo_1 = __importDefault(__webpack_require__(/*! connect-mongo */ \"connect-mongo\"));\r\nconst Squ3SkinsABI_json_1 = __importDefault(__webpack_require__(/*! ../../contracts/artifacts/Squ3SkinsABI.json */ \"./contracts/artifacts/Squ3SkinsABI.json\"));\r\nconst sdk_1 = __importDefault(__webpack_require__(/*! @pinata/sdk */ \"@pinata/sdk\"));\r\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\r\nconst web3 = new web3_1.default(web3_1.default.givenProvider);\r\nweb3.setProvider(new web3_1.default.providers.HttpProvider('https://rpctest.meter.io/'));\r\nconst app = (0, express_1.default)();\r\nconst port = process.env.PORT;\r\nconst server = http_1.default.createServer(app);\r\nconst io = new socket_io_1.Server(server, {\r\n    cors: {\r\n        origin: '*'\r\n    }\r\n});\r\n// needs to migrate to DB\r\n// for hardcoded cords\r\n// const playersDb:Database = {\r\n//     \"0xadc35b0f0eb14709cbcf28086c505ea976bf8c99\": [-1, 480, 480],\r\n//     \"0x1fb0d6ecb9709b539013c05b6c96201501ee68df\": [-1, 432, 336],\r\n//     \"0x74c4b10f277a59a07be24c0aea1884f9fefeb5c5\": [-1, 480, 336]\r\n// }\r\nconst playersDb = {};\r\nconst lastMap = {};\r\nObject.values(playersDb).forEach(playerData => {\r\n    playerData[1] = playerData[1] / 1.5;\r\n    playerData[2] = playerData[2] / 1.5;\r\n});\r\nconst connectedPlayers = {}; // i need to do connected players per map ;)\r\nconst NUMBER_OF_MAPS = 3;\r\nconst oneDay = 86400000;\r\n// === WEB3 ===\r\n// contract address: 0x425493f30662deB8722ca13DBf265E9a9cfC2CC2\r\nlet abi = Squ3SkinsABI_json_1.default;\r\nconst contractAddress = \"0x425493f30662deB8722ca13DBf265E9a9cfC2CC2\";\r\nlet contract = new web3.eth.Contract(abi, contractAddress);\r\n// function setContractInterface():void{\r\n// }\r\nfunction getNftURI(_id, _indx) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        try {\r\n            const tokenId = yield contract.methods.tokenOfOwnerByIndex(_id, _indx).call();\r\n            const uri = yield contract.methods.tokenURI(tokenId).call();\r\n            return uri;\r\n        }\r\n        catch (err) {\r\n            return \"err\";\r\n        }\r\n        // console.log(tokenId)\r\n    });\r\n}\r\nconst pinata = (0, sdk_1.default)(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);\r\npinata.testAuthentication().then((result) => {\r\n    //handle successful authentication here\r\n    console.log('Pinata status:');\r\n    console.log(result);\r\n}).catch((err) => {\r\n    //handle error here\r\n    console.log(err);\r\n});\r\n// SESSION STUFF\r\n// const connection:Connection = connectToDb()\r\nconst sessionStore = connect_mongo_1.default.create({\r\n    // mongoUrl: 'mongodb://localhost:27017/squ3',\r\n    mongoUrl: process.env.MONGO,\r\n    collectionName: 'sessions'\r\n});\r\n// EXPRESS MIDDLEWARE\r\napp.use((0, cors_1.default)());\r\napp.use(express_1.default.json());\r\n//app.use(express.urlencoded({extended:true})) //destroys everything??\r\nconst sessionMiddleware = (0, express_session_1.default)({\r\n    secret: process.env.SECRET2,\r\n    saveUninitialized: true,\r\n    cookie: { maxAge: oneDay },\r\n    resave: false,\r\n    store: sessionStore\r\n});\r\napp.use(sessionMiddleware);\r\napp.use('/scripts', express_1.default.static(path_1.default.join(process.cwd(), 'dist/client/scripts')));\r\napp.use('/fonts', express_1.default.static(path_1.default.join(process.cwd(), 'dist/client/fonts')));\r\napp.use('/styles', express_1.default.static(path_1.default.join(process.cwd(), 'dist/client/styles')));\r\napp.use('/assets', express_1.default.static(path_1.default.join(process.cwd(), 'assets')));\r\napp.get('/', (req, res) => {\r\n    res.sendFile(path_1.default.join(process.cwd(), 'dist/client/tempauth.html'));\r\n});\r\napp.get('/game', (req, res) => {\r\n    res.sendFile(path_1.default.join(process.cwd(), 'dist/client/index.html'));\r\n});\r\napp.get('/player', (req, res) => {\r\n    if (req.session.userId) {\r\n        // console.log(playersDb)\r\n        // console.log(lastMap)\r\n        if (typeof playersDb[req.session.userId] == 'undefined') {\r\n            playersDb[req.session.userId] = [-1, 480, 480];\r\n            lastMap[req.session.userId] = 1;\r\n        }\r\n        res.json({ map: lastMap[req.session.userId] });\r\n        return;\r\n    }\r\n    res.json({ message: \"error\" });\r\n});\r\nlet authphrase = process.env.AUTH_PHRASE;\r\nlet hashedPhrase = (0, crypto_js_1.SHA256)(authphrase).toString();\r\napp.get('/authphrase', (req, res) => {\r\n    res.json({ hashedPhrase });\r\n});\r\napp.get('/getid', (req, res) => {\r\n    if (req.session.userId) {\r\n        res.json({ message: req.session.userId });\r\n        return;\r\n    }\r\n    res.json({ message: \"error\" });\r\n});\r\napp.post('/mint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\r\n    const name = req.body.name;\r\n    const base64img = req.body.base64;\r\n    const creator = req.body.creator;\r\n    const base64ImgLength = (base64img.length * (3 / 4)) - 2;\r\n    const sourcePath = \"./temp/temp-img.png\";\r\n    const timestamp = Date.now().toString();\r\n    const imgOptions = {\r\n        pinataMetadata: {\r\n            name: name\r\n        },\r\n        pinataOptions: {\r\n            cidVersion: 0\r\n        }\r\n    };\r\n    const jsonOptions = {\r\n        pinataMetadata: {\r\n            name: name + \"Metadata\"\r\n        },\r\n        pinataOptions: {\r\n            cidVersion: 0\r\n        }\r\n    };\r\n    const body = {\r\n        name: name,\r\n        creator: creator,\r\n        timestamp: timestamp,\r\n        imgCid: \"\"\r\n    };\r\n    // console.log(base64img, name)\r\n    if (base64ImgLength < 20000) {\r\n        const preparedBase64 = base64img.replace(/^data:image\\/png;base64,/, \"\");\r\n        yield fs_1.default.writeFile(sourcePath, preparedBase64, 'base64', (info) => {\r\n            pinata.pinFromFS(sourcePath, imgOptions).then((result) => {\r\n                const imgCid = result.IpfsHash;\r\n                body.imgCid = imgCid;\r\n                pinata.pinJSONToIPFS(body, jsonOptions).then((result) => {\r\n                    console.log('Image and metadata placed!');\r\n                    res.json({ response: result.IpfsHash });\r\n                }).catch((err) => {\r\n                    console.log(err);\r\n                });\r\n            }).catch(err => {\r\n                console.log(err);\r\n            });\r\n        });\r\n    }\r\n    console.log('saved');\r\n    // console.log(req.body)\r\n}));\r\napp.get('/contractdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\r\n    const rawId = req.query.id;\r\n    const id = rawId.toLocaleLowerCase();\r\n    const indx = 2;\r\n    const data = yield getNftURI(id, indx);\r\n    res.json({ cid: data });\r\n}));\r\napp.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\r\n    const singature = yield req.body.signature;\r\n    const publicKey = yield req.body.public_key;\r\n    const issuerPublicKey = yield web3.eth.accounts.recover(hashedPhrase, singature);\r\n    if (issuerPublicKey.toLocaleLowerCase() === publicKey) {\r\n        req.session.userId = publicKey;\r\n        req.session.authenticated = true;\r\n        res.json({ \"key\": \"valid\" });\r\n        return;\r\n    }\r\n    res.json({ \"key\": \"err\" });\r\n}));\r\napp.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\r\n    req.session.destroy(() => {\r\n        res.json({ message: \"logout!\" });\r\n    });\r\n}));\r\napp.get('/mapdata', (req, res) => {\r\n    const id = Number(req.query.id);\r\n    if (isNaN(id))\r\n        return;\r\n    const playerDbFormated = Object.entries(playersDb);\r\n    const result = playerDbFormated.filter(entry => entry[1][0] == id);\r\n    const json = Object.fromEntries(result);\r\n    res.json(json);\r\n});\r\nconst mapsCache = [[], [], [], [], []];\r\n// SOCKET.IO PART\r\n// MIDDLEWARE\r\nconst wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);\r\nio.use(wrap(sessionMiddleware));\r\nio.use((socket, next) => {\r\n    const session = socket.request.session;\r\n    if (session && session.authenticated) {\r\n        next();\r\n    }\r\n    else {\r\n        next(new Error(\"unauthorized\"));\r\n    }\r\n});\r\n// SENDING PLAYER POSITIONS ACROSS ALL MAPS\r\nfor (let i = 1; i < NUMBER_OF_MAPS + 1; i++) {\r\n    setTimeout(() => {\r\n        setInterval(() => {\r\n            mapsCache[i].forEach((data) => {\r\n                io.emit(\"map\" + i + \"recv\", data);\r\n            });\r\n            mapsCache[i] = [];\r\n        }, 250);\r\n    }, 50 * i);\r\n}\r\nio.on(\"connection\", socket => {\r\n    const playerId = socket.request.session.userId;\r\n    console.log(\"player \" + playerId + \" connected!\");\r\n    if (typeof playersDb[playerId] !== 'undefined') {\r\n        const mapToSpawn = lastMap[playerId];\r\n        playersDb[playerId][0] = mapToSpawn;\r\n        connectedPlayers[playerId] = true;\r\n        io.emit(\"changeMap\", { from: -1, to: mapToSpawn, who: playerId });\r\n        console.log(playersDb);\r\n        socket.on(\"changeMap\", data => {\r\n            console.log(data);\r\n            if (data.who === playerId) {\r\n                playersDb[data.who][0] = data.to;\r\n                if (data.to !== -1)\r\n                    lastMap[data.who] = data.to;\r\n                sendMapListener(data.to);\r\n            }\r\n            io.emit(\"changeMap\", data);\r\n        });\r\n        socket.on(\"disconnect\", reason => {\r\n            // console.log(connectedPlayers)\r\n            io.emit(\"changeMap\", { from: playersDb[playerId][0], to: -1, who: playerId });\r\n            playersDb[playerId][0] = -1;\r\n            console.log(\"player \" + playerId + \" disconnected!\");\r\n            clearInterval(updatePositionInDBInterval);\r\n            connectedPlayers[playerId] = false;\r\n            delete connectedPlayers[playerId];\r\n        });\r\n        sendMapListener(playersDb[playerId][0]);\r\n        msgBroadcast(playersDb[playerId][0]);\r\n        function msgBroadcast(_mapId) {\r\n            socket.on(\"chat\", (msg) => {\r\n                if (msg.content.length < 125 && msg.content.length > 0) {\r\n                    io.emit(\"chat\", msg);\r\n                }\r\n            });\r\n        }\r\n        function sendMapListener(_mapId) {\r\n            socket.on(\"map\" + _mapId + \"send\", (data) => {\r\n                if (data.id == playerId) {\r\n                    currentPlayerLocation.x = data.x;\r\n                    currentPlayerLocation.y = data.y;\r\n                    mapsCache[_mapId].push(data);\r\n                }\r\n            });\r\n        }\r\n        let currentPlayerLocation = { x: -1, y: -1 };\r\n        function updatePositionInDB() {\r\n            if (currentPlayerLocation.x != -1 || currentPlayerLocation.y != -1) { //??\r\n                playersDb[playerId][1] = currentPlayerLocation.x;\r\n                playersDb[playerId][2] = currentPlayerLocation.y;\r\n            }\r\n        }\r\n        const updatePositionInDBInterval = setInterval(updatePositionInDB, 1000);\r\n        // server-side validation -> trzeba zrobić!! JOI LIBRARY\r\n    }\r\n});\r\nserver.listen(port, () => {\r\n    console.log(\"Server is runinn at port \" + port);\r\n});\r\n\n\n//# sourceURL=webpack://typescript-template/./src/server/index.ts?");

/***/ }),

/***/ "@pinata/sdk":
/*!******************************!*\
  !*** external "@pinata/sdk" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@pinata/sdk");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("connect-mongo");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "crypto-js":
/*!****************************!*\
  !*** external "crypto-js" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("crypto-js");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-session");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "web3":
/*!***********************!*\
  !*** external "web3" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("web3");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

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

/***/ }),

/***/ "./contracts/artifacts/Squ3SkinsABI.json":
/*!***********************************************!*\
  !*** ./contracts/artifacts/Squ3SkinsABI.json ***!
  \***********************************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_tokenURI\",\"type\":\"string\"}],\"name\":\"createCollectible\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenByIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"tokenCounter\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenOfOwnerByIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]');\n\n//# sourceURL=webpack://typescript-template/./contracts/artifacts/Squ3SkinsABI.json?");

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