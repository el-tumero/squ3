// grass
const grass_t:HTMLImageElement = new Image();
grass_t.src = '../assets/graphics/grass1.png'
// sand
const sand_t:HTMLImageElement  = new Image();
sand_t.src = '../assets/graphics/sand1.png'
// water
const water:HTMLImageElement  = new Image();
water.src = '../assets/graphics/water/water.png'
// lepiej tablica

//niebawem spritesheet ;)

// jest git
const textures = {
    0: grass_t,
    1: sand_t,
    2: water
}

// export default textures;
export default [grass_t, sand_t, water]