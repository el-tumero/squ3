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

/***/ "./src/GameLoop.ts":
/*!*************************!*\
  !*** ./src/GameLoop.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass GameLoop {\r\n    constructor(_fps, _ctx) {\r\n        this.stop = false;\r\n        this.frameCount = 0;\r\n        this.elapsed = 0;\r\n        this.fpsInterval = 0;\r\n        this.frames = 0;\r\n        this.now = 0;\r\n        this.then = 0;\r\n        this.startTime = 0;\r\n        this.drawArr = [];\r\n        this.updatePlayerArr = [];\r\n        this.updateArr = [];\r\n        this.fps = _fps;\r\n        this.ctx = _ctx;\r\n    }\r\n    addToDraw(_thingsToDraw) {\r\n        this.drawArr = _thingsToDraw;\r\n    }\r\n    addToUpdatePlayer(_thingsToUpdate) {\r\n        this.updatePlayerArr = _thingsToUpdate;\r\n    }\r\n    addToUpdate(_thingsToUpdate) {\r\n        this.updateArr = _thingsToUpdate;\r\n    }\r\n    update() {\r\n        this.updateArr.forEach(element => {\r\n            element.update(this.frames);\r\n        });\r\n    }\r\n    updatePlayer() {\r\n        this.updatePlayerArr.forEach(element => {\r\n            element.updatePositionInLayers(this.frames);\r\n        });\r\n    }\r\n    draw() {\r\n        this.ctx.clearRect(0, 0, 960, 960);\r\n        this.drawArr.forEach(element => {\r\n            element.draw();\r\n        });\r\n    }\r\n    framesUpdate() {\r\n        this.frames++;\r\n        if (this.frames == 60)\r\n            this.frames = 0;\r\n    }\r\n    startAnimating() {\r\n        this.fpsInterval = 1000 / this.fps;\r\n        this.then = Date.now();\r\n        this.startTime = this.then;\r\n        this.animate();\r\n    }\r\n    animate() {\r\n        if (this.stop) {\r\n            return;\r\n        }\r\n        this.framesUpdate();\r\n        requestAnimationFrame(() => this.animate());\r\n        this.now = Date.now();\r\n        this.elapsed = this.now - this.then;\r\n        if (this.elapsed > this.fpsInterval) {\r\n            this.then = this.now - (this.elapsed % this.fpsInterval);\r\n            // this.loop()\r\n            this.update();\r\n            this.updatePlayer();\r\n            this.draw();\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = GameLoop;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/GameLoop.ts?");

/***/ }),

/***/ "./src/Map.ts":
/*!********************!*\
  !*** ./src/Map.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst ObjectGrid_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectGrid */ \"./src/layers/ObjectGrid.ts\"));\r\nconst BackgroundLayer_1 = __importDefault(__webpack_require__(/*! ./layers/BackgroundLayer */ \"./src/layers/BackgroundLayer.ts\"));\r\nconst ObjectLayer_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectLayer */ \"./src/layers/ObjectLayer.ts\"));\r\nconst Collision_1 = __importDefault(__webpack_require__(/*! ./layers/Collision */ \"./src/layers/Collision.ts\"));\r\nconst Player_1 = __importDefault(__webpack_require__(/*! ./layers/Player */ \"./src/layers/Player.ts\"));\r\nconst Interaction_1 = __importDefault(__webpack_require__(/*! ./layers/Interaction */ \"./src/layers/Interaction.ts\"));\r\nclass Map {\r\n    constructor(_ctx, _id, _atlas, _bgLayerBlockId, _objs, _collisions, _interactions) {\r\n        this.blockSize = 32;\r\n        this.collisions = [];\r\n        this.interactions = [];\r\n        this.ctx = _ctx;\r\n        this.id = _id;\r\n        this.backgroundLayer = new BackgroundLayer_1.default(_ctx, _atlas, _bgLayerBlockId);\r\n        this.objectLayer = new ObjectLayer_1.default(_ctx, _atlas, this.createGrid(_objs));\r\n        this.objectLayer.loadObjects();\r\n        this.localPlayer = this.createPlayer();\r\n        this.addCollision(_collisions);\r\n        this.addInteractions(_interactions);\r\n        //console.log(this.localPlayer.interactions[0])\r\n    }\r\n    createGrid(_objs) {\r\n        const grid = new ObjectGrid_1.default();\r\n        _objs.forEach(_obj => {\r\n            grid.addObject(_obj.id, _obj.x, _obj.y);\r\n        });\r\n        return grid;\r\n    }\r\n    addCollision(_collisions) {\r\n        _collisions.forEach(_collBlock => {\r\n            this.collisions.push(new Collision_1.default(this, _collBlock.x, _collBlock.y, this.blockSize, this.blockSize));\r\n        });\r\n    }\r\n    addInteractions(_interactions) {\r\n        _interactions.forEach(_intrBlock => {\r\n            this.interactions.push(new Interaction_1.default(this.localPlayer, _intrBlock.x, _intrBlock.y, _intrBlock.info, _intrBlock.type));\r\n        });\r\n    }\r\n    createPlayer() {\r\n        const player1 = new Player_1.default(this.ctx, 480 - (32 / 2), 480 - (32 / 2), this);\r\n        const playerImg = new Image();\r\n        playerImg.src = '../assets/graphics/spritesheets/player_spritesheet.png';\r\n        playerImg.onload = () => {\r\n            player1.loadSpritesheet(playerImg);\r\n        };\r\n        return player1;\r\n    }\r\n    updateLayersPosition(mvUp, mvDown, mvRight, mvLeft) {\r\n        this.backgroundLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft);\r\n        this.objectLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft);\r\n    }\r\n    getColliders() {\r\n        return this.collisions;\r\n    }\r\n    getInteractions() {\r\n        return this.interactions;\r\n    }\r\n    draw() {\r\n        this.backgroundLayer.draw();\r\n        this.objectLayer.draw();\r\n        this.localPlayer.draw();\r\n    }\r\n    colMoveX(_speedX) {\r\n        this.localPlayer.colMoveX(_speedX);\r\n        this.backgroundLayer.colMoveX(_speedX);\r\n        this.objectLayer.colMoveX(_speedX);\r\n    }\r\n    colMoveY(_speedY) {\r\n        this.localPlayer.colMoveY(_speedY);\r\n        this.backgroundLayer.colMoveY(_speedY);\r\n        this.objectLayer.colMoveY(_speedY);\r\n    }\r\n    deleteObject(_x, _y) {\r\n        this.objectLayer.deleteObject(_x, _y);\r\n    }\r\n    getId() {\r\n        return this.id;\r\n    }\r\n    getLocalPlayer() {\r\n        return this.localPlayer;\r\n    }\r\n}\r\nexports[\"default\"] = Map;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/Map.ts?");

