const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 960, 960);