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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Atlas {\n    constructor(_width, _height, _texture, _blockSize) {\n        this.cords = [];\n        this.width = _width;\n        this.height = _height;\n        this.blockSize = _blockSize;\n        this.texture = _texture;\n        this.init();\n    }\n    init() {\n        for (let i = 0; i <= this.width / this.blockSize; i++) {\n            for (let j = 0; j <= this.height / this.blockSize; j++) {\n                this.cords.push({ x: j * this.blockSize, y: i * this.blockSize });\n            }\n        }\n    }\n}\nexports[\"default\"] = Atlas;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Atlas.ts?");

/***/ }),

/***/ "./src/layers/BackgroundLayer.ts":
/*!***************************************!*\
  !*** ./src/layers/BackgroundLayer.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass BackgroundLayer extends TextureLayer_1.default {\n    constructor(_domCtx, _textureAtlas, _textureId) {\n        super(_domCtx, _textureAtlas);\n        this.canvas.width = 1920;\n        this.canvas.height = 1920;\n        this.textureId = _textureId;\n        this.setBackground();\n    }\n    setBackground() {\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\n                this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.textureId].x, this.textureAtlas.cords[this.textureId].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\n            }\n        }\n    }\n    draw() {\n        this.domCtx.drawImage(this.canvas, this.x, this.y);\n    }\n}\nexports[\"default\"] = BackgroundLayer;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/BackgroundLayer.ts?");

/***/ }),

/***/ "./src/layers/Collision.ts":
/*!*********************************!*\
  !*** ./src/layers/Collision.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Collision {\n    constructor(_blockX, _blockY, _width, _height) {\n        this.blockSize = 32;\n        this.border = { x: _blockX * this.blockSize, y: _blockY * this.blockSize, width: _width, height: _height };\n        this.width = _width;\n        this.height = _height;\n    }\n    check(_bgLayer, _objLayer, _player) {\n        let collRect = {\n            x: _player.realX - _player.speedX,\n            y: _player.realY,\n            width: this.blockSize + _player.speedX,\n            height: this.blockSize,\n        };\n        let speedY = Math.sign(collRect.y - this.border.y) * _player.speed;\n        let speedX = Math.sign(collRect.x - this.border.x) * _player.speed;\n        if (this.isCollide(collRect, this.border) && (_player.realY > (this.border.y - 25)) && (_player.realY < (this.border.y + 25))) {\n            _player.realX += speedX;\n            _bgLayer.x -= speedX;\n            _objLayer.x -= speedX;\n        }\n        if (this.isCollide(collRect, this.border) && ((_player.realY < (this.border.y - 25)) || (_player.realY > (this.border.y + 25)))) {\n            _player.realY += speedY;\n            _bgLayer.y -= speedY;\n            _objLayer.y -= speedY;\n        }\n    }\n    isCollide(r1, r2) {\n        if (r1.x >= r2.x + r2.width)\n            return false;\n        else if (r1.x + r1.width <= r2.x)\n            return false;\n        else if (r1.y >= r2.y + r2.height)\n            return false;\n        else if (r1.y + r1.height <= r2.y)\n            return false;\n        else\n            return true;\n    }\n}\nexports[\"default\"] = Collision;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Collision.ts?");

/***/ }),

/***/ "./src/layers/ObjectGrid.ts":
/*!**********************************!*\
  !*** ./src/layers/ObjectGrid.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass ObjectGrid {\n    constructor() {\n        this.grid = [];\n        this.blockSize = 32;\n        this.canvasWidth = 1920;\n        this.canvasHeight = 1920;\n        this.init();\n    }\n    init() {\n        for (let i = 0; i < this.canvasWidth / this.blockSize; i++) {\n            this.grid[i] = [];\n            for (let j = 0; j < this.canvasHeight / this.blockSize; j++) {\n                this.grid[i][j] = 0;\n            }\n        }\n    }\n    addObject(_id, _xCell, _yCell) {\n        this.grid[_xCell][_yCell] = _id;\n    }\n}\nexports[\"default\"] = ObjectGrid;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ObjectGrid.ts?");

/***/ }),

