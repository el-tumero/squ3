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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass GameLoop {\n    constructor(_fps, _ctx) {\n        this.stop = false;\n        this.frameCount = 0;\n        this.elapsed = 0;\n        this.fpsInterval = 0;\n        this.frames = 0;\n        this.now = 0;\n        this.then = 0;\n        this.startTime = 0;\n        this.drawArr = [];\n        this.updatePlayerArr = [];\n        this.updateArr = [];\n        this.fps = _fps;\n        this.ctx = _ctx;\n    }\n    addToDraw(_thingsToDraw) {\n        this.drawArr = _thingsToDraw;\n    }\n    addToUpdatePlayer(_thingsToUpdate) {\n        this.updatePlayerArr = _thingsToUpdate;\n    }\n    addToUpdate(_thingsToUpdate) {\n        this.updateArr = _thingsToUpdate;\n    }\n    update() {\n        this.updateArr.forEach(element => {\n            element.update(this.frames);\n        });\n    }\n    updatePlayer() {\n        this.updatePlayerArr.forEach(element => {\n            element.updatePositionInLayers(this.frames);\n        });\n    }\n    draw() {\n        this.ctx.clearRect(0, 0, 960, 960);\n        this.drawArr.forEach(element => {\n            element.draw();\n        });\n    }\n    framesUpdate() {\n        this.frames++;\n        if (this.frames == 60)\n            this.frames = 0;\n    }\n    startAnimating() {\n        this.fpsInterval = 1000 / this.fps;\n        this.then = Date.now();\n        this.startTime = this.then;\n        this.animate();\n    }\n    animate() {\n        if (this.stop) {\n            return;\n        }\n        this.framesUpdate();\n        requestAnimationFrame(() => this.animate());\n        this.now = Date.now();\n        this.elapsed = this.now - this.then;\n        if (this.elapsed > this.fpsInterval) {\n            this.then = this.now - (this.elapsed % this.fpsInterval);\n            // this.loop()\n            this.update();\n            this.updatePlayer();\n            this.draw();\n        }\n    }\n}\nexports[\"default\"] = GameLoop;\n\n\n//# sourceURL=webpack://typescript-template/./src/GameLoop.ts?");

/***/ }),

/***/ "./src/Map.ts":
/*!********************!*\
  !*** ./src/Map.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst ObjectGrid_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectGrid */ \"./src/layers/ObjectGrid.ts\"));\nconst BackgroundLayer_1 = __importDefault(__webpack_require__(/*! ./layers/BackgroundLayer */ \"./src/layers/BackgroundLayer.ts\"));\nconst ObjectLayer_1 = __importDefault(__webpack_require__(/*! ./layers/ObjectLayer */ \"./src/layers/ObjectLayer.ts\"));\nconst Collision_1 = __importDefault(__webpack_require__(/*! ./layers/Collision */ \"./src/layers/Collision.ts\"));\nconst Player_1 = __importDefault(__webpack_require__(/*! ./layers/Player */ \"./src/layers/Player.ts\"));\nconst Interaction_1 = __importDefault(__webpack_require__(/*! ./layers/Interaction */ \"./src/layers/Interaction.ts\"));\nclass Map {\n    constructor(_ctx, _id, _atlas, _bgLayerBlockId, _objs, _collisions, _interactions) {\n        this.blockSize = 32;\n        this.collisions = [];\n        this.interactions = [];\n        this.ctx = _ctx;\n        this.id = _id;\n        this.backgroundLayer = new BackgroundLayer_1.default(_ctx, _atlas, _bgLayerBlockId);\n        this.objectLayer = new ObjectLayer_1.default(_ctx, _atlas, this.createGrid(_objs));\n        this.objectLayer.loadObjects();\n        this.localPlayer = this.createPlayer();\n        this.addCollision(_collisions);\n        this.addInteractions(_interactions);\n        //console.log(this.localPlayer.interactions[0])\n    }\n    createGrid(_objs) {\n        const grid = new ObjectGrid_1.default();\n        _objs.forEach(_obj => {\n            grid.addObject(_obj.id, _obj.x, _obj.y);\n        });\n        return grid;\n    }\n    addCollision(_collisions) {\n        _collisions.forEach(_collBlock => {\n            this.collisions.push(new Collision_1.default(this, _collBlock.x, _collBlock.y, this.blockSize, this.blockSize));\n        });\n    }\n    addInteractions(_interactions) {\n        _interactions.forEach(_intrBlock => {\n            this.interactions.push(new Interaction_1.default(this.localPlayer, _intrBlock.x, _intrBlock.y, _intrBlock.info, _intrBlock.type));\n        });\n    }\n    createPlayer() {\n        const player1 = new Player_1.default(this.ctx, 480 - (32 / 2), 480 - (32 / 2), this);\n        const playerImg = new Image();\n        playerImg.src = '../assets/graphics/spritesheets/player_spritesheet.png';\n        playerImg.onload = () => {\n            player1.loadSpritesheet(playerImg);\n        };\n        return player1;\n    }\n    updateLayersPosition(mvUp, mvDown, mvRight, mvLeft) {\n        this.backgroundLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft);\n        this.objectLayer.updatePosition(mvUp, mvDown, mvRight, mvLeft);\n    }\n    getColliders() {\n        return this.collisions;\n    }\n    getInteractions() {\n        return this.interactions;\n    }\n    draw() {\n        this.backgroundLayer.draw();\n        this.objectLayer.draw();\n        this.localPlayer.draw();\n    }\n    colMoveX(_speedX) {\n        this.localPlayer.colMoveX(_speedX);\n        this.backgroundLayer.colMoveX(_speedX);\n        this.objectLayer.colMoveX(_speedX);\n    }\n    colMoveY(_speedY) {\n        this.localPlayer.colMoveY(_speedY);\n        this.backgroundLayer.colMoveY(_speedY);\n        this.objectLayer.colMoveY(_speedY);\n    }\n    deleteObject(_x, _y) {\n        this.objectLayer.deleteObject(_x, _y);\n    }\n    getId() {\n        return this.id;\n    }\n    getLocalPlayer() {\n        return this.localPlayer;\n    }\n}\nexports[\"default\"] = Map;\n\n\n//# sourceURL=webpack://typescript-template/./src/Map.ts?");

