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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass BackgroundLayer extends TextureLayer_1.default {\n    constructor(_domCtx, _texture) {\n        super(_domCtx);\n        this.texture = _texture;\n        this.setBackground();\n    }\n    setBackground() {\n        // console.log(this.canvas.width/this.blockSize)\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\n                this.ctx.drawImage(this.texture, i * this.blockSize, j * this.blockSize);\n            }\n        }\n    }\n}\nexports[\"default\"] = BackgroundLayer;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/BackgroundLayer.ts?");

/***/ }),

/***/ "./src/layers/Player.ts":
/*!******************************!*\
  !*** ./src/layers/Player.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass Player extends TextureLayer_1.default {\n    constructor(_domCtx, _x, _y, _skin) {\n        super(_domCtx);\n        this.speed = 3;\n        this.x = _x;\n        this.y = _y;\n        this.mvUp = false;\n        this.mvDown = false;\n        this.mvRight = false;\n        this.mvLeft = false;\n        this.skin = _skin;\n        this.initControls();\n    }\n    initControls() {\n        document.addEventListener('keydown', e => {\n            if (e.key == \"ArrowUp\") {\n                this.mvUp = true;\n            }\n            if (e.key == \"ArrowDown\") {\n                this.mvDown = true;\n            }\n            if (e.key == \"ArrowRight\") {\n                this.mvRight = true;\n            }\n            if (e.key == \"ArrowLeft\") {\n                this.mvLeft = true;\n            }\n        });\n        document.addEventListener('keyup', e => {\n            if (e.key == \"ArrowUp\") {\n                this.mvUp = false;\n            }\n            if (e.key == \"ArrowDown\") {\n                this.mvDown = false;\n            }\n            if (e.key == \"ArrowRight\") {\n                this.mvRight = false;\n            }\n            if (e.key == \"ArrowLeft\") {\n                this.mvLeft = false;\n            }\n        });\n    }\n    updatePosition() {\n        if (this.mvUp)\n            this.y -= this.speed;\n        if (this.mvDown)\n            this.y += this.speed;\n        if (this.mvRight)\n            this.x += this.speed;\n        if (this.mvLeft)\n            this.x -= this.speed;\n    }\n    draw() {\n        this.domCtx.drawImage(this.skin, this.x, this.y);\n    }\n}\nexports[\"default\"] = Player;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Player.ts?");

/***/ }),

/***/ "./src/layers/TextureLayer.ts":
/*!************************************!*\
  !*** ./src/layers/TextureLayer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass TextureLayer {\n    constructor(_domCtx) {\n        this.blockSize = 32;\n        const [_ctx, _canvas] = this.createLayer();\n        this.canvas = _canvas;\n        this.ctx = _ctx;\n        this.domCtx = _domCtx;\n        this.canvas.width = 960;\n        this.canvas.height = 960;\n    }\n    createLayer() {\n        let canvas = document.createElement('canvas');\n        let ctx = canvas.getContext('2d');\n        return [ctx, canvas];\n    }\n    draw() {\n        this.domCtx.drawImage(this.canvas, 0, 0);\n    }\n}\nexports[\"default\"] = TextureLayer;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/TextureLayer.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst textures_1 = __importDefault(__webpack_require__(/*! ./textures/textures */ \"./src/textures/textures.ts\"));\n// import TextureLayer from \"./TextureLayer\";\nconst BackgroundLayer_1 = __importDefault(__webpack_require__(/*! ./layers/BackgroundLayer */ \"./src/layers/BackgroundLayer.ts\"));\nconst Player_1 = __importDefault(__webpack_require__(/*! ./layers/Player */ \"./src/layers/Player.ts\"));\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n// canvas 960x960\n// wait til textures load ;)\ntextures_1.default[0].onload = () => {\n    const backgroundLayer = new BackgroundLayer_1.default(ctx, textures_1.default[0]);\n    // backgroundLayer.draw()\n    const player1 = new Player_1.default(ctx, 200, 200, textures_1.default[1]);\n    // basic game loop\n    function update() {\n        player1.updatePosition();\n    }\n    function draw() {\n        backgroundLayer.draw();\n        player1.draw();\n    }\n    function loop() {\n        update();\n        draw();\n        window.requestAnimationFrame(loop);\n    }\n    window.requestAnimationFrame(loop);\n};\n\n\n//# sourceURL=webpack://typescript-template/./src/main.ts?");

/***/ }),

/***/ "./src/textures/textures.ts":
/*!**********************************!*\
  !*** ./src/textures/textures.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n// grass\nconst grass_t = new Image();\ngrass_t.src = '../assets/graphics/grass1.png';\n// sand\nconst sand_t = new Image();\nsand_t.src = '../assets/graphics/sand1.png';\n// water\nconst water = new Image();\nwater.src = '../assets/graphics/water/water.png';\n// lepiej tablica\n//niebawem spritesheet ;)\n// jest git\nconst textures = {\n    0: grass_t,\n    1: sand_t,\n    2: water\n};\nexports[\"default\"] = textures;\n\n\n//# sourceURL=webpack://typescript-template/./src/textures/textures.ts?");

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