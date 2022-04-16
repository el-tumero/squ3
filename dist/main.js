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

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass GameLoop {\r\n    constructor(_fps, _ctx) {\r\n        this.stop = false;\r\n        this.frameCount = 0;\r\n        this.elapsed = 0;\r\n        this.fpsInterval = 0;\r\n        this.frames = 0;\r\n        this.now = 0;\r\n        this.then = 0;\r\n        this.startTime = 0;\r\n        this.drawArr = [];\r\n        this.updateArr = [];\r\n        this.fps = _fps;\r\n        this.ctx = _ctx;\r\n    }\r\n    addToDraw(_thingsToDraw) {\r\n        this.drawArr = _thingsToDraw;\r\n    } // bardziej dodanie arraya do arraya bedzie lepsze\r\n    addToUpdate(_thingsToUpdate) {\r\n        this.updateArr = _thingsToUpdate;\r\n    }\r\n    update() {\r\n        this.updateArr.forEach(element => {\r\n            element.updatePositionInLayers(this.frames);\r\n        });\r\n    }\r\n    draw() {\r\n        this.ctx.clearRect(0, 0, 960, 960);\r\n        this.drawArr.forEach(element => {\r\n            element.draw();\r\n        });\r\n    }\r\n    framesUpdate() {\r\n        this.frames++;\r\n        if (this.frames == 60)\r\n            this.frames = 0;\r\n    }\r\n    startAnimating(fps) {\r\n        this.fpsInterval = 1000 / this.fps;\r\n        this.then = Date.now();\r\n        this.startTime = this.then;\r\n        this.animate();\r\n    }\r\n    animate() {\r\n        if (this.stop) {\r\n            return;\r\n        }\r\n        this.framesUpdate();\r\n        requestAnimationFrame(() => this.animate());\r\n        this.now = Date.now();\r\n        this.elapsed = this.now - this.then;\r\n        if (this.elapsed > this.fpsInterval) {\r\n            this.then = this.now - (this.elapsed % this.fpsInterval);\r\n            // this.loop()\r\n            this.update();\r\n            this.draw();\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = GameLoop;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/GameLoop.ts?");

/***/ }),

/***/ "./src/Map.ts":
/*!********************!*\
  !*** ./src/Map.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst ObjectGrid_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectGrid */ \"./src/layers/ObjectGrid.ts\"));\r\nconst BackgroundLayer_1 = __importDefault(__webpack_require__(/*! ./layers/BackgroundLayer */ \"./src/layers/BackgroundLayer.ts\"));\r\nconst ObjectLayer_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectLayer */ \"./src/layers/ObjectLayer.ts\"));\r\nconst Collision_1 = __importDefault(__webpack_require__(/*! ./layers/Collision */ \"./src/layers/Collision.ts\"));\r\nconst Player_1 = __importDefault(__webpack_require__(/*! ./layers/Player */ \"./src/layers/Player.ts\"));\r\nclass Map {\r\n    constructor(_ctx, _id, _atlas, _bgLayerBlockId, _objs, _collisions) {\r\n        this.blockSize = 32;\r\n        this.collisions = [];\r\n        this.ctx = _ctx;\r\n        this.id = _id;\r\n        this.backgroundLayer = new BackgroundLayer_1.default(_ctx, _atlas, _bgLayerBlockId);\r\n        this.objectLayer = new ObjectLayer_1.default(_ctx, _atlas);\r\n        this.objectLayer.loadObjects(this.createGrid(_objs));\r\n        this.addCollision(_collisions);\r\n        this.localPlayer = this.createPlayer();\r\n        console.log(this.localPlayer.interactions[0]);\r\n    }\r\n    createGrid(_objs) {\r\n        const grid = new ObjectGrid_1.default();\r\n        _objs.forEach(_obj => {\r\n            grid.addObject(_obj.id, _obj.x, _obj.y);\r\n        });\r\n        return grid;\r\n    }\r\n    addCollision(_collisions) {\r\n        _collisions.forEach(_collBlock => {\r\n            this.collisions.push(new Collision_1.default(_collBlock.x, _collBlock.y, this.blockSize, this.blockSize));\r\n        });\r\n    }\r\n    createPlayer() {\r\n        const player1 = new Player_1.default(this.ctx, 480 - (32 / 2), 480 - (32 / 2), this.backgroundLayer, this.objectLayer);\r\n        const playerImg = new Image();\r\n        playerImg.src = '../assets/graphics/spritesheets/player_spritesheet.png';\r\n        playerImg.onload = () => {\r\n            player1.loadSpritesheet(playerImg);\r\n        };\r\n        player1.loadColliders(this.collisions);\r\n        return player1;\r\n    }\r\n}\r\nexports[\"default\"] = Map;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/Map.ts?");

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

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass BackgroundLayer extends TextureLayer_1.default {\r\n    constructor(_domCtx, _textureAtlas, _textureId) {\r\n        super(_domCtx);\r\n        this.textureAtlas = _textureAtlas;\r\n        this.canvas.width = 1920;\r\n        this.canvas.height = 1920;\r\n        this.textureId = _textureId;\r\n        this.setBackground();\r\n    }\r\n    setBackground() {\r\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\r\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\r\n                this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.textureId].x, this.textureAtlas.cords[this.textureId].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\r\n            }\r\n        }\r\n    }\r\n    draw() {\r\n        this.domCtx.drawImage(this.canvas, this.x, this.y);\r\n    }\r\n}\r\nexports[\"default\"] = BackgroundLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/BackgroundLayer.ts?");