/***/ }),

/***/ "./src/layers/Atlas.ts":
/*!*****************************!*\
  !*** ./src/layers/Atlas.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Atlas {\r\n    constructor(_width, _height, _texture, _blockSize) {\r\n        this.cords = [];\r\n        this.width = _width;\r\n        this.height = _height;\r\n        this.blockSize = _blockSize;\r\n        this.texture = _texture;\r\n        this.init();\r\n    }\r\n    init() {\r\n        for (let i = 0; i <= this.width / this.blockSize; i++) {\r\n            for (let j = 0; j <= this.height / this.blockSize; j++) {\r\n                this.cords.push({ x: j * this.blockSize, y: i * this.blockSize });\r\n            }\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = Atlas;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Atlas.ts?");

/***/ }),

/***/ "./src/layers/BackgroundLayer.ts":
/*!***************************************!*\
  !*** ./src/layers/BackgroundLayer.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass BackgroundLayer extends TextureLayer_1.default {\r\n    constructor(_domCtx, _textureAtlas, _textureId) {\r\n        super(_domCtx);\r\n        this.textureAtlas = _textureAtlas;\r\n        this.canvas.width = 2560;\r\n        this.canvas.height = 2560;\r\n        // 2560 = 1920 + 640\r\n        this.textureId = _textureId;\r\n        this.setBackground();\r\n        this.outerBgLeft();\r\n        this.outerBgRight();\r\n        this.outerBgUp();\r\n        this.outerBgDown();\r\n        // 2560 / 32 = 80\r\n        // for 80*blocksize, 10*blocksize (320)height, draw\r\n    }\r\n    setBackground() {\r\n        for (let i = 0; i < (this.canvas.width / this.blockSize) - 20; i++) {\r\n            for (let j = 0; j < (this.canvas.height / this.blockSize) - 20; j++) {\r\n                this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.textureId].x, this.textureAtlas.cords[this.textureId].y, this.blockSize, this.blockSize, i * this.blockSize + 320, j * this.blockSize + 320, this.blockSize, this.blockSize);\r\n            }\r\n        }\r\n    }\r\n    outerBgLeft() {\r\n        for (let i = 0; i < (this.canvas.width / this.blockSize) / 8; i++) {\r\n            for (let j = 0; j < (this.blockSize) * 10; j++) {\r\n                this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.textureId - 1].x, this.textureAtlas.cords[this.textureId - 1].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\r\n            }\r\n        }\r\n    }\r\n    outerBgRight() {\r\n        for (let i = 70; i < (this.canvas.width / this.blockSize); i++) {\r\n            for (let j = 0; j < (this.blockSize) * 10; j++) {\r\n                this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.textureId - 1].x, this.textureAtlas.cords[this.textureId - 1].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\r\n            }\r\n        }\r\n    }\r\n    outerBgUp() {\r\n        for (let i = 0; i < (this.canvas.width / this.blockSize); i++) {\r\n            for (let j = 0; j < (this.canvas.height / this.blockSize) / 8; j++) {\r\n                this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.textureId - 1].x, this.textureAtlas.cords[this.textureId - 1].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\r\n            }\r\n        }\r\n    }\r\n    outerBgDown() {\r\n        for (let i = 0; i < (this.canvas.width / this.blockSize); i++) {\r\n            for (let j = 70; j < (this.canvas.height / this.blockSize); j++) {\r\n                this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.textureId - 1].x, this.textureAtlas.cords[this.textureId - 1].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\r\n            }\r\n        }\r\n    }\r\n    draw() {\r\n        // this.domCtx.drawImage(this.canvas, this.x, this.y)\r\n        this.domCtx.drawImage(this.canvas, this.x - 320, this.y - 320);\r\n    }\r\n}\r\nexports[\"default\"] = BackgroundLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/BackgroundLayer.ts?");

/***/ }),