/***/ }),

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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass BackgroundLayer extends TextureLayer_1.default {\n    constructor(_domCtx, _textureAtlas, _textureId) {\n        super(_domCtx);\n        this.textureAtlas = _textureAtlas;\n        this.canvas.width = 1920;\n        this.canvas.height = 1920;\n        this.textureId = _textureId;\n        this.setBackground();\n    }\n    setBackground() {\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\n                this.ctx.drawImage(this.textureAtlas.texture, this.textureAtlas.cords[this.textureId].x, this.textureAtlas.cords[this.textureId].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\n            }\n        }\n    }\n    draw() {\n        this.domCtx.drawImage(this.canvas, this.x, this.y);\n    }\n}\nexports[\"default\"] = BackgroundLayer;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/BackgroundLayer.ts?");

/***/ }),

/***/ "./src/layers/Collision.ts":
/*!*********************************!*\
  !*** ./src/layers/Collision.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Collision {\n    constructor(_map, _blockX, _blockY, _width, _height) {\n        this.blockSize = 32;\n        this.border = { x: _blockX * this.blockSize, y: _blockY * this.blockSize, width: _width, height: _height };\n        this.width = _width;\n        this.height = _height;\n        this.map = _map;\n        this.player = _map.getLocalPlayer();\n        this.playerSpeed = _map.getLocalPlayer().getSpeed();\n    }\n    check() {\n        let collRect = {\n            x: this.player.getRealX() - this.playerSpeed,\n            y: this.player.getRealY(),\n            width: this.blockSize + this.playerSpeed,\n            height: this.blockSize,\n        };\n        let speedY = Math.sign(collRect.y - this.border.y) * this.player.getSpeed();\n        let speedX = Math.sign(collRect.x - this.border.x) * this.player.getSpeed();\n        const playerRealY = this.player.getRealY();\n        if (this.isCollide(collRect, this.border) && (playerRealY > (this.border.y - 25)) && (playerRealY < (this.border.y + 25))) {\n            this.map.colMoveX(speedX);\n        }\n        if (this.isCollide(collRect, this.border) && ((playerRealY < (this.border.y - 25)) || (playerRealY > (this.border.y + 25)))) {\n            this.map.colMoveY(speedY);\n        }\n    }\n    isCollide(r1, r2) {\n        if (r1.x >= r2.x + r2.width)\n            return false;\n        else if (r1.x + r1.width <= r2.x)\n            return false;\n        else if (r1.y >= r2.y + r2.height)\n            return false;\n        else if (r1.y + r1.height <= r2.y)\n            return false;\n        else\n            return true;\n    }\n}\nexports[\"default\"] = Collision;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Collision.ts?");

/***/ }),

