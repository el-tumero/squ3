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

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\nconst socket_io_1 = __webpack_require__(/*! socket.io */ \"socket.io\");\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst crypto_js_1 = __webpack_require__(/*! crypto-js */ \"crypto-js\");\nconst web3_1 = __importDefault(__webpack_require__(/*! web3 */ \"web3\"));\nconst express_session_1 = __importDefault(__webpack_require__(/*! express-session */ \"express-session\"));\nconst connect_mongo_1 = __importDefault(__webpack_require__(/*! connect-mongo */ \"connect-mongo\"));\nconst Squ3SkinsABI_json_1 = __importDefault(__webpack_require__(/*! ../../contracts/artifacts/Squ3SkinsABI.json */ \"./contracts/artifacts/Squ3SkinsABI.json\"));\nconst sdk_1 = __importDefault(__webpack_require__(/*! @pinata/sdk */ \"@pinata/sdk\"));\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst web3 = new web3_1.default(web3_1.default.givenProvider);\nweb3.setProvider(new web3_1.default.providers.HttpProvider('https://rpctest.meter.io/'));\nconst app = (0, express_1.default)();\nconst port = Number(process.env.PORT);\nconst server = http_1.default.createServer(app);\nconst io = new socket_io_1.Server(server, {\n    cors: {\n        origin: '*'\n    }\n});\n// needs to migrate to DB\n// for hardcoded cords\n// const playersDb:Database = {\n//     \"0xadc35b0f0eb14709cbcf28086c505ea976bf8c99\": [-1, 480, 480],\n//     \"0x1fb0d6ecb9709b539013c05b6c96201501ee68df\": [-1, 432, 336],\n//     \"0x74c4b10f277a59a07be24c0aea1884f9fefeb5c5\": [-1, 480, 336]\n// }\nconst playersDb = {};\nconst lastMap = {};\nObject.values(playersDb).forEach(playerData => {\n    playerData[1] = playerData[1] / 1.5;\n    playerData[2] = playerData[2] / 1.5;\n});\nconst connectedPlayers = {}; // i need to do connected players per map ;)\nconst NUMBER_OF_MAPS = 3;\nconst oneDay = 86400000;\n// === WEB3 ===\n// contract address: 0x425493f30662deB8722ca13DBf265E9a9cfC2CC2\nlet abi = Squ3SkinsABI_json_1.default;\nconst contractAddress = \"0x425493f30662deB8722ca13DBf265E9a9cfC2CC2\";\nlet contract = new web3.eth.Contract(abi, contractAddress);\n// function setContractInterface():void{\n// }\nfunction getNftURI(_id, _indx) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const tokenId = yield contract.methods.tokenOfOwnerByIndex(_id, _indx).call();\n            const uri = yield contract.methods.tokenURI(tokenId).call();\n            return uri;\n        }\n        catch (err) {\n            return \"err\";\n        }\n        // console.log(tokenId)\n    });\n}\nconst pinata = (0, sdk_1.default)(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);\npinata.testAuthentication().then((result) => {\n    //handle successful authentication here\n    console.log('Pinata status:');\n    console.log(result);\n}).catch((err) => {\n    //handle error here\n    console.log(err);\n});\n// SESSION STUFF\n// const connection:Connection = connectToDb()\nconst sessionStore = connect_mongo_1.default.create({\n    // mongoUrl: 'mongodb://localhost:27017/squ3',\n    mongoUrl: process.env.MONGO,\n    collectionName: 'sessions'\n});\n// EXPRESS MIDDLEWARE\napp.use((0, cors_1.default)());\napp.use(express_1.default.json());\n//app.use(express.urlencoded({extended:true})) //destroys everything??\nconst sessionMiddleware = (0, express_session_1.default)({\n    secret: process.env.SECRET2,\n    saveUninitialized: true,\n    cookie: { maxAge: oneDay },\n    resave: false,\n    store: sessionStore\n});\napp.use(sessionMiddleware);\napp.use('/scripts', express_1.default.static(path_1.default.join(process.cwd(), 'dist/client/scripts')));\napp.use('/styles', express_1.default.static(path_1.default.join(process.cwd(), 'dist/client/styles')));\napp.use('/assets', express_1.default.static(path_1.default.join(process.cwd(), 'assets')));\napp.get('/', (req, res) => {\n    res.sendFile(path_1.default.join(process.cwd(), 'dist/client/tempauth.html'));\n});\napp.get('/game', (req, res) => {\n    res.sendFile(path_1.default.join(process.cwd(), 'dist/client/index.html'));\n});\napp.get('/player', (req, res) => {\n    if (req.session.userId) {\n        // console.log(playersDb)\n        // console.log(lastMap)\n        if (typeof playersDb[req.session.userId] == 'undefined') {\n            playersDb[req.session.userId] = [-1, 480, 480];\n            lastMap[req.session.userId] = 1;\n        }\n        res.json({ map: lastMap[req.session.userId] });\n        return;\n    }\n    res.json({ message: \"error\" });\n});\nlet authphrase = process.env.AUTH_PHRASE;\nlet hashedPhrase = (0, crypto_js_1.SHA256)(authphrase).toString();\napp.get('/authphrase', (req, res) => {\n    res.json({ hashedPhrase });\n});\napp.get('/getid', (req, res) => {\n    if (req.session.userId) {\n        res.json({ message: req.session.userId });\n        return;\n    }\n    res.json({ message: \"error\" });\n});\napp.post('/mint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const name = req.body.name;\n    const base64img = req.body.base64;\n    const creator = req.body.creator;\n    const base64ImgLength = (base64img.length * (3 / 4)) - 2;\n    const sourcePath = \"./temp/temp-img.png\";\n    const timestamp = Date.now().toString();\n    const imgOptions = {\n        pinataMetadata: {\n            name: name\n        },\n        pinataOptions: {\n            cidVersion: 0\n        }\n    };\n    const jsonOptions = {\n        pinataMetadata: {\n            name: name + \"Metadata\"\n        },\n        pinataOptions: {\n            cidVersion: 0\n        }\n    };\n    const body = {\n        name: name,\n        creator: creator,\n        timestamp: timestamp,\n        imgCid: \"\"\n    };\n    // console.log(base64img, name)\n    if (base64ImgLength < 20000) {\n        const preparedBase64 = base64img.replace(/^data:image\\/png;base64,/, \"\");\n        yield fs_1.default.writeFile(sourcePath, preparedBase64, 'base64', (info) => {\n            pinata.pinFromFS(sourcePath, imgOptions).then((result) => {\n                const imgCid = result.IpfsHash;\n                body.imgCid = imgCid;\n                pinata.pinJSONToIPFS(body, jsonOptions).then((result) => {\n                    console.log('Image and metadata placed!');\n                    res.json({ response: result.IpfsHash });\n                }).catch((err) => {\n                    console.log(err);\n                });\n            }).catch(err => {\n                console.log(err);\n            });\n        });\n    }\n    console.log('saved');\n    // console.log(req.body)\n}));\napp.get('/contractdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const rawId = req.query.id;\n    const id = rawId.toLocaleLowerCase();\n    const indx = 0;\n    const data = yield getNftURI(id, indx);\n    res.json({ cid: data });\n}));\napp.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const singature = yield req.body.signature;\n    const publicKey = yield req.body.public_key;\n    const issuerPublicKey = yield web3.eth.accounts.recover(hashedPhrase, singature);\n    if (issuerPublicKey.toLocaleLowerCase() === publicKey) {\n        req.session.userId = publicKey;\n        req.session.authenticated = true;\n        res.json({ \"key\": \"valid\" });\n        return;\n    }\n    res.json({ \"key\": \"err\" });\n}));\napp.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    req.session.destroy(() => {\n        res.json({ message: \"logout!\" });\n    });\n}));\napp.get('/mapdata', (req, res) => {\n    const id = Number(req.query.id);\n    if (isNaN(id))\n        return;\n    const playerDbFormated = Object.entries(playersDb);\n    const result = playerDbFormated.filter(entry => entry[1][0] == id);\n    const json = Object.fromEntries(result);\n    res.json(json);\n});\nconst mapsCache = [[], [], [], [], []];\n// SOCKET.IO PART\n// MIDDLEWARE\nconst wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);\nio.use(wrap(sessionMiddleware));\nio.use((socket, next) => {\n    const session = socket.request.session;\n    if (session && session.authenticated) {\n        next();\n    }\n    else {\n        next(new Error(\"unauthorized\"));\n    }\n});\n// SENDING PLAYER POSITIONS ACROSS ALL MAPS\nfor (let i = 1; i < NUMBER_OF_MAPS + 1; i++) {\n    setTimeout(() => {\n        setInterval(() => {\n            mapsCache[i].forEach((data) => {\n                io.emit(\"map\" + i + \"recv\", data);\n            });\n            mapsCache[i] = [];\n        }, 250);\n    }, 50 * i);\n}\nio.on(\"connection\", socket => {\n    const playerId = socket.request.session.userId;\n    console.log(\"player \" + playerId + \" connected!\");\n    if (typeof playersDb[playerId] !== 'undefined') {\n        const mapToSpawn = lastMap[playerId];\n        playersDb[playerId][0] = mapToSpawn;\n        connectedPlayers[playerId] = true;\n        io.emit(\"changeMap\", { from: -1, to: mapToSpawn, who: playerId });\n        console.log(playersDb);\n        socket.on(\"changeMap\", data => {\n            console.log(data);\n            if (data.who === playerId) {\n                playersDb[data.who][0] = data.to;\n                if (data.to !== -1)\n                    lastMap[data.who] = data.to;\n                sendMapListener(data.to);\n            }\n            io.emit(\"changeMap\", data);\n        });\n        socket.on(\"disconnect\", reason => {\n            // console.log(connectedPlayers)\n            io.emit(\"changeMap\", { from: playersDb[playerId][0], to: -1, who: playerId });\n            playersDb[playerId][0] = -1;\n            console.log(\"player \" + playerId + \" disconnected!\");\n            clearInterval(updatePositionInDBInterval);\n            connectedPlayers[playerId] = false;\n            delete connectedPlayers[playerId];\n        });\n        sendMapListener(playersDb[playerId][0]);\n        msgBroadcast(playersDb[playerId][0]);\n        function msgBroadcast(_mapId) {\n            socket.on(\"chat\", (msg) => {\n                if (msg.content.length < 125 && msg.content.length > 0) {\n                    io.emit(\"chat\", msg);\n                }\n            });\n        }\n        function sendMapListener(_mapId) {\n            socket.on(\"map\" + _mapId + \"send\", (data) => {\n                if (data.id == playerId) {\n                    currentPlayerLocation.x = data.x;\n                    currentPlayerLocation.y = data.y;\n                    mapsCache[_mapId].push(data);\n                }\n            });\n        }\n        let currentPlayerLocation = { x: -1, y: -1 };\n        function updatePositionInDB() {\n            if (currentPlayerLocation.x != -1 || currentPlayerLocation.y != -1) { //??\n                playersDb[playerId][1] = currentPlayerLocation.x;\n                playersDb[playerId][2] = currentPlayerLocation.y;\n            }\n        }\n        const updatePositionInDBInterval = setInterval(updatePositionInDB, 1000);\n        // server-side validation -> trzeba zrobić!! JOI LIBRARY\n    }\n});\nserver.listen(port, () => {\n    console.log(\"Server is runinn at port \" + port);\n});\n\n\n//# sourceURL=webpack://typescript-template/./src/server/index.ts?");

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