/***/ "./src/layers/Chat.ts":
/*!****************************!*\
  !*** ./src/layers/Chat.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Chat {\r\n    constructor() {\r\n        this.chat = false;\r\n        // public chatToggle():void{\r\n        //     const chatWindow = document.getElementById(\"chat\")\r\n        //     if (this.chat == true) {\r\n        //         this.showChat()\r\n        //     } else {\r\n        //         this.hideChat()\r\n        //     }\r\n        // }\r\n    }\r\n    // constructor(){\r\n    // }\r\n    isChat() {\r\n        this.chat = !this.chat;\r\n        return this.chat;\r\n    }\r\n    hideChat() {\r\n        const chatWindow = document.getElementById(\"chat\");\r\n        chatWindow.style.visibility = \"hidden\";\r\n    }\r\n    showChat() {\r\n        const chatWindow = document.getElementById(\"chat\");\r\n        chatWindow.style.visibility = \"visible\";\r\n    }\r\n}\r\nexports[\"default\"] = Chat;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Chat.ts?");

/***/ }),

/***/ "./src/layers/Collision.ts":
/*!*********************************!*\
  !*** ./src/layers/Collision.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Collision {\r\n    constructor(_map, _blockX, _blockY, _width, _height) {\r\n        this.blockSize = 32;\r\n        this.border = { x: _blockX * this.blockSize, y: _blockY * this.blockSize, width: _width, height: _height };\r\n        this.width = _width;\r\n        this.height = _height;\r\n        this.map = _map;\r\n        this.player = _map.getLocalPlayer();\r\n        this.playerSpeed = _map.getLocalPlayer().getSpeed();\r\n    }\r\n    check() {\r\n        let collRect = {\r\n            x: this.player.getRealX() - this.playerSpeed,\r\n            y: this.player.getRealY(),\r\n            width: this.blockSize + this.playerSpeed,\r\n            height: this.blockSize,\r\n        };\r\n        let speedY = Math.sign(collRect.y - this.border.y) * this.player.getSpeed();\r\n        let speedX = Math.sign(collRect.x - this.border.x) * this.player.getSpeed();\r\n        const playerRealY = this.player.getRealY();\r\n        if (this.isCollide(collRect, this.border) && (playerRealY > (this.border.y - 25)) && (playerRealY < (this.border.y + 25))) {\r\n            this.map.colMoveX(speedX);\r\n        }\r\n        if (this.isCollide(collRect, this.border) && ((playerRealY < (this.border.y - 25)) || (playerRealY > (this.border.y + 25)))) {\r\n            this.map.colMoveY(speedY);\r\n        }\r\n    }\r\n    isCollide(r1, r2) {\r\n        if (r1.x >= r2.x + r2.width)\r\n            return false;\r\n        else if (r1.x + r1.width <= r2.x)\r\n            return false;\r\n        else if (r1.y >= r2.y + r2.height)\r\n            return false;\r\n        else if (r1.y + r1.height <= r2.y)\r\n            return false;\r\n        else\r\n            return true;\r\n    }\r\n}\r\nexports[\"default\"] = Collision;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Collision.ts?");

/***/ }),

/***/ "./src/layers/Interaction.ts":
/*!***********************************!*\
  !*** ./src/layers/Interaction.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Interaction {\r\n    constructor(_player, _x, _y, _info, _type) {\r\n        this.radiusValue = 0;\r\n        this.blockSize = 32;\r\n        this.isNear = false;\r\n        this.x = _x;\r\n        this.y = _y;\r\n        this.player = _player;\r\n        this.centerX = _x * this.blockSize + 16;\r\n        this.centerY = _y * this.blockSize + 16;\r\n        this.type = _type;\r\n        this.info = _info;\r\n    }\r\n    // radius fun\r\n    radius(x1, y1, x2, y2) {\r\n        let a = x1 - x2;\r\n        let b = y1 - y2;\r\n        let c = Math.sqrt(a * a + b * b);\r\n        return c;\r\n    }\r\n    check() {\r\n        let radius = this.radius(this.player.centerX, this.player.centerY, this.centerX, this.centerY);\r\n        if (radius <= 64) {\r\n            this.isNear = true;\r\n            return;\r\n        }\r\n        this.isNear = false;\r\n    }\r\n    getType() {\r\n        return this.type;\r\n    }\r\n    getInfo() {\r\n        return this.info;\r\n    }\r\n    isInRange() {\r\n        return this.isNear;\r\n    }\r\n    getX() {\r\n        return this.x;\r\n    }\r\n    getY() {\r\n        return this.y;\r\n    }\r\n}\r\nexports[\"default\"] = Interaction;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Interaction.ts?");

/***/ }),

