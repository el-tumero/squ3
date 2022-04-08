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

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass Player extends TextureLayer_1.default {\r\n    constructor(_domCtx, _x, _y) {\r\n        super(_domCtx);\r\n        this.facing = 'none';\r\n        this.speedX = 3;\r\n        this.speedY = 3;\r\n        this.colliders = [];\r\n        this.spriteSize = 32;\r\n        this.sprite = new Image();\r\n        this.sx = 0;\r\n        this.sy = 0;\r\n        this.x = _x;\r\n        this.y = _y;\r\n        this.realX = _x;\r\n        this.realY = _y;\r\n        this.mvUp = false;\r\n        this.mvDown = false;\r\n        this.mvRight = false;\r\n        this.mvLeft = false;\r\n        // this.colliders = new Collision(12, 14, 32, 32)\r\n        this.initControls();\r\n    }\r\n    initControls() {\r\n        document.addEventListener('keydown', e => {\r\n            if (e.key == \"ArrowUp\") {\r\n                this.mvUp = true;\r\n                this.facing = 'up';\r\n            }\r\n            if (e.key == \"ArrowDown\") {\r\n                this.mvDown = true;\r\n                this.facing = 'down';\r\n            }\r\n            if (e.key == \"ArrowRight\") {\r\n                this.mvRight = true;\r\n                this.facing = 'right';\r\n            }\r\n            if (e.key == \"ArrowLeft\") {\r\n                this.mvLeft = true;\r\n                this.facing = 'left';\r\n            }\r\n        });\r\n        document.addEventListener('keyup', e => {\r\n            if (e.key == \"ArrowUp\") {\r\n                this.mvUp = false;\r\n                this.facing = 'up';\r\n            }\r\n            if (e.key == \"ArrowDown\") {\r\n                this.mvDown = false;\r\n                this.facing = 'down';\r\n            }\r\n            if (e.key == \"ArrowRight\") {\r\n                this.mvRight = false;\r\n                this.facing = 'right';\r\n            }\r\n            if (e.key == \"ArrowLeft\") {\r\n                this.mvLeft = false;\r\n                this.facing = 'left';\r\n            }\r\n        });\r\n    }\r\n    loadColliders(_colliders) {\r\n        this.colliders = _colliders;\r\n    }\r\n    loadSpritesheet(_sprite) {\r\n        this.sprite = _sprite;\r\n    }\r\n    updatePositionInLayers(bgLayer, objLayer, _frames) {\r\n        // let borderRect = {\r\n        //     x: 12*this.blockSize,\r\n        //     y: 14*this.blockSize,\r\n        //     width: 32,\r\n        //     height: 32\r\n        // }\r\n        if (this.mvUp) {\r\n            this.realY -= this.speedY;\r\n            this.animate(_frames, 'up');\r\n        }\r\n        if (this.mvDown) {\r\n            this.realY += this.speedY;\r\n            this.animate(_frames, 'down');\r\n        }\r\n        if (this.mvRight) {\r\n            this.realX += this.speedX;\r\n            this.animate(_frames, 'right');\r\n        }\r\n        if (this.mvLeft) {\r\n            this.realX -= this.speedX;\r\n            this.animate(_frames, 'left');\r\n        }\r\n        bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\r\n        objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\r\n        this.colliders.forEach(collider => {\r\n            collider.check(bgLayer, objLayer, this);\r\n        });\r\n        // this.colliders[0].check(bgLayer, objLayer, this)\r\n    }\r\n    animate(_frames, _direction) {\r\n        if (_direction == \"up\") {\r\n            this.sy = 3 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"down\") {\r\n            this.sy = 0;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"left\") {\r\n            this.sy = 1 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n        if (_direction == \"right\") {\r\n            this.sy = 2 * this.spriteSize;\r\n            if (_frames == 0)\r\n                this.sx = 0;\r\n            if (_frames == 20)\r\n                this.sx = this.spriteSize;\r\n            if (_frames == 40)\r\n                this.sx = 2 * this.spriteSize;\r\n        }\r\n    }\r\n    draw(_frames) {\r\n        this.domCtx.drawImage(this.sprite, this.sx, this.sy, this.blockSize, this.blockSize, this.x, this.y, this.blockSize, this.blockSize);\r\n    }\r\n}\r\nexports[\"default\"] = Player;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Player.ts?");

/***/ }),

