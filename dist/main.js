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

/***/ "./src/layers/BackgroundLayer.ts":
/*!***************************************!*\
  !*** ./src/layers/BackgroundLayer.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass BackgroundLayer extends TextureLayer_1.default {\r\n    constructor(_domCtx, _texture) {\r\n        super(_domCtx);\r\n        this.texture = _texture;\r\n        this.setBackground();\r\n    }\r\n    setBackground() {\r\n        // console.log(this.canvas.width/this.blockSize)\r\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\r\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\r\n                this.ctx.drawImage(this.texture, i * this.blockSize, j * this.blockSize);\r\n            }\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = BackgroundLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/BackgroundLayer.ts?");

/***/ }),

/***/ "./src/layers/Player.ts":
/*!******************************!*\
  !*** ./src/layers/Player.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\r\nclass Player extends TextureLayer_1.default {\r\n    constructor(_domCtx, _x, _y, _skin) {\r\n        super(_domCtx);\r\n        this.speed = 3;\r\n        this.x = _x;\r\n        this.y = _y;\r\n        this.mvUp = false;\r\n        this.mvDown = false;\r\n        this.mvRight = false;\r\n        this.mvLeft = false;\r\n        this.skin = _skin;\r\n        this.initControls();\r\n    }\r\n    initControls() {\r\n        document.addEventListener('keydown', e => {\r\n            if (e.key == \"ArrowUp\") {\r\n                this.mvUp = true;\r\n            }\r\n            if (e.key == \"ArrowDown\") {\r\n                this.mvDown = true;\r\n            }\r\n            if (e.key == \"ArrowRight\") {\r\n                this.mvRight = true;\r\n            }\r\n            if (e.key == \"ArrowLeft\") {\r\n                this.mvLeft = true;\r\n            }\r\n        });\r\n        document.addEventListener('keyup', e => {\r\n            if (e.key == \"ArrowUp\") {\r\n                this.mvUp = false;\r\n            }\r\n            if (e.key == \"ArrowDown\") {\r\n                this.mvDown = false;\r\n            }\r\n            if (e.key == \"ArrowRight\") {\r\n                this.mvRight = false;\r\n            }\r\n            if (e.key == \"ArrowLeft\") {\r\n                this.mvLeft = false;\r\n            }\r\n        });\r\n    }\r\n    updatePosition() {\r\n        if (this.mvUp)\r\n            this.y -= this.speed;\r\n        if (this.mvDown)\r\n            this.y += this.speed;\r\n        if (this.mvRight)\r\n            this.x += this.speed;\r\n        if (this.mvLeft)\r\n            this.x -= this.speed;\r\n    }\r\n    draw() {\r\n        this.domCtx.drawImage(this.skin, this.x, this.y);\r\n    }\r\n}\r\nexports[\"default\"] = Player;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Player.ts?");

/***/ }),

/***/ "./src/layers/TextureLayer.ts":
/*!************************************!*\
  !*** ./src/layers/TextureLayer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass TextureLayer {\r\n    constructor(_domCtx) {\r\n        this.blockSize = 32;\r\n        const [_ctx, _canvas] = this.createLayer();\r\n        this.canvas = _canvas;\r\n        this.ctx = _ctx;\r\n        this.domCtx = _domCtx;\r\n        this.canvas.width = 960;\r\n        this.canvas.height = 960;\r\n    }\r\n    createLayer() {\r\n        let canvas = document.createElement('canvas');\r\n        let ctx = canvas.getContext('2d');\r\n        return [ctx, canvas];\r\n    }\r\n    draw() {\r\n        this.domCtx.drawImage(this.canvas, 0, 0);\r\n    }\r\n}\r\nexports[\"default\"] = TextureLayer;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/TextureLayer.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst textures_1 = __importDefault(__webpack_require__(/*! ./textures/textures */ \"./src/textures/textures.ts\"));\r\n// import TextureLayer from \"./TextureLayer\";\r\nconst BackgroundLayer_1 = __importDefault(__webpack_require__(/*! ./layers/BackgroundLayer */ \"./src/layers/BackgroundLayer.ts\"));\r\nconst Player_1 = __importDefault(__webpack_require__(/*! ./layers/Player */ \"./src/layers/Player.ts\"));\r\nconst canvas = document.getElementById('canvas');\r\nconst ctx = canvas.getContext('2d');\r\n// canvas 960x960\r\n// wait til textures load ;)\r\ntextures_1.default[0].onload = () => {\r\n    const backgroundLayer = new BackgroundLayer_1.default(ctx, textures_1.default[0]);\r\n    // backgroundLayer.draw()\r\n    const player1 = new Player_1.default(ctx, 200, 200, textures_1.default[1]);\r\n    // basic game loop\r\n    function update() {\r\n        player1.updatePosition();\r\n    }\r\n    function draw() {\r\n        backgroundLayer.draw();\r\n        player1.draw();\r\n    }\r\n    function loop() {\r\n        update();\r\n        draw();\r\n        window.requestAnimationFrame(loop);\r\n    }\r\n    window.requestAnimationFrame(loop);\r\n};\r\n\n\n//# sourceURL=webpack://typescript-template/./src/main.ts?");

/***/ }),

/***/ "./src/textures/textures.ts":
/*!**********************************!*\
  !*** ./src/textures/textures.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n// grass\r\nconst grass_t = new Image();\r\ngrass_t.src = '../assets/graphics/grass1.png';\r\n// sand\r\nconst sand_t = new Image();\r\nsand_t.src = '../assets/graphics/sand1.png';\r\n// water\r\nconst water = new Image();\r\nwater.src = '../assets/graphics/water/water.png';\r\n// lepiej tablica\r\n//niebawem spritesheet ;)\r\n// jest git\r\nconst textures = {\r\n    0: grass_t,\r\n    1: sand_t,\r\n    2: water\r\n};\r\nexports[\"default\"] = textures;\r\n\n\n//# sourceURL=webpack://typescript-template/./src/textures/textures.ts?");

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