/***/ "./src/layers/ObjectGrid.ts":
/*!**********************************!*\
  !*** ./src/layers/ObjectGrid.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass ObjectGrid {\r\n    constructor() {\r\n        this.grid = [];\r\n        this.blockSize = 32;\r\n        this.canvasWidth = 1920;\r\n        this.canvasHeight = 1920;\r\n        this.init();\r\n    }\r\n    init() {\r\n        for (let i = 0; i < this.canvasWidth / this.blockSize; i++) {\r\n            this.grid[i] = [];\r\n            for (let j = 0; j < this.canvasHeight / this.blockSize; j++) {\r\n                this.grid[i][j] = 0;\r\n            }\r\n        }\r\n    }\r\n    addObject(_id, _xCell, _yCell) {\r\n        this.grid[_xCell][_yCell] = _id;\r\n    }\r\n}\r\nexports[\"default\"] = ObjectGrid;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ObjectGrid.ts?");

/***/ }),

/***/ "./src/layers/ObjectLayer.ts":
/*!***********************************!*\
  !*** ./src/layers/ObjectLayer.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass ObjectLayer extends TextureLayer_1.default {\r\n    constructor(_domCtx, _textureAtlas, _objGrid) {\r\n        super(_domCtx);\r\n        this.textureAtlas = _textureAtlas;\r\n        this.objGrid = _objGrid;\r\n        this.canvas.width = 1920;\r\n        this.canvas.height = 1920;\r\n    }\r\n    //tutaj jest git o to własnie chodziło \r\n    loadObjects() {\r\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\r\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\r\n                if (this.objGrid.grid[i][j] !== 0) { //temp\r\n                    this.ctx.drawImage(this.textureAtlas.texture, \r\n                    // thisobjGrid\r\n                    this.textureAtlas.cords[this.objGrid.grid[i][j]].x, this.textureAtlas.cords[this.objGrid.grid[i][j]].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    // i teraz najlepsza część \r\n    // tworze ta funckje jako publiczna zebym mogl sie odniesc do niej gdzies daleko stad a zasadzie to w klasie UI\r\n    // dzięki temu ze klasa UI ma odnosnik do obiektu klasy Map, a klasa Map posiada w sobie odnosnik do obiektu klasy\r\n    // ObjectLayer bedziemy mogli sie odniesc do tej metody, wiem data flow na poteznym poziomie\r\n    deleteObject(_x, _y) {\r\n        // najłatwiej będzie usuwać blok który chcemy, z grida i ponownie wczytywać plansze\r\n        console.log(_x, _y);\r\n        this.objGrid.grid[_x][_y] = 0;\r\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // wiadomo czyscimy nasz wirtualny canvasek\r\n        this.loadObjects();\r\n        // i to w zasadzie tyle\r\n    }\r\n    draw() {\r\n        this.domCtx.drawImage(this.canvas, this.x, this.y);\r\n    }\r\n}\r\nexports[\"default\"] = ObjectLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ObjectLayer.ts?");

/***/ }),