/***/ "./src/layers/ObjectLayer.ts":
/*!***********************************!*\
  !*** ./src/layers/ObjectLayer.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass ObjectLayer extends TextureLayer_1.default {\n    constructor(_domCtx, _textureAtlas) {\n        super(_domCtx, _textureAtlas);\n        this.canvas.width = 1920;\n        this.canvas.height = 1920;\n    }\n    loadObjects(_obj) {\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\n                if (_obj.grid[i][j] !== 0) { //temp\n                    this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[_obj.grid[i][j]].x, this.textureAtlas.cords[_obj.grid[i][j]].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\n                }\n            }\n        }\n    }\n    draw() {\n        this.domCtx.drawImage(this.canvas, this.x, this.y);\n    }\n}\nexports[\"default\"] = ObjectLayer;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ObjectLayer.ts?");

/***/ }),

/***/ "./src/layers/Player.ts":
/*!******************************!*\
  !*** ./src/layers/Player.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass Player extends TextureLayer_1.default {\n    constructor(_domCtx, _x, _y, _textureAtlas, _skinId) {\n        super(_domCtx, _textureAtlas);\n        this.facing = 'none';\n        this.speedX = 3;\n        this.speedY = 3;\n        this.colliders = [];\n        this.x = _x;\n        this.y = _y;\n        this.realX = _x;\n        this.realY = _y;\n        this.mvUp = false;\n        this.mvDown = false;\n        this.mvRight = false;\n        this.mvLeft = false;\n        this.skinId = _skinId;\n        // this.colliders = new Collision(12, 14, 32, 32)\n        this.initControls();\n    }\n    initControls() {\n        document.addEventListener('keydown', e => {\n            if (e.key == \"ArrowUp\") {\n                this.mvUp = true;\n                this.facing = 'up';\n            }\n            if (e.key == \"ArrowDown\") {\n                this.mvDown = true;\n                this.facing = 'down';\n            }\n            if (e.key == \"ArrowRight\") {\n                this.mvRight = true;\n                this.facing = 'right';\n            }\n            if (e.key == \"ArrowLeft\") {\n                this.mvLeft = true;\n                this.facing = 'left';\n            }\n        });\n        document.addEventListener('keyup', e => {\n            if (e.key == \"ArrowUp\") {\n                this.mvUp = false;\n                this.facing = 'up';\n            }\n            if (e.key == \"ArrowDown\") {\n                this.mvDown = false;\n                this.facing = 'down';\n            }\n            if (e.key == \"ArrowRight\") {\n                this.mvRight = false;\n                this.facing = 'right';\n            }\n            if (e.key == \"ArrowLeft\") {\n                this.mvLeft = false;\n                this.facing = 'left';\n            }\n        });\n    }\n    loadColliders(_colliders) {\n        this.colliders = _colliders;\n    }\n    updatePositionInLayers(bgLayer, objLayer) {\n        // let borderRect = {\n        //     x: 12*this.blockSize,\n        //     y: 14*this.blockSize,\n        //     width: 32,\n        //     height: 32\n        // }\n        if (this.mvUp)\n            this.realY -= this.speedY;\n        if (this.mvDown)\n            this.realY += this.speedY;\n        if (this.mvRight)\n            this.realX += this.speedX;\n        if (this.mvLeft)\n            this.realX -= this.speedX;\n        bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\n        objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\n        this.colliders.forEach(collider => {\n            collider.check(bgLayer, objLayer, this);\n        });\n        // this.colliders[0].check(bgLayer, objLayer, this)\n    }\n    draw() {\n        this.domCtx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.skinId].x, this.textureAtlas.cords[this.skinId].y, this.blockSize, this.blockSize, this.x, this.y, this.blockSize, this.blockSize);\n    }\n}\nexports[\"default\"] = Player;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Player.ts?");

/***/ }),

