/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/auth/Web3Instance.ts":
/*!*****************************************!*\
  !*** ./src/client/auth/Web3Instance.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n// @ts-ignore\nconst web3_min_js_1 = __importDefault(__webpack_require__(/*! web3/dist/web3.min.js */ \"./node_modules/web3/dist/web3.min.js\"));\nconst { ethereum } = window;\nclass Web3Instance {\n    constructor() {\n        this.networkId = 0;\n        // nftTextureContract:any\n        this.myAddress = '';\n        //   public async createContractInterface(){\n        //     const abi = Contract\n        //     const contact_address = \"0xEcb5f82Aa5B07e6420b0acc58A6843F4eb2Bc97a\"\n        //     this.nftTextureContract = new this.web3.eth.Contract(abi, contact_address)\n        //     this.retrieveTokenURI()\n        //   }\n        //   public async mint(_url:string){\n        //     console.log(_url)\n        //     console.log(this.myAddress)\n        //     this.nftTextureContract.methods.createCollectible(_url).send({from: this.myAddress, value:0})\n        //   }\n        //   public async retrieveTokenURI(){\n        //     // const ownedTokenId = await this.nftTextureContract.methods.tokenOfOwnerByIndex(this.myAddress, 3).call()\n        //     // const tokenURI = await this.nftTextureContract.methods.tokenURI(ownedTokenId).call()\n        //     // let image = document.createElement('img')\n        //     // image.src = tokenURI;\n        //     // document.getElementById('page_content')?.appendChild(image);\n        //     // image.style.transform = `scale(0.1)`\n        //     // const response = await this.nftTextureContract.methods.tokenURI(2).call()\n        //     // console.log(tokenURI)\n        //   }\n    }\n    get() {\n        return this.web3;\n    }\n    connectWallet() {\n        var _a;\n        return __awaiter(this, void 0, void 0, function* () {\n            if (ethereum) {\n                this.web3 = new web3_min_js_1.default(ethereum);\n                try {\n                    const accounts = yield window.ethereum.request({ method: 'eth_requestAccounts' });\n                    this.myAddress = accounts[0];\n                    this.networkId = yield this.web3.eth.net.getId();\n                    (_a = document.getElementById('disconnect')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');\n                    this.showAddress(this.myAddress);\n                    console.log(accounts);\n                }\n                catch (error) {\n                    if (error.code === 4001) {\n                        console.log(\"User rejected request\");\n                    }\n                }\n            }\n        });\n    }\n    disconnectWallet() {\n        var _a;\n        return __awaiter(this, void 0, void 0, function* () {\n            if (ethereum) {\n                try {\n                    console.log(\"disconnected!\");\n                    (_a = document.getElementById('disconnect')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');\n                }\n                catch (error) {\n                    console.log(error);\n                }\n            }\n        });\n    }\n    showAddress(myAddress) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const Address_textfield = document.querySelector(\"#connected_address\");\n            if (Address_textfield != null) {\n                Address_textfield.innerText = `Connected as: ${myAddress}`;\n            }\n        });\n    }\n    getMyAddress() {\n        return this.myAddress;\n    }\n}\nexports[\"default\"] = Web3Instance;\n//const bsctestnetUrl:string = \"https://data-seed-prebsc-1-s1.binance.org:8545\"\n\n\n//# sourceURL=webpack://typescript-template/./src/client/auth/Web3Instance.ts?");

/***/ }),

/***/ "./src/client/auth/auth.ts":
/*!*********************************!*\
  !*** ./src/client/auth/auth.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar _a, _b, _c, _d;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Web3Instance_1 = __importDefault(__webpack_require__(/*! ./Web3Instance */ \"./src/client/auth/Web3Instance.ts\"));\nlet web3i;\n(_a = document.getElementById('connectWalletBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', e => {\n    web3i = new Web3Instance_1.default();\n    web3i.connectWallet();\n});\n(_b = document.getElementById('checkSession')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {\n    const res = yield fetch(\"/\" + \"getid\");\n    const resJson = yield res.json();\n    console.log(resJson);\n}));\n(_c = document.getElementById('logoutBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {\n    const res = yield fetch(\"/\" + \"logout\");\n    const resJson = yield res.json();\n    console.log(resJson);\n}));\n(_d = document.getElementById('play')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {\n    const res = yield fetch(\"/\" + \"authphrase\");\n    const resJson = yield res.json();\n    const signature = yield web3i.get().eth.personal.sign(resJson.hashedPhrase, web3i.getMyAddress());\n    // console.log(signature)\n    const resToken = yield fetch(\"/\" + \"auth\", {\n        method: 'POST',\n        headers: {\n            'Accept': 'application/json',\n            'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({ public_key: web3i.getMyAddress(), signature: signature })\n    });\n    const init = yield fetch('/player');\n    const initJson = yield init.json();\n    console.log(initJson);\n    const token = yield resToken.json();\n    console.log(token);\n}));\n\n\n//# sourceURL=webpack://typescript-template/./src/client/auth/auth.ts?");

/***/ }),

/***/ "./node_modules/web3/dist/web3.min.js":
/*!********************************************!*\
  !*** ./node_modules/web3/dist/web3.min.js ***!
  \********************************************/
/***/ ((module) => {


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/auth/auth.ts");
/******/ 	
/******/ })()
;