/***/ "./src/layers/Player.ts":
/*!******************************!*\
  !*** ./src/layers/Player.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass Player extends TextureLayer_1.default {\r\n    constructor(_domCtx, _x, _y, _map) {\r\n        super(_domCtx);\r\n        this.facing = 'none';\r\n        this.speedX = 3;\r\n        this.speedY = 3;\r\n        this.colliders = [];\r\n        this.interactions = [];\r\n        this.spriteSize = 32;\r\n        this.sprite = new Image();\r\n        this.sx = 0;\r\n        this.sy = 0;\r\n        this.x = _x / 1.5;\r\n        this.y = _y / 1.5;\r\n        this.realX = _x / 1.5;\r\n        this.realY = _y / 1.5;\r\n        this.centerX = this.realX + 16;\r\n        this.centerY = this.realY + 16;\r\n        this.mvUp = false;\r\n        this.mvDown = false;\r\n        this.mvRight = false;\r\n        this.mvLeft = false;\r\n        this.initControls();\r\n        this.map = _map;\r\n        this.interactions = _map.getInteractions();\r\n        this.colliders = _map.getColliders();\r\n    }\r\n    initControls() {\r\n        document.addEventListener('keydown', e => {\r\n            if (e.key == \"ArrowUp\") {\r\n                this.mvUp = true;\r\n                this.facing = 'up';\r\n            }\r\n            if (e.key == \"ArrowDown\") {\r\n                this.mvDown = true;\r\n                this.facing = 'down';\r\n            }\r\n            if (e.key == \"ArrowRight\") {\r\n                this.mvRight = true;\r\n                this.facing = 'right';\r\n            }\r\n            if (e.key == \"ArrowLeft\") {\r\n                this.mvLeft = true;\r\n                this.facing = 'left';\r\n            }\r\n        });\r\n        document.addEventListener('keyup', e => {\r\n            if (e.key == \"ArrowUp\") {\r\n                this.mvUp = false;\r\n                this.facing = 'up';\r\n            }\r\n            if (e.key == \"ArrowDown\") {\r\n                this.mvDown = false;\r\n                this.facing = 'down';\r\n            }\r\n            if (e.key == \"ArrowRight\") {\r\n                this.mvRight = false;\r\n                this.facing = 'right';\r\n            }\r\n            if (e.key == \"ArrowLeft\") {\r\n                this.mvLeft = false;\r\n                this.facing = 'left';\r\n            }\r\n        });\r\n    }\r\n    // public loadColliders(_colliders:Array<Collision>){\r\n    //     this.colliders = _colliders\r\n    // }\r\n    // public loadInteractions(_interactions:Array<Interaction>){\r\n    //     this.interactions = _interactions\r\n    // }\r\n    getRealX() {\r\n        return this.realX;\r\n    }\r\n    getRealY() {\r\n        return this.realY;\r\n    }\r\n    colMoveX(_speedX) {\r\n        this.realX += _speedX;\r\n    }\r\n    colMoveY(_speedY) {\r\n        this.realY += _speedY;\r\n    }\r\n    loadSpritesheet(_sprite) {\r\n        this.sprite = _sprite;\r\n    }\r\n    updatePositionInLayers(_frames) {\r\n        // console.log(_frames)\r\n        // let borderRect = {\r\n        //     x: 12*this.blockSize,\r\n        //     y: 14*this.blockSize,\r\n        //     width: 32,\r\n        //     height: 32\r\n        // }\r\n        if (this.mvUp) {\r\n            this.realY -= this.speedY;\r\n            this.centerY = this.realY + 16;\r\n            this.animate(_frames, 'up');\r\n        }\r\n        if (this.mvDown) {\r\n            this.realY += this.speedY;\r\n            this.centerY = this.realY + 16;\r\n            this.animate(_frames, 'down');\r\n        }\r\n        if (this.mvRight) {\r\n            this.realX += this.speedX;\r\n            this.centerX = this.realX + 16;\r\n            this.animate(_frames, 'right');\r\n        }\r\n        if (this.mvLeft) {\r\n            this.realX -= this.speedX;\r\n            this.centerX = this.realX + 16;\r\n            this.animate(_frames, 'left');\r\n        }\r\n        // aktualizowanie pozycji warstw\r\n        this.map.updateLayersPosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\r\n        if (this.realX < 0) {\r\n            this.realX += this.speed;\r\n            this.map.updateLayersPosition(false, false, true, false);\r\n        }\r\n        if (this.realX > 960 * 2 - this.blockSize) {\r\n            this.realX -= this.speed;\r\n            this.map.updateLayersPosition(false, false, false, true);\r\n        }\r\n        if (this.realY < 0) {\r\n            this.realY += this.speed;\r\n            this.map.updateLayersPosition(false, true, false, false);\r\n        }\r\n        if (this.realY > 960 * 2 - this.blockSize) {\r\n            this.realY -= this.speed;\r\n            this.map.updateLayersPosition(true, false, false, false);\r\n        }\r\n        // sprawdzanie interakcji oraz kolizji\r\n        this.interactions.forEach(interaction => {\r\n            interaction.check();\r\n        });\r\n        this.colliders.forEach(collider => {\r\n            collider.check();\r\n        });\r\n    }\r\n    animate(_frames, _direction) {\r\n        if (_direction == \"up\") {\r\n            this.sy = 3 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"down\") {\r\n            this.sy = 0;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"left\") {\r\n            this.sy = 1 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"right\") {\r\n            this.sy = 2 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n    }\r\n    draw() {\r\n        this.domCtx.drawImage(this.sprite, this.sx, this.sy, this.blockSize, this.blockSize, this.x, this.y, this.blockSize, this.blockSize);\r\n    }\r\n    getInteractions() {\r\n        return this.interactions;\r\n    }\r\n}\r\nexports[\"default\"] = Player;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Player.ts?");

/***/ }),

/***/ "./src/layers/TextureLayer.ts":
/*!************************************!*\
  !*** ./src/layers/TextureLayer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass TextureLayer {\r\n    constructor(_domCtx) {\r\n        this.blockSize = 32;\r\n        this.speed = 3;\r\n        this.x = 0;\r\n        this.y = 0;\r\n        const [_ctx, _canvas] = this.createLayer();\r\n        this.canvas = _canvas;\r\n        this.ctx = _ctx;\r\n        this.domCtx = _domCtx;\r\n        this.canvas.width = 960;\r\n        this.canvas.height = 960;\r\n    }\r\n    getSpeed() {\r\n        return this.speed;\r\n    }\r\n    colMoveX(_speedX) {\r\n        this.x -= _speedX;\r\n    }\r\n    colMoveY(_speedY) {\r\n        this.y -= _speedY;\r\n    }\r\n    updatePosition(_mvUp, _mvDown, _mvRight, _mvLeft) {\r\n        if (_mvUp)\r\n            this.y += this.speed;\r\n        if (_mvDown)\r\n            this.y -= this.speed;\r\n        if (_mvRight)\r\n            this.x -= this.speed;\r\n        if (_mvLeft)\r\n            this.x += this.speed;\r\n    }\r\n    createLayer() {\r\n        let canvas = document.createElement('canvas');\r\n        let ctx = canvas.getContext('2d');\r\n        return [ctx, canvas];\r\n    }\r\n}\r\nexports[\"default\"] = TextureLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/TextureLayer.ts?");

/***/ }),