/***/ }),

/***/ "./src/layers/Collision.ts":
/*!*********************************!*\
  !*** ./src/layers/Collision.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Collision {\r\n    constructor(_blockX, _blockY, _width, _height) {\r\n        this.blockSize = 32;\r\n        this.border = { x: _blockX * this.blockSize, y: _blockY * this.blockSize, width: _width, height: _height };\r\n        this.width = _width;\r\n        this.height = _height;\r\n    }\r\n    check(_bgLayer, _objLayer, _player) {\r\n        let collRect = {\r\n            x: _player.realX - _player.speedX,\r\n            y: _player.realY,\r\n            width: this.blockSize + _player.speedX,\r\n            height: this.blockSize,\r\n        };\r\n        let speedY = Math.sign(collRect.y - this.border.y) * _player.speed;\r\n        let speedX = Math.sign(collRect.x - this.border.x) * _player.speed;\r\n        if (this.isCollide(collRect, this.border) && (_player.realY > (this.border.y - 25)) && (_player.realY < (this.border.y + 25))) {\r\n            _player.realX += speedX;\r\n            _bgLayer.x -= speedX;\r\n            _objLayer.x -= speedX;\r\n        }\r\n        if (this.isCollide(collRect, this.border) && ((_player.realY < (this.border.y - 25)) || (_player.realY > (this.border.y + 25)))) {\r\n            _player.realY += speedY;\r\n            _bgLayer.y -= speedY;\r\n            _objLayer.y -= speedY;\r\n        }\r\n    }\r\n    isCollide(r1, r2) {\r\n        if (r1.x >= r2.x + r2.width)\r\n            return false;\r\n        else if (r1.x + r1.width <= r2.x)\r\n            return false;\r\n        else if (r1.y >= r2.y + r2.height)\r\n            return false;\r\n        else if (r1.y + r1.height <= r2.y)\r\n            return false;\r\n        else\r\n            return true;\r\n    }\r\n}\r\nexports[\"default\"] = Collision;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Collision.ts?");

/***/ }),

/***/ "./src/layers/Interaction.ts":
/*!***********************************!*\
  !*** ./src/layers/Interaction.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Interaction {\r\n    constructor(_player, _x, _y) {\r\n        this.radiusValue = 0;\r\n        this.blockSize = 32;\r\n        this.isInRange = false;\r\n        this.x = _x;\r\n        this.y = _y;\r\n        this.player = _player;\r\n        this.centerX = _x * this.blockSize + 16;\r\n        this.centerY = _y * this.blockSize + 16;\r\n    }\r\n    // radius fun\r\n    radius(x1, y1, x2, y2) {\r\n        let a = x1 - x2;\r\n        let b = y1 - y2;\r\n        let c = Math.sqrt(a * a + b * b);\r\n        return c;\r\n    }\r\n    check() {\r\n        let radius = this.radius(this.player.centerX, this.player.centerY, this.centerX, this.centerY);\r\n        if (radius <= 64) {\r\n            this.isInRange = true;\r\n            return;\r\n        }\r\n        this.isInRange = false;\r\n    }\r\n}\r\nexports[\"default\"] = Interaction;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Interaction.ts?");

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

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass ObjectLayer extends TextureLayer_1.default {\r\n    constructor(_domCtx, _textureAtlas) {\r\n        super(_domCtx);\r\n        this.textureAtlas = _textureAtlas;\r\n        this.canvas.width = 1920;\r\n        this.canvas.height = 1920;\r\n    }\r\n    loadObjects(_obj) {\r\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\r\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\r\n                if (_obj.grid[i][j] !== 0) { //temp\r\n                    this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[_obj.grid[i][j]].x, this.textureAtlas.cords[_obj.grid[i][j]].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    draw() {\r\n        this.domCtx.drawImage(this.canvas, this.x, this.y);\r\n    }\r\n}\r\nexports[\"default\"] = ObjectLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ObjectLayer.ts?");

/***/ }),