/***/ "./src/layers/Interaction.ts":
/*!***********************************!*\
  !*** ./src/layers/Interaction.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Interaction {\n    constructor(_player, _x, _y, _info, _type) {\n        this.radiusValue = 0;\n        this.blockSize = 32;\n        this.isNear = false;\n        this.x = _x;\n        this.y = _y;\n        this.player = _player;\n        this.centerX = _x * this.blockSize + 16;\n        this.centerY = _y * this.blockSize + 16;\n        this.type = _type;\n        this.info = _info;\n    }\n    // radius fun\n    radius(x1, y1, x2, y2) {\n        let a = x1 - x2;\n        let b = y1 - y2;\n        let c = Math.sqrt(a * a + b * b);\n        return c;\n    }\n    check() {\n        let radius = this.radius(this.player.centerX, this.player.centerY, this.centerX, this.centerY);\n        if (radius <= 64) {\n            this.isNear = true;\n            return;\n        }\n        this.isNear = false;\n    }\n    getType() {\n        return this.type;\n    }\n    getInfo() {\n        return this.info;\n    }\n    isInRange() {\n        return this.isNear;\n    }\n    getX() {\n        return this.x;\n    }\n    getY() {\n        return this.y;\n    }\n}\nexports[\"default\"] = Interaction;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Interaction.ts?");

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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass ObjectLayer extends TextureLayer_1.default {\n    constructor(_domCtx, _textureAtlas, _objGrid) {\n        super(_domCtx);\n        this.textureAtlas = _textureAtlas;\n        this.objGrid = _objGrid;\n        this.canvas.width = 1920;\n        this.canvas.height = 1920;\n    }\n    //tutaj jest git o to własnie chodziło \n    loadObjects() {\n        for (let i = 0; i < this.canvas.width / this.blockSize; i++) {\n            for (let j = 0; j < this.canvas.height / this.blockSize; j++) {\n                if (this.objGrid.grid[i][j] !== 0) { //temp\n                    this.ctx.drawImage(this.textureAtlas.texture, \n                    // thisobjGrid\n                    this.textureAtlas.cords[this.objGrid.grid[i][j]].x, this.textureAtlas.cords[this.objGrid.grid[i][j]].y, this.blockSize, this.blockSize, i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);\n                }\n            }\n        }\n    }\n    // i teraz najlepsza część \n    // tworze ta funckje jako publiczna zebym mogl sie odniesc do niej gdzies daleko stad a zasadzie to w klasie UI\n    // dzięki temu ze klasa UI ma odnosnik do obiektu klasy Map, a klasa Map posiada w sobie odnosnik do obiektu klasy\n    // ObjectLayer bedziemy mogli sie odniesc do tej metody, wiem data flow na poteznym poziomie\n    deleteObject(_x, _y) {\n        // najłatwiej będzie usuwać blok który chcemy, z grida i ponownie wczytywać plansze\n        console.log(_x, _y);\n        this.objGrid.grid[_x][_y] = 0;\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // wiadomo czyscimy nasz wirtualny canvasek\n        this.loadObjects();\n        // i to w zasadzie tyle\n    }\n    draw() {\n        this.domCtx.drawImage(this.canvas, this.x, this.y);\n    }\n}\nexports[\"default\"] = ObjectLayer;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ObjectLayer.ts?");

/***/ }),