/***/ "./src/layers/UI.ts":
/*!**************************!*\
  !*** ./src/layers/UI.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nconst Letters_1 = __importDefault(__webpack_require__(/*! ./ui/Letters */ \"./src/layers/ui/Letters.ts\"));\r\nconst Textarea_1 = __importDefault(__webpack_require__(/*! ./ui/Textarea */ \"./src/layers/ui/Textarea.ts\"));\r\nclass UI extends TextureLayer_1.default {\r\n    constructor(_domCtx, _mapRef, _chatRef) {\r\n        super(_domCtx);\r\n        this.intrRef = null;\r\n        this.isDetected = false;\r\n        this.isActive = false;\r\n        this.panelTexture = new Image();\r\n        this.mapRef = _mapRef;\r\n        this.chatRef = _chatRef;\r\n        this.canvas.width = 960;\r\n        this.canvas.height = 960;\r\n        this.loadTextures();\r\n        this.initializeListeners();\r\n        this.font = new Letters_1.default();\r\n        this.hintTextarea = new Textarea_1.default(this.font, this.ctx, \"\");\r\n    }\r\n    loadTextures() {\r\n        const panelTexture = new Image();\r\n        panelTexture.src = \"../assets/graphics/ui/panel.png\";\r\n        panelTexture.onload = () => {\r\n            this.panelTexture = panelTexture;\r\n        };\r\n    }\r\n    initializeListeners() {\r\n        document.addEventListener(\"keydown\", e => {\r\n            if (e.key === \"e\") {\r\n                if (this.intrRef !== null && this.intrRef.isInRange() && !this.isActive) {\r\n                    this.isActive = true;\r\n                    if (this.intrRef.getType() === 'talk')\r\n                        console.log('Hi bro!');\r\n                    if (this.intrRef.getType() === 'open') {\r\n                        console.log('open da door');\r\n                        const doorOpenEvent = new CustomEvent('openDoor', { detail: { x: this.intrRef.getX(), y: this.intrRef.getY() } });\r\n                        document.dispatchEvent(doorOpenEvent);\r\n                    }\r\n                    if (this.intrRef.getInfo().includes(\"portal\")) {\r\n                        let mapId = Number(this.intrRef.getInfo()[6]);\r\n                        const mapChangeEvent = new CustomEvent('changeMap', { detail: { to: mapId } });\r\n                        document.dispatchEvent(mapChangeEvent);\r\n                    }\r\n                }\r\n            }\r\n        });\r\n        document.addEventListener(\"keydown\", r => {\r\n            if (r.key === \"r\") {\r\n                this.chatRef.isChat();\r\n                if (this.chatRef.chat == true) {\r\n                    // console.log('chat on')\r\n                    this.chatRef.showChat();\r\n                }\r\n                if (this.chatRef.chat == false) {\r\n                    // console.log('chat off')\r\n                    this.chatRef.hideChat();\r\n                }\r\n            }\r\n        });\r\n    }\r\n    detectInteraction() {\r\n        this.mapRef.getLocalPlayer().getInteractions().forEach(interaction => {\r\n            if (interaction.isInRange()) {\r\n                this.intrRef = interaction;\r\n                this.isDetected = true;\r\n                this.hintTextarea.changeText(interaction.getType());\r\n            }\r\n        });\r\n        if (this.intrRef !== null && !this.intrRef.isInRange()) {\r\n            this.isDetected = false;\r\n            this.isActive = false;\r\n        }\r\n    }\r\n    drawHint() {\r\n        if (this.isDetected && !this.isActive) {\r\n            this.ctx.drawImage(this.panelTexture, 80, 500); //this.ctx.fillRect(480-200, 800, 400, 100)\r\n            this.hintTextarea.showText(80, 500);\r\n        }\r\n        if (this.isDetected && this.isActive) {\r\n            //this.ctx.clearRect(0,0 ,960, 960)\r\n            // interakcja - panel z tekstem >\r\n            // this.ctx.fillRect(175,450,200,80)\r\n        }\r\n        if (!this.isDetected && !this.isActive)\r\n            this.ctx.clearRect(0, 0, 960, 960);\r\n    }\r\n    update() {\r\n        this.detectInteraction();\r\n    }\r\n    draw() {\r\n        this.drawHint();\r\n        this.domCtx.drawImage(this.canvas, 0, 0);\r\n    }\r\n}\r\nexports[\"default\"] = UI;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/UI.ts?");

/***/ }),

