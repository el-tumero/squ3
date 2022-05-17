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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nconst socket_io_1 = __webpack_require__(/*! socket.io */ \"socket.io\");\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst app = (0, express_1.default)();\nconst port = 3000;\nconst server = http_1.default.createServer(app);\nconst io = new socket_io_1.Server(server, {\n    cors: {\n        origin: '*'\n    }\n});\nconst playersDb = {\n    0: [1, 480, 480],\n    1: [1, 432, 336]\n};\n// console.log(Object.entries(playersDb))\n// function getKeyByValue(object:any, value:any) {\n//     return Object.keys(object).find(key => object[key][0] === value);\n//   }\napp.use((0, cors_1.default)());\napp.get('/', (req, res) => {\n    res.send('Test');\n});\napp.get('/mapdata', (req, res) => {\n    const id = req.query.id;\n    const playerDbFormated = Object.entries(playersDb);\n    const result = playerDbFormated.filter(entry => entry[1][0] == id);\n    const json = Object.fromEntries(result);\n    res.json(json);\n});\napp.use('/assets', express_1.default.static(path_1.default.join(process.cwd(), 'assets')));\nlet map1cache = [];\nio.on(\"connection\", socket => {\n    console.log(\"Connected!\");\n    socket.on(\"changeMap\", data => {\n        playersDb[data.who][0] = data.to;\n        io.emit(\"changeMap\", data);\n    });\n    socket.on(\"map1send\", data => {\n        map1cache.push(data);\n        //io.emit(\"map1recv\", data)\n    });\n    // server-side validation -> trzeba zrobić!!\n    setInterval(() => {\n        map1cache.forEach((data) => {\n            io.emit(\"map1recv\", data);\n        });\n        map1cache = [];\n        // trzeba stworzyć typ do data\n    }, 100);\n    socket.on(\"map2send\", data => {\n        io.emit(\"map2recv\", data);\n    });\n});\nserver.listen(port, () => {\n    console.log(\"Server is runinn at port \" + port);\n});\n\n\n//# sourceURL=webpack://typescript-template/./src/server/index.ts?");

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