/***/ "./src/layers/Player.ts":
/*!******************************!*\
  !*** ./src/layers/Player.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nclass Player extends TextureLayer_1.default {\n    constructor(_domCtx, _x, _y, _map) {\n        super(_domCtx);\n        this.facing = 'none';\n        this.speedX = 3;\n        this.speedY = 3;\n        this.colliders = [];\n        this.interactions = [];\n        this.spriteSize = 32;\n        this.sprite = new Image();\n        this.sx = 0;\n        this.sy = 0;\n        this.x = _x;\n        this.y = _y;\n        this.realX = _x;\n        this.realY = _y;\n        this.centerX = this.realX + 16;\n        this.centerY = this.realY + 16;\n        this.mvUp = false;\n        this.mvDown = false;\n        this.mvRight = false;\n        this.mvLeft = false;\n        this.initControls();\n        this.map = _map;\n        this.interactions = _map.getInteractions();\n        this.colliders = _map.getColliders();\n    }\n    initControls() {\n        document.addEventListener('keydown', e => {\n            if (e.key == \"ArrowUp\") {\n                this.mvUp = true;\n                this.facing = 'up';\n            }\n            if (e.key == \"ArrowDown\") {\n                this.mvDown = true;\n                this.facing = 'down';\n            }\n            if (e.key == \"ArrowRight\") {\n                this.mvRight = true;\n                this.facing = 'right';\n            }\n            if (e.key == \"ArrowLeft\") {\n                this.mvLeft = true;\n                this.facing = 'left';\n            }\n        });\n        document.addEventListener('keyup', e => {\n            if (e.key == \"ArrowUp\") {\n                this.mvUp = false;\n                this.facing = 'up';\n            }\n            if (e.key == \"ArrowDown\") {\n                this.mvDown = false;\n                this.facing = 'down';\n            }\n            if (e.key == \"ArrowRight\") {\n                this.mvRight = false;\n                this.facing = 'right';\n            }\n            if (e.key == \"ArrowLeft\") {\n                this.mvLeft = false;\n                this.facing = 'left';\n            }\n        });\n    }\n    // public loadColliders(_colliders:Array<Collision>){\n    //     this.colliders = _colliders\n    // }\n    // public loadInteractions(_interactions:Array<Interaction>){\n    //     this.interactions = _interactions\n    // }\n    getRealX() {\n        return this.realX;\n    }\n    getRealY() {\n        return this.realY;\n    }\n    colMoveX(_speedX) {\n        this.realX += _speedX;\n    }\n    colMoveY(_speedY) {\n        this.realY += _speedY;\n    }\n    loadSpritesheet(_sprite) {\n        this.sprite = _sprite;\n    }\n    updatePositionInLayers(_frames) {\n        // console.log(_frames)\n        // let borderRect = {\n        //     x: 12*this.blockSize,\n        //     y: 14*this.blockSize,\n        //     width: 32,\n        //     height: 32\n        // }\n        if (this.mvUp) {\n            this.realY -= this.speedY;\n            this.centerY = this.realY + 16;\n            this.animate(_frames, 'up');\n        }\n        if (this.mvDown) {\n            this.realY += this.speedY;\n            this.centerY = this.realY + 16;\n            this.animate(_frames, 'down');\n        }\n        if (this.mvRight) {\n            this.realX += this.speedX;\n            this.centerX = this.realX + 16;\n            this.animate(_frames, 'right');\n        }\n        if (this.mvLeft) {\n            this.realX -= this.speedX;\n            this.centerX = this.realX + 16;\n            this.animate(_frames, 'left');\n        }\n        // aktualizowanie pozycji warstw\n        this.map.updateLayersPosition(this.mvUp, this.mvDown, this.mvRight, this.mvLeft);\n        // sprawdzanie interakcji oraz kolizji\n        this.interactions.forEach(interaction => {\n            interaction.check();\n        });\n        this.colliders.forEach(collider => {\n            collider.check();\n        });\n    }\n    animate(_frames, _direction) {\n        if (_direction == \"up\") {\n            this.sy = 3 * this.spriteSize;\n            if (_frames == 0)\n                this.sx = 0;\n            if (_frames == 20)\n                this.sx = this.spriteSize;\n            if (_frames == 40)\n                this.sx = 2 * this.spriteSize;\n        }\n        if (_direction == \"down\") {\n            this.sy = 0;\n            if (_frames == 0)\n                this.sx = 0;\n            if (_frames == 20)\n                this.sx = this.spriteSize;\n            if (_frames == 40)\n                this.sx = 2 * this.spriteSize;\n        }\n        if (_direction == \"left\") {\n            this.sy = 1 * this.spriteSize;\n            if (_frames == 0)\n                this.sx = 0;\n            if (_frames == 20)\n                this.sx = this.spriteSize;\n            if (_frames == 40)\n                this.sx = 2 * this.spriteSize;\n        }\n        if (_direction == \"right\") {\n            this.sy = 2 * this.spriteSize;\n            if (_frames == 0)\n                this.sx = 0;\n            if (_frames == 20)\n                this.sx = this.spriteSize;\n            if (_frames == 40)\n                this.sx = 2 * this.spriteSize;\n        }\n    }\n    draw() {\n        this.domCtx.drawImage(this.sprite, this.sx, this.sy, this.blockSize, this.blockSize, this.x, this.y, this.blockSize, this.blockSize);\n    }\n    getInteractions() {\n        return this.interactions;\n    }\n}\nexports[\"default\"] = Player;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/Player.ts?");

/***/ }),