/***/ "./src/layers/ui/Letters.ts":
/*!**********************************!*\
  !*** ./src/layers/ui/Letters.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Letters {\r\n    constructor() {\r\n        this.alphabet = 'abcdefghijklmnoprstuwyxz_';\r\n        this.letterSize = 32;\r\n        this.sprite = new Image();\r\n        this.lettersCords = {};\r\n        this.setSprite();\r\n        this.setCords();\r\n    }\r\n    getCords(letter) {\r\n        return this.lettersCords[letter];\r\n    }\r\n    getSprite() {\r\n        return this.sprite;\r\n    }\r\n    setSprite() {\r\n        const lettersTexture = new Image();\r\n        lettersTexture.src = \"../assets/graphics/ui/letters.png\";\r\n        this.sprite = lettersTexture;\r\n    }\r\n    setCords() {\r\n        for (let i = 0; i < this.alphabet.length; i++) {\r\n            this.lettersCords[this.alphabet[i]] = [(i - Math.floor(i / 8) * 8) * this.letterSize, Math.floor(i / 8) * this.letterSize];\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = Letters;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ui/Letters.ts?");

/***/ }),

/***/ "./src/layers/ui/Textarea.ts":
/*!***********************************!*\
  !*** ./src/layers/ui/Textarea.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Textarea {\r\n    constructor(_letters, _uiCtx, _text) {\r\n        this.textOffset = 20;\r\n        this.interactionButton = \"e\";\r\n        this.letters = _letters;\r\n        this.sprite = _letters.getSprite();\r\n        const [_ctx, _canvas] = this.createLayer();\r\n        this.canvas = _canvas;\r\n        this.ctx = _ctx;\r\n        this.uiCtx = _uiCtx;\r\n        this.text = _text.toLocaleLowerCase(); // keys are lowercase\r\n        //setting width and height\r\n        this.canvas.width = 400;\r\n        this.canvas.height = 100;\r\n        //this.drawCharacters()\r\n    }\r\n    changeText(_text) {\r\n        //console.log(this.text)\r\n        if (this.text !== _text) {\r\n            this.text = _text.toLocaleLowerCase();\r\n            this.drawCharacters();\r\n        }\r\n    }\r\n    drawCharacters() {\r\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n        let space = 0;\r\n        for (let i = 0; i < this.text.length; i++) {\r\n            const cords = this.letters.getCords(this.text[i]);\r\n            this.ctx.drawImage(this.sprite, cords[0], cords[1], 32, 32, this.textOffset + space, 10, 32, 32);\r\n            space += 34;\r\n        }\r\n        space = 0;\r\n        const pressText = `press_${this.interactionButton}`;\r\n        for (let i = 0; i < pressText.length; i++) {\r\n            const cords = this.letters.getCords(pressText[i]);\r\n            this.ctx.drawImage(this.sprite, cords[0], cords[1], 32, 32, this.textOffset + space, 42, 32, 32);\r\n            space += 34;\r\n        }\r\n    }\r\n    createLayer() {\r\n        let canvas = document.createElement('canvas');\r\n        let ctx = canvas.getContext('2d');\r\n        return [ctx, canvas];\r\n    }\r\n    showText(ds, dy) {\r\n        this.uiCtx.drawImage(this.canvas, ds, dy);\r\n    }\r\n}\r\nexports[\"default\"] = Textarea;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ui/Textarea.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Atlas_1 = __importDefault(__webpack_require__(/*! ./layers/Atlas */ \"./src/layers/Atlas.ts\"));\r\nconst GameLoop_1 = __importDefault(__webpack_require__(/*! ./GameLoop */ \"./src/GameLoop.ts\"));\r\nconst Map_1 = __importDefault(__webpack_require__(/*! ./Map */ \"./src/Map.ts\"));\r\nconst UI_1 = __importDefault(__webpack_require__(/*! ./layers/UI */ \"./src/layers/UI.ts\"));\r\nconst map1_json_1 = __importDefault(__webpack_require__(/*! ./mapsData/map1.json */ \"./src/mapsData/map1.json\")); // importuje dane mapy z pliku\r\nconst map2_json_1 = __importDefault(__webpack_require__(/*! ./mapsData/map2.json */ \"./src/mapsData/map2.json\"));\r\nconst map3_json_1 = __importDefault(__webpack_require__(/*! ./mapsData/map3.json */ \"./src/mapsData/map3.json\"));\r\nconst Chat_1 = __importDefault(__webpack_require__(/*! ./layers/Chat */ \"./src/layers/Chat.ts\"));\r\nconst canvas = document.getElementById('canvas');\r\nconst ctx = canvas.getContext('2d');\r\n// transform(a, b, c, d, e, f)\r\nctx.scale(1.5, 1.5);\r\n// canvas 960x960\r\n// loading texture atlas\r\nconst atlasImg = new Image();\r\natlasImg.src = '../assets/graphics/atlas.png';\r\nconst game = new GameLoop_1.default(60, ctx);\r\nlet mainAtlas;\r\nconst mapsData = [map1_json_1.default, map2_json_1.default, map3_json_1.default];\r\n// INFO: na razie działa tylko usuwanie obiektów z warstwy obiektowej, nie znika kolizja, to jest do dodanie i do pomyslenia\r\ndocument.addEventListener(\"changeMap\", (e) => {\r\n    //console.log()\r\n    const id = e.detail.to;\r\n    const mapData = mapsData[id - 1];\r\n    //console.log(\"MAP CHANGE!\")\r\n    const nMap = new Map_1.default(ctx, id, mainAtlas, mapData.backgroundLayerBlockId, mapData.objList, mapData.colliders, mapData.interactions);\r\n    document.addEventListener(\"openDoor\", (e) => {\r\n        console.log('door opened');\r\n        const x = e.detail.x;\r\n        const y = e.detail.y;\r\n        nMap.deleteObject(x, y);\r\n    });\r\n    const nChat = new Chat_1.default; //(false)\r\n    const ui = new UI_1.default(ctx, nMap, nChat);\r\n    game.addToDraw([nMap, ui]);\r\n    game.addToUpdate([ui]);\r\n    game.addToUpdatePlayer([nMap.getLocalPlayer()]);\r\n});\r\natlasImg.onload = () => {\r\n    mainAtlas = new Atlas_1.default(256, 256, atlasImg, 32);\r\n    const map1 = new Map_1.default(ctx, 1, mainAtlas, map1_json_1.default.backgroundLayerBlockId, map1_json_1.default.objList, map1_json_1.default.colliders, map1_json_1.default.interactions);\r\n    const chat1 = new Chat_1.default; //(false)\r\n    const ui = new UI_1.default(ctx, map1, chat1);\r\n    game.addToDraw([map1, ui]);\r\n    game.addToUpdate([ui]);\r\n    game.addToUpdatePlayer([map1.getLocalPlayer()]);\r\n    game.startAnimating();\r\n};\r\n\n\n//# sourceURL=webpack://typescript-template/./src/main.ts?");