/***/ "./src/layers/Player.ts":
/*!******************************!*\
  !*** ./src/layers/Player.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Interaction_1 = __importDefault(__webpack_require__(/*! ./Interaction */ \"./src/layers/Interaction.ts\"));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass Player extends TextureLayer_1.default {\r\n    constructor(_domCtx, _x, _y, _bgLayer, _objLayer) {\r\n        super(_domCtx);\r\n        this.facing = 'none';\r\n        this.speedX = 3;\r\n        this.speedY = 3;\r\n        this.colliders = [];\r\n        this.interactions = [];\r\n        this.spriteSize = 32;\r\n        this.sprite = new Image();\r\n        this.sx = 0;\r\n        this.sy = 0;\r\n        this.x = _x;\r\n        this.y = _y;\r\n        this.realX = _x;\r\n        this.realY = _y;\r\n        this.centerX = this.realX + 16;\r\n        this.centerY = this.realY + 16;\r\n        this.mvUp = false;\r\n        this.mvDown = false;\r\n        this.mvRight = false;\r\n        this.mvLeft = false;\r\n        this.initControls();\r\n        this.bgLayer = _bgLayer;\r\n        this.objLayer = _objLayer;\r\n        this.interactions.push(new Interaction_1.default(this, 6, 8));\r\n    }\r\n    initControls() {\r\n        document.addEventListener('keydown', e => {\r\n            if (e.key == \"ArrowUp\") {\r\n                this.mvUp = true;\r\n                this.facing = 'up';\r\n            }\r\n            if (e.key == \"ArrowDown\") {\r\n                this.mvDown = true;\r\n                this.facing = 'down';\r\n            }\r\n            if (e.key == \"ArrowRight\") {\r\n                this.mvRight = true;\r\n                this.facing = 'right';\r\n            }\r\n            if (e.key == \"ArrowLeft\") {\r\n                this.mvLeft = true;\r\n                this.facing = 'left';\r\n            }\r\n        });\r\n        document.addEventListener('keyup', e => {\r\n            if (e.key == \"ArrowUp\") {\r\n                this.mvUp = false;\r\n                this.facing = 'up';\r\n            }\r\n            if (e.key == \"ArrowDown\") {\r\n                this.mvDown = false;\r\n                this.facing = 'down';\r\n            }\r\n            if (e.key == \"ArrowRight\") {\r\n                this.mvRight = false;\r\n                this.facing = 'right';\r\n            }\r\n            if (e.key == \"ArrowLeft\") {\r\n                this.mvLeft = false;\r\n                this.facing = 'left';\r\n            }\r\n        });\r\n    }\r\n    loadColliders(_colliders) {\r\n        this.colliders = _colliders;\r\n    }\r\n    loadSpritesheet(_sprite) {\r\n        this.sprite = _sprite;\r\n    }\r\n    updatePositionInLayers(_frames) {\r\n        // let borderRect = {\r\n        //     x: 12*this.blockSize,\r\n        //     y: 14*this.blockSize,\r\n        //     width: 32,\r\n        //     height: 32\r\n        // }\r\n        if (this.mvUp) {\r\n            this.realY -= this.speedY;\r\n            this.centerY = this.realY + 16;\r\n            this.animate(_frames, 'up');\r\n        }\r\n        if (this.mvDown) {\r\n            this.realY += this.speedY;\r\n            this.centerY = this.realY + 16;\r\n            this.animate(_frames, 'down');\r\n        }\r\n        if (this.mvRight) {\r\n            this.realX += this.speedX;\r\n            this.centerX = this.realX + 16;\r\n            this.animate(_frames, 'right');\r\n        }\r\n        if (this.mvLeft) {\r\n            this.realX -= this.speedX;\r\n            this.centerX = this.realX + 16;\r\n            this.animate(_frames, 'left');\r\n        }\r\n        this.bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\r\n        this.objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\r\n        // sprawdzanie interakcji\r\n        this.interactions[0].check();\r\n        this.colliders.forEach(collider => {\r\n            collider.check(this.bgLayer, this.objLayer, this);\r\n        });\r\n    }\r\n    animate(_frames, _direction) {\r\n        // console.log(_frames)\r\n        if (_direction == \"up\") {\r\n            this.sy = 3 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"down\") {\r\n            this.sy = 0;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"left\") {\r\n            this.sy = 1 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"right\") {\r\n            this.sy = 2 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n    }\r\n    draw() {\r\n        this.domCtx.drawImage(this.sprite, this.sx, this.sy, this.blockSize, this.blockSize, this.x, this.y, this.blockSize, this.blockSize);\r\n    }\r\n}\r\nexports[\"default\"] = Player;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Player.ts?");