/***/ "./src/layers/TextureLayer.ts":
/*!************************************!*\
  !*** ./src/layers/TextureLayer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass TextureLayer {\n    constructor(_domCtx) {\n        this.blockSize = 32;\n        this.speed = 3;\n        this.x = 0;\n        this.y = 0;\n        const [_ctx, _canvas] = this.createLayer();\n        this.canvas = _canvas;\n        this.ctx = _ctx;\n        this.domCtx = _domCtx;\n        this.canvas.width = 960;\n        this.canvas.height = 960;\n    }\n    getSpeed() {\n        return this.speed;\n    }\n    colMoveX(_speedX) {\n        this.x -= _speedX;\n    }\n    colMoveY(_speedY) {\n        this.y -= _speedY;\n    }\n    updatePosition(_mvUp, _mvDown, _mvRight, _mvLeft) {\n        if (_mvUp)\n            this.y += this.speed;\n        if (_mvDown)\n            this.y -= this.speed;\n        if (_mvRight)\n            this.x -= this.speed;\n        if (_mvLeft)\n            this.x += this.speed;\n    }\n    createLayer() {\n        let canvas = document.createElement('canvas');\n        let ctx = canvas.getContext('2d');\n        return [ctx, canvas];\n    }\n}\nexports[\"default\"] = TextureLayer;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/TextureLayer.ts?");

/***/ }),