/***/ }),

/***/ "./src/mapsData/map1.json":
/*!********************************!*\
  !*** ./src/mapsData/map1.json ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"objList\":[{\"id\":2,\"x\":4,\"y\":4},{\"id\":2,\"x\":4,\"y\":3},{\"id\":3,\"x\":6,\"y\":8},{\"id\":2,\"x\":24,\"y\":24},{\"id\":2,\"x\":32,\"y\":32},{\"id\":18,\"x\":12,\"y\":14},{\"id\":18,\"x\":15,\"y\":10}],\"colliders\":[{\"x\":4,\"y\":4},{\"x\":4,\"y\":3},{\"x\":6,\"y\":8},{\"x\":15,\"y\":10},{\"x\":12,\"y\":14}],\"interactions\":[{\"x\":6,\"y\":8,\"info\":\"portal2\",\"type\":\"portal\"},{\"x\":12,\"y\":14,\"info\":\"Catus\",\"type\":\"talk\"},{\"x\":15,\"y\":10,\"info\":\"portal3\",\"type\":\"portal\"}],\"backgroundLayerBlockId\":1}');\n\n//# sourceURL=webpack://typescript-template/./src/mapsData/map1.json?");

/***/ }),

/***/ "./src/mapsData/map2.json":
/*!********************************!*\
  !*** ./src/mapsData/map2.json ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"objList\":[{\"id\":3,\"x\":12,\"y\":12},{\"id\":2,\"x\":4,\"y\":4},{\"id\":3,\"x\":21,\"y\":10},{\"id\":3,\"x\":20,\"y\":10},{\"id\":3,\"x\":20,\"y\":11},{\"id\":5,\"x\":20,\"y\":12},{\"id\":3,\"x\":20,\"y\":13},{\"id\":3,\"x\":20,\"y\":14},{\"id\":3,\"x\":21,\"y\":14}],\"colliders\":[{\"x\":12,\"y\":12},{\"x\":4,\"y\":4},{\"x\":21,\"y\":10},{\"x\":20,\"y\":10},{\"x\":20,\"y\":11},{\"x\":20,\"y\":12},{\"x\":20,\"y\":13},{\"x\":20,\"y\":14},{\"x\":21,\"y\":14}],\"interactions\":[{\"x\":4,\"y\":4,\"info\":\"portal1\",\"type\":\"portal\"},{\"x\":12,\"y\":12,\"info\":\"Stone\",\"type\":\"talk\"},{\"x\":20,\"y\":12,\"info\":\"Door\",\"type\":\"open\"}],\"backgroundLayerBlockId\":0}');\n\n//# sourceURL=webpack://typescript-template/./src/mapsData/map2.json?");

/***/ }),

/***/ "./src/mapsData/map3.json":
/*!********************************!*\
  !*** ./src/mapsData/map3.json ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"objList\":[{\"id\":18,\"x\":5,\"y\":5}],\"colliders\":[],\"interactions\":[{\"x\":5,\"y\":5,\"info\":\"portal1\",\"type\":\"portal\"}],\"backgroundLayerBlockId\":1}');\n\n//# sourceURL=webpack://typescript-template/./src/mapsData/map3.json?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;