/***/ }),

/***/ "./src/layers/TextureLayer.ts":
/*!************************************!*\
  !*** ./src/layers/TextureLayer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass TextureLayer {\r\n    constructor(_domCtx) {\r\n        this.blockSize = 32;\r\n        this.speed = 3;\r\n        this.x = 0;\r\n        this.y = 0;\r\n        const [_ctx, _canvas] = this.createLayer();\r\n        this.canvas = _canvas;\r\n        this.ctx = _ctx;\r\n        this.domCtx = _domCtx;\r\n        this.canvas.width = 960;\r\n        this.canvas.height = 960;\r\n    }\r\n    updatePosition(_mvUp, _mvDown, _mvRight, _mvLeft) {\r\n        if (_mvUp)\r\n            this.y += this.speed;\r\n        if (_mvDown)\r\n            this.y -= this.speed;\r\n        if (_mvRight)\r\n            this.x -= this.speed;\r\n        if (_mvLeft)\r\n            this.x += this.speed;\r\n    }\r\n    createLayer() {\r\n        let canvas = document.createElement('canvas');\r\n        let ctx = canvas.getContext('2d');\r\n        return [ctx, canvas];\r\n    }\r\n}\r\nexports[\"default\"] = TextureLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/TextureLayer.ts?");

/***/ }),

/***/ "./src/layers/UI.ts":
/*!**************************!*\
  !*** ./src/layers/UI.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass UI extends TextureLayer_1.default {\r\n    constructor(_domCtx, _mapRef) {\r\n        super(_domCtx);\r\n        this.mapRef = _mapRef;\r\n        this.canvas.width = 960;\r\n        this.canvas.height = 960;\r\n        this.initializeListeners();\r\n    }\r\n    initializeListeners() {\r\n        document.addEventListener(\"keydown\", e => {\r\n            if (e.key === \"e\") {\r\n                this.mapRef.localPlayer.interactions.forEach(interaction => {\r\n                    if (interaction.isInRange)\r\n                        console.log(\"Interaction!\");\r\n                });\r\n            }\r\n        });\r\n    }\r\n    drawHint() {\r\n        this.mapRef.localPlayer.interactions.forEach(interaction => {\r\n            if (interaction.isInRange)\r\n                this.ctx.fillRect(480, 800, 200, 80);\r\n            else\r\n                this.ctx.clearRect(0, 0, 960, 960);\r\n        });\r\n    }\r\n    draw() {\r\n        this.drawHint();\r\n        this.domCtx.drawImage(this.canvas, 0, 0);\r\n    }\r\n}\r\nexports[\"default\"] = UI;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/UI.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Atlas_1 = __importDefault(__webpack_require__(/*! ./layers/Atlas */ \"./src/layers/Atlas.ts\"));\r\nconst GameLoop_1 = __importDefault(__webpack_require__(/*! ./GameLoop */ \"./src/GameLoop.ts\"));\r\nconst Map_1 = __importDefault(__webpack_require__(/*! ./Map */ \"./src/Map.ts\"));\r\nconst UI_1 = __importDefault(__webpack_require__(/*! ./layers/UI */ \"./src/layers/UI.ts\"));\r\nconst canvas = document.getElementById('canvas');\r\nconst ctx = canvas.getContext('2d');\r\n// canvas 960x960\r\n// loading texture atlas\r\nconst atlasImg = new Image();\r\natlasImg.src = '../assets/graphics/atlas.png';\r\natlasImg.onload = () => {\r\n    const mainAtlas = new Atlas_1.default(256, 256, atlasImg, 32);\r\n    const objGrid = [\r\n        { id: 2, x: 4, y: 4 },\r\n        { id: 2, x: 4, y: 3 },\r\n        { id: 3, x: 6, y: 8 },\r\n        { id: 2, x: 24, y: 24 },\r\n        { id: 2, x: 32, y: 32 },\r\n        { id: 18, x: 12, y: 14 },\r\n    ];\r\n    const colliders = [\r\n        { x: 4, y: 4 },\r\n        { x: 4, y: 3 },\r\n        { x: 12, y: 14 },\r\n        { x: 6, y: 8 },\r\n    ];\r\n    const map1 = new Map_1.default(ctx, 1, mainAtlas, 1, objGrid, colliders);\r\n    const ui = new UI_1.default(ctx, map1);\r\n    const game = new GameLoop_1.default(60, ctx);\r\n    game.addToDraw([map1.backgroundLayer, map1.objectLayer, map1.localPlayer, ui]);\r\n    game.addToUpdate([map1.localPlayer]);\r\n    game.startAnimating(60);\r\n};\r\n\n\n//# sourceURL=webpack://typescript-template/./src/main.ts?");

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