/***/ "./src/layers/UI.ts":
/*!**************************!*\
  !*** ./src/layers/UI.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst TextureLayer_1 = __importDefault(__webpack_require__(/*! ./TextureLayer */ \"./src/layers/TextureLayer.ts\"));\nconst Letters_1 = __importDefault(__webpack_require__(/*! ./ui/Letters */ \"./src/layers/ui/Letters.ts\"));\nconst Textarea_1 = __importDefault(__webpack_require__(/*! ./ui/Textarea */ \"./src/layers/ui/Textarea.ts\"));\nclass UI extends TextureLayer_1.default {\n    constructor(_domCtx, _mapRef) {\n        super(_domCtx);\n        this.intrRef = null;\n        this.isDetected = false;\n        this.isActive = false;\n        this.panelTexture = new Image();\n        this.mapRef = _mapRef;\n        this.canvas.width = 960;\n        this.canvas.height = 960;\n        this.loadTextures();\n        this.initializeListeners();\n        this.font = new Letters_1.default();\n        this.hintTextarea = new Textarea_1.default(this.font, this.ctx, \"\");\n    }\n    loadTextures() {\n        const panelTexture = new Image();\n        panelTexture.src = \"../assets/graphics/ui/panel.png\";\n        panelTexture.onload = () => {\n            this.panelTexture = panelTexture;\n        };\n    }\n    initializeListeners() {\n        document.addEventListener(\"keydown\", e => {\n            if (e.key === \"e\") {\n                if (this.intrRef !== null && this.intrRef.isInRange() && !this.isActive) {\n                    this.isActive = true;\n                    if (this.intrRef.getType() === 'talk')\n                        console.log('Hi bro!');\n                    if (this.intrRef.getType() === 'open') {\n                        console.log('open da door');\n                        const doorOpenEvent = new CustomEvent('openDoor', { detail: { x: this.intrRef.getX(), y: this.intrRef.getY() } });\n                        document.dispatchEvent(doorOpenEvent);\n                    }\n                    if (this.intrRef.getInfo().includes(\"portal\")) {\n                        let mapId = Number(this.intrRef.getInfo()[6]);\n                        const mapChangeEvent = new CustomEvent('changeMap', { detail: { to: mapId } });\n                        document.dispatchEvent(mapChangeEvent);\n                    }\n                }\n            }\n        });\n    }\n    detectInteraction() {\n        this.mapRef.getLocalPlayer().getInteractions().forEach(interaction => {\n            if (interaction.isInRange()) {\n                this.intrRef = interaction;\n                this.isDetected = true;\n                this.hintTextarea.changeText(interaction.getType());\n            }\n        });\n        if (this.intrRef !== null && !this.intrRef.isInRange()) {\n            this.isDetected = false;\n            this.isActive = false;\n        }\n    }\n    drawHint() {\n        if (this.isDetected && !this.isActive) {\n            this.ctx.drawImage(this.panelTexture, 280, 800); //this.ctx.fillRect(480-200, 800, 400, 100)\n            this.hintTextarea.showText(280, 800);\n        }\n        if (this.isDetected && this.isActive) {\n            this.ctx.clearRect(0, 0, 960, 960);\n            // this.ctx.fillRect(320,320,100,100)\n        }\n        if (!this.isDetected && !this.isActive)\n            this.ctx.clearRect(0, 0, 960, 960);\n    }\n    update() {\n        this.detectInteraction();\n    }\n    draw() {\n        this.drawHint();\n        this.domCtx.drawImage(this.canvas, 0, 0);\n    }\n}\nexports[\"default\"] = UI;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/UI.ts?");

/***/ }),

/***/ "./src/layers/ui/Letters.ts":
/*!**********************************!*\
  !*** ./src/layers/ui/Letters.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Letters {\n    constructor() {\n        this.alphabet = 'abcdefghijklmnoprstuwyxz_';\n        this.letterSize = 32;\n        this.sprite = new Image();\n        this.lettersCords = {};\n        this.setSprite();\n        this.setCords();\n    }\n    getCords(letter) {\n        return this.lettersCords[letter];\n    }\n    getSprite() {\n        return this.sprite;\n    }\n    setSprite() {\n        const lettersTexture = new Image();\n        lettersTexture.src = \"../assets/graphics/ui/letters.png\";\n        this.sprite = lettersTexture;\n    }\n    setCords() {\n        for (let i = 0; i < this.alphabet.length; i++) {\n            this.lettersCords[this.alphabet[i]] = [(i - Math.floor(i / 8) * 8) * this.letterSize, Math.floor(i / 8) * this.letterSize];\n        }\n    }\n}\nexports[\"default\"] = Letters;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ui/Letters.ts?");

/***/ }),

