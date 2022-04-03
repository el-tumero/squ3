const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 960, 960);

// async function drawMap() {
    
//     await getData();

//     for (let i = 0; i < 960; i+=64) {
//         for (let j = 0; j < 960; j+=64) {
//             bg.drawImage(textures[], i, j, 64, 64);
//         }
//     }
//     render();
// }