/***/ "./src/layers/TextureLayer.ts":
/*!************************************!*\
  !*** ./src/layers/TextureLayer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass TextureLayer {\n    constructor(_domCtx, _textureAtlas) {\n        this.blockSize = 32;\n        this.speed = 3;\n        this.x = 0;\n        this.y = 0;\n        const [_ctx, _canvas] = this.createLayer();\n        this.canvas = _canvas;\n        this.ctx = _ctx;\n        this.domCtx = _domCtx;\n        this.textureAtlas = _textureAtlas;\n        this.canvas.width = 960;\n        this.canvas.height = 960;\n    }\n    updatePosition(_mvUp, _mvDown, _mvRight, _mvLeft) {\n        if (_mvUp)\n            this.y += this.speed;\n        if (_mvDown)\n            this.y -= this.speed;\n        if (_mvRight)\n            this.x -= this.speed;\n        if (_mvLeft)\n            this.x += this.speed;\n    }\n    createLayer() {\n        let canvas = document.createElement('canvas');\n        let ctx = canvas.getContext('2d');\n        return [ctx, canvas];\n    }\n}\nexports[\"default\"] = TextureLayer;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/TextureLayer.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst BackgroundLayer_1 = __importDefault(__webpack_require__(/*! ./layers/BackgroundLayer */ \"./src/layers/BackgroundLayer.ts\"));\nconst Player_1 = __importDefault(__webpack_require__(/*! ./layers/Player */ \"./src/layers/Player.ts\"));\nconst ObjectGrid_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectGrid */ \"./src/layers/ObjectGrid.ts\"));\nconst ObjectLayer_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectLayer */ \"./src/layers/ObjectLayer.ts\"));\nconst Atlas_1 = __importDefault(__webpack_require__(/*! ./layers/Atlas */ \"./src/layers/Atlas.ts\"));\nconst Collision_1 = __importDefault(__webpack_require__(/*! ./layers/Collision */ \"./src/layers/Collision.ts\"));\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n// canvas 960x960\n// loading texture atlas\nconst atlasImg = new Image();\natlasImg.src = '../assets/graphics/atlas.png';\natlasImg.onload = () => {\n    const mainAtlas = new Atlas_1.default(256, 256, atlasImg, 32);\n    const backgroundLayer = new BackgroundLayer_1.default(ctx, mainAtlas, 1);\n    const objLayer = new ObjectLayer_1.default(ctx, mainAtlas);\n    const grid = new ObjectGrid_1.default();\n    grid.addObject(2, 4, 4);\n    grid.addObject(2, 4, 3);\n    grid.addObject(2, 24, 24);\n    grid.addObject(2, 32, 32);\n    grid.addObject(18, 12, 14);\n    objLayer.loadObjects(grid);\n    const player1 = new Player_1.default(ctx, 480 - (32 / 2), 480 - (32 / 2), mainAtlas, 3);\n    // crate array of collision blocks\n    let collisionBlocks = [\n        new Collision_1.default(4, 4, 32, 32),\n        new Collision_1.default(4, 3, 32, 32),\n        new Collision_1.default(12, 14, 32, 32)\n    ];\n    // loading collision blocks to player\n    collisionBlocks.forEach(collider => {\n        player1.loadColliders(collisionBlocks);\n    });\n    // basic game loop\n    function update() {\n        player1.updatePositionInLayers(backgroundLayer, objLayer);\n    }\n    function draw() {\n        ctx.clearRect(0, 0, 960, 960);\n        backgroundLayer.draw();\n        objLayer.draw();\n        player1.draw();\n    }\n    function loop() {\n        update();\n        draw();\n        window.requestAnimationFrame(loop);\n    }\n    window.requestAnimationFrame(loop);\n};\n\n\n//# sourceURL=webpack://typescript-template/./src/main.ts?");

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