/***/ "./src/layers/ui/Textarea.ts":
/*!***********************************!*\
  !*** ./src/layers/ui/Textarea.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Textarea {\n    constructor(_letters, _uiCtx, _text) {\n        this.textOffset = 20;\n        this.interactionButton = \"e\";\n        this.letters = _letters;\n        this.sprite = _letters.getSprite();\n        const [_ctx, _canvas] = this.createLayer();\n        this.canvas = _canvas;\n        this.ctx = _ctx;\n        this.uiCtx = _uiCtx;\n        this.text = _text.toLocaleLowerCase(); // keys are lowercase\n        //setting width and height\n        this.canvas.width = 400;\n        this.canvas.height = 100;\n        //this.drawCharacters()\n    }\n    changeText(_text) {\n        //console.log(this.text)\n        if (this.text !== _text) {\n            this.text = _text.toLocaleLowerCase();\n            this.drawCharacters();\n        }\n    }\n    drawCharacters() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        let space = 0;\n        for (let i = 0; i < this.text.length; i++) {\n            const cords = this.letters.getCords(this.text[i]);\n            this.ctx.drawImage(this.sprite, cords[0], cords[1], 32, 32, this.textOffset + space, 10, 32, 32);\n            space += 34;\n        }\n        space = 0;\n        const pressText = `press_${this.interactionButton}`;\n        for (let i = 0; i < pressText.length; i++) {\n            const cords = this.letters.getCords(pressText[i]);\n            this.ctx.drawImage(this.sprite, cords[0], cords[1], 32, 32, this.textOffset + space, 42, 32, 32);\n            space += 34;\n        }\n    }\n    createLayer() {\n        let canvas = document.createElement('canvas');\n        let ctx = canvas.getContext('2d');\n        return [ctx, canvas];\n    }\n    showText(ds, dy) {\n        this.uiCtx.drawImage(this.canvas, ds, dy);\n    }\n}\nexports[\"default\"] = Textarea;\n\n\n//# sourceURL=webpack://typescript-template/./src/layers/ui/Textarea.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Atlas_1 = __importDefault(__webpack_require__(/*! ./layers/Atlas */ \"./src/layers/Atlas.ts\"));\nconst GameLoop_1 = __importDefault(__webpack_require__(/*! ./GameLoop */ \"./src/GameLoop.ts\"));\nconst Map_1 = __importDefault(__webpack_require__(/*! ./Map */ \"./src/Map.ts\"));\nconst UI_1 = __importDefault(__webpack_require__(/*! ./layers/UI */ \"./src/layers/UI.ts\"));\nconst map1_json_1 = __importDefault(__webpack_require__(/*! ./mapsData/map1.json */ \"./src/mapsData/map1.json\")); // importuje dane mapy z pliku\nconst map2_json_1 = __importDefault(__webpack_require__(/*! ./mapsData/map2.json */ \"./src/mapsData/map2.json\"));\nconst map3_json_1 = __importDefault(__webpack_require__(/*! ./mapsData/map3.json */ \"./src/mapsData/map3.json\"));\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n// ctx.scale(1.75,1.75)\n// canvas 960x960\n// loading texture atlas\nconst atlasImg = new Image();\natlasImg.src = '../assets/graphics/atlas.png';\nconst game = new GameLoop_1.default(60, ctx);\nlet mainAtlas;\nconst mapsData = [map1_json_1.default, map2_json_1.default, map3_json_1.default];\n// INFO: na razie działa tylko usuwanie obiektów z warstwy obiektowej, nie znika kolizja, to jest do dodanie i do pomyslenia\ndocument.addEventListener(\"changeMap\", (e) => {\n    //console.log()\n    const id = e.detail.to;\n    const mapData = mapsData[id - 1];\n    //console.log(\"MAP CHANGE!\")\n    const nMap = new Map_1.default(ctx, id, mainAtlas, mapData.backgroundLayerBlockId, mapData.objList, mapData.colliders, mapData.interactions);\n    document.addEventListener(\"openDoor\", (e) => {\n        console.log('door opened');\n        const x = e.detail.x;\n        const y = e.detail.y;\n        nMap.deleteObject(x, y);\n    });\n    const ui = new UI_1.default(ctx, nMap);\n    game.addToDraw([nMap, ui]);\n    game.addToUpdate([ui]);\n    game.addToUpdatePlayer([nMap.getLocalPlayer()]);\n});\natlasImg.onload = () => {\n    mainAtlas = new Atlas_1.default(256, 256, atlasImg, 32);\n    const map1 = new Map_1.default(ctx, 1, mainAtlas, map1_json_1.default.backgroundLayerBlockId, map1_json_1.default.objList, map1_json_1.default.colliders, map1_json_1.default.interactions);\n    const ui = new UI_1.default(ctx, map1);\n    game.addToDraw([map1, ui]);\n    game.addToUpdate([ui]);\n    game.addToUpdatePlayer([map1.getLocalPlayer()]);\n    game.startAnimating();\n};\n\n\n//# sourceURL=webpack://typescript-template/./src/main.ts?");