/***/ "./src/layers/TextureLayer.ts":
/*!************************************!*\
  !*** ./src/layers/TextureLayer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass TextureLayer {\r\n    constructor(_domCtx) {\r\n        this.blockSize = 32;\r\n        this.speed = 3;\r\n        this.x = 0;\r\n        this.y = 0;\r\n        const [_ctx, _canvas] = this.createLayer();\r\n        this.canvas = _canvas;\r\n        this.ctx = _ctx;\r\n        this.domCtx = _domCtx;\r\n        this.canvas.width = 960;\r\n        this.canvas.height = 960;\r\n    }\r\n    updatePosition(_mvUp, _mvDown, _mvRight, _mvLeft) {\r\n        if (_mvUp)\r\n            this.y += this.speed;\r\n        if (_mvDown)\r\n            this.y -= this.speed;\r\n        if (_mvRight)\r\n            this.x -= this.speed;\r\n        if (_mvLeft)\r\n            this.x += this.speed;\r\n    }\r\n    createLayer() {\r\n        let canvas = document.createElement('canvas');\r\n        let ctx = canvas.getContext('2d');\r\n        return [ctx, canvas];\r\n    }\r\n}\r\nexports[\"default\"] = TextureLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/TextureLayer.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst BackgroundLayer_1 = __importDefault(__webpack_require__(/*! ./layers/BackgroundLayer */ \"./src/layers/BackgroundLayer.ts\"));\r\nconst Player_1 = __importDefault(__webpack_require__(/*! ./layers/Player */ \"./src/layers/Player.ts\"));\r\nconst ObjectGrid_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectGrid */ \"./src/layers/ObjectGrid.ts\"));\r\nconst ObjectLayer_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectLayer */ \"./src/layers/ObjectLayer.ts\"));\r\nconst Atlas_1 = __importDefault(__webpack_require__(/*! ./layers/Atlas */ \"./src/layers/Atlas.ts\"));\r\nconst Collision_1 = __importDefault(__webpack_require__(/*! ./layers/Collision */ \"./src/layers/Collision.ts\"));\r\nconst canvas = document.getElementById('canvas');\r\nconst ctx = canvas.getContext('2d');\r\n// let secondsPassed:number\r\n// let oldTimeStamp:number\r\n// let fps\r\n// canvas 960x960\r\n// loading texture atlas\r\nconst atlasImg = new Image();\r\natlasImg.src = '../assets/graphics/atlas.png';\r\nconst playerImg = new Image();\r\nplayerImg.src = '../assets/graphics/spritesheets/player_spritesheet.png';\r\natlasImg.onload = () => {\r\n    const mainAtlas = new Atlas_1.default(256, 256, atlasImg, 32);\r\n    const backgroundLayer = new BackgroundLayer_1.default(ctx, mainAtlas, 1);\r\n    const player1 = new Player_1.default(ctx, 480 - (32 / 2), 480 - (32 / 2));\r\n    playerImg.onload = () => {\r\n        player1.loadSpritesheet(playerImg);\r\n    };\r\n    const objLayer = new ObjectLayer_1.default(ctx, mainAtlas);\r\n    const grid = new ObjectGrid_1.default();\r\n    grid.addObject(2, 4, 4);\r\n    grid.addObject(2, 4, 3);\r\n    grid.addObject(2, 24, 24);\r\n    grid.addObject(2, 32, 32);\r\n    grid.addObject(18, 12, 14);\r\n    objLayer.loadObjects(grid);\r\n    // crate array of collision blocks\r\n    let collisionBlocks = [\r\n        new Collision_1.default(4, 4, 32, 32),\r\n        new Collision_1.default(4, 3, 32, 32),\r\n        new Collision_1.default(12, 14, 32, 32)\r\n    ];\r\n    // loading collision blocks to player\r\n    collisionBlocks.forEach(collider => {\r\n        player1.loadColliders(collisionBlocks);\r\n    });\r\n    // basic game loop\r\n    function update() {\r\n        player1.updatePositionInLayers(backgroundLayer, objLayer, frames);\r\n        // player1.animate(frames, 'up')\r\n    }\r\n    function draw(_frames) {\r\n        ctx.clearRect(0, 0, 960, 960);\r\n        backgroundLayer.draw();\r\n        objLayer.draw();\r\n        player1.draw(_frames);\r\n    }\r\n    let stop = false;\r\n    let frameCount = 0;\r\n    let fps;\r\n    let elapsed;\r\n    let fpsInterval;\r\n    let frames = 0;\r\n    let now;\r\n    let then;\r\n    let startTime;\r\n    startAnimating(60);\r\n    function framesUpdate() {\r\n        frames++;\r\n        if (frames == 60)\r\n            frames = 0;\r\n    }\r\n    function startAnimating(fps) {\r\n        fpsInterval = 1000 / fps;\r\n        then = Date.now();\r\n        startTime = then;\r\n        animate();\r\n    }\r\n    function animate() {\r\n        if (stop) {\r\n            return;\r\n        }\r\n        framesUpdate();\r\n        requestAnimationFrame(animate);\r\n        now = Date.now();\r\n        elapsed = now - then;\r\n        if (elapsed > fpsInterval) {\r\n            then = now - (elapsed % fpsInterval);\r\n            update();\r\n            draw(frames);\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://typescript-template/./src/main.ts?");

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