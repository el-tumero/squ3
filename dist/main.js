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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass Player extends TextureLayer_1.default {\n    constructor(_domCtx, _x, _y, _textureAtlas, _skinId) {\n        super(_domCtx, _textureAtlas);\n        this.facing = 'none';\n        this.speedX = 3;\n        this.speedY = 3;\n        this.x = _x;\n        this.y = _y;\n        this.realX = _x;\n        this.realY = _y;\n        this.mvUp = false;\n        this.mvDown = false;\n        this.mvRight = false;\n        this.mvLeft = false;\n        this.skinId = _skinId;\n        this.initControls();\n    }\n    initControls() {\n        document.addEventListener('keydown', e => {\n            if (e.key == \"ArrowUp\") {\n                this.mvUp = true;\n                this.facing = 'up';\n            }\n            if (e.key == \"ArrowDown\") {\n                this.mvDown = true;\n                this.facing = 'down';\n            }\n            if (e.key == \"ArrowRight\") {\n                this.mvRight = true;\n                this.facing = 'right';\n            }\n            if (e.key == \"ArrowLeft\") {\n                this.mvLeft = true;\n                this.facing = 'left';\n            }\n        });\n        document.addEventListener('keyup', e => {\n            if (e.key == \"ArrowUp\") {\n                this.mvUp = false;\n                this.facing = 'up';\n            }\n            if (e.key == \"ArrowDown\") {\n                this.mvDown = false;\n                this.facing = 'down';\n            }\n            if (e.key == \"ArrowRight\") {\n                this.mvRight = false;\n                this.facing = 'right';\n            }\n            if (e.key == \"ArrowLeft\") {\n                this.mvLeft = false;\n                this.facing = 'left';\n            }\n        });\n    }\n    // for now only one object\n    isCollide(a, b) {\n        return !(((a.y + a.height) < (b.y)) ||\n            (a.y > (b.y + b.height)) ||\n            ((a.x + a.width) < b.x) ||\n            (a.x > (b.x + b.width)));\n    }\n    updatePositionInLayers(bgLayer, objLayer) {\n        let horizontalRect = {\n            x: this.realX + this.speed,\n            y: this.realY,\n            width: this.blockSize,\n            height: this.blockSize\n        };\n        let verticalRect = {\n            x: this.realX,\n            y: this.realY + this.speed,\n            width: this.blockSize,\n            height: this.blockSize\n        };\n        let border = {\n            x: 12 * this.blockSize,\n            y: 14 * this.blockSize,\n            width: 32,\n            height: 32\n        };\n        if (this.mvUp)\n            this.realY -= this.speed;\n        if (this.mvDown)\n            this.realY += this.speed;\n        if (this.mvRight)\n            this.realX += this.speed;\n        if (this.mvLeft)\n            this.realX -= this.speed;\n        bgLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\n        objLayer.updatePosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\n        let speedY = Math.sign(horizontalRect.y - border.y) * 3;\n        let speedX = Math.sign(horizontalRect.x - border.x) * 3;\n        if (this.isCollide(verticalRect, border) && this.isCollide(horizontalRect, border)) {\n            console.log(speedX, speedY);\n            while (speedY > 0) {\n                this.realY += 2 * speedY;\n                bgLayer.y = bgLayer.y - 2 * speedY;\n                objLayer.y = objLayer.y - 2 * speedY;\n                speedY = 0;\n            }\n            while (speedX > 0) {\n                this.realX += 2 * speedX;\n                bgLayer.x = bgLayer.x - 2 * speedX;\n                objLayer.x = objLayer.x - 2 * speedX;\n                speedX = 0;\n            }\n        }\n        else if (this.isCollide(verticalRect, border)) {\n            this.realY += speedY;\n            console.log('vert ' + speedY, this.realX, this.realY);\n            bgLayer.y = bgLayer.y - speedY;\n            objLayer.y = objLayer.y - speedY;\n            // console.log('vert ')\n        }\n        else if (this.isCollide(horizontalRect, border)) {\n            this.realX += speedX;\n            console.log('horiz ' + speedX, this.realX, this.realY);\n            bgLayer.x = bgLayer.x - speedX;\n            objLayer.x = objLayer.x - speedX;\n        }\n        // console.log(this.realX, this.realY)\n    }\n    draw() {\n        this.domCtx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.skinId].x, this.textureAtlas.cords[this.skinId].y, this.blockSize, this.blockSize, this.x, this.y, this.blockSize, this.blockSize);\n    }\n}\nexports[\"default\"] = Player;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Player.ts?");

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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst BackgroundLayer_1 = __importDefault(__webpack_require__(/*! ./layers/BackgroundLayer */ \"./src/layers/BackgroundLayer.ts\"));\nconst Player_1 = __importDefault(__webpack_require__(/*! ./layers/Player */ \"./src/layers/Player.ts\"));\nconst ObjectGrid_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectGrid */ \"./src/layers/ObjectGrid.ts\"));\nconst ObjectLayer_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectLayer */ \"./src/layers/ObjectLayer.ts\"));\nconst Atlas_1 = __importDefault(__webpack_require__(/*! ./layers/Atlas */ \"./src/layers/Atlas.ts\"));\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n// canvas 960x960\n// loading texture atlas\nconst atlasImg = new Image();\natlasImg.src = '../assets/graphics/atlas.png';\natlasImg.onload = () => {\n    const mainAtlas = new Atlas_1.default(256, 256, atlasImg, 32);\n    const backgroundLayer = new BackgroundLayer_1.default(ctx, mainAtlas, 1);\n    const objLayer = new ObjectLayer_1.default(ctx, mainAtlas);\n    const grid = new ObjectGrid_1.default();\n    grid.addObject(2, 4, 4);\n    grid.addObject(2, 24, 24);\n    grid.addObject(2, 32, 32);\n    grid.addObject(2, 12, 14);\n    for (let i = 0; i < 6; i++) {\n        grid.addObject(2, 3, i);\n        grid.addObject(2, 4, i);\n    }\n    objLayer.loadObjects(grid);\n    const player1 = new Player_1.default(ctx, 480 - (32 / 2), 480 - (32 / 2), mainAtlas, 3);\n    // basic game loop\n    function update() {\n        player1.updatePositionInLayers(backgroundLayer, objLayer);\n    }\n    function draw() {\n        ctx.clearRect(0, 0, 960, 960);\n        backgroundLayer.draw();\n        objLayer.draw();\n        player1.draw();\n    }\n    function loop() {\n        update();\n        draw();\n        window.requestAnimationFrame(loop);\n    }\n    window.requestAnimationFrame(loop);\n};\n\n\n//# sourceURL=webpack://typescript-template/./src/main.ts?");

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