/***/ }),

/***/ "./src/mapsData/map1.json":
/*!********************************!*\
  !*** ./src/mapsData/map1.json ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"objList\":[{\"id\":2,\"x\":4,\"y\":4},{\"id\":2,\"x\":4,\"y\":3},{\"id\":3,\"x\":6,\"y\":8},{\"id\":2,\"x\":24,\"y\":24},{\"id\":2,\"x\":32,\"y\":32},{\"id\":18,\"x\":12,\"y\":14},{\"id\":18,\"x\":10,\"y\":10}],\"colliders\":[{\"x\":4,\"y\":4},{\"x\":4,\"y\":3},{\"x\":12,\"y\":14},{\"x\":6,\"y\":8},{\"x\":10,\"y\":10}],\"interactions\":[{\"x\":6,\"y\":8,\"info\":\"portal2\",\"type\":\"portal\"},{\"x\":12,\"y\":14,\"info\":\"Catus\",\"type\":\"talk\"},{\"x\":10,\"y\":10,\"info\":\"portal3\",\"type\":\"portal\"}],\"backgroundLayerBlockId\":1}');\n\n//# sourceURL=webpack://typescript-template/./src/mapsData/map1.json?");

/***/ }),

/***/ "./src/mapsData/map2.json":
/*!********************************!*\
  !*** ./src/mapsData/map2.json ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"objList\":[{\"id\":3,\"x\":10,\"y\":10},{\"id\":2,\"x\":3,\"y\":3},{\"id\":3,\"x\":21,\"y\":10},{\"id\":3,\"x\":20,\"y\":10},{\"id\":3,\"x\":20,\"y\":11},{\"id\":5,\"x\":20,\"y\":12},{\"id\":3,\"x\":20,\"y\":13},{\"id\":3,\"x\":20,\"y\":14},{\"id\":3,\"x\":21,\"y\":14}],\"colliders\":[{\"x\":10,\"y\":10},{\"x\":3,\"y\":3},{\"x\":21,\"y\":10},{\"x\":20,\"y\":10},{\"x\":20,\"y\":11},{\"x\":20,\"y\":12},{\"x\":20,\"y\":13},{\"x\":20,\"y\":14},{\"x\":21,\"y\":14}],\"interactions\":[{\"x\":3,\"y\":3,\"info\":\"portal1\",\"type\":\"portal\"},{\"x\":10,\"y\":10,\"info\":\"Stone\",\"type\":\"talk\"},{\"x\":20,\"y\":12,\"info\":\"Door\",\"type\":\"open\"}],\"backgroundLayerBlockId\":0}');\n\n//# sourceURL=webpack://typescript-template/./src/mapsData/map2.json?");

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