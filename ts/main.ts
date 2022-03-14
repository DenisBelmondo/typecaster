const TICK_RATE: number = 1000 / 30;

const mapWidth: number = 24;
const mapHeight: number = 24;

const worldMap: Array<Array<number>> = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let _canvasElement: HTMLCanvasElement | null = null;
let _ctx: CanvasRenderingContext2D | null = null
let _screenBuffer: Uint8ClampedArray | null = null;
let _screenWidth: number = 0;
let _screenHeight: number = 0;

let posX: number = 22;
let posY: number = 12;
let dirX: number = -1;
let dirY: number = 0;
let planeX: number = 0;
let planeY: number = 0.5;

function plot(x: number, y: number, r: number, g: number, b: number): void {
    const i: number = ((_screenWidth * y) + x) * 4;

    _screenBuffer![i] = r;
    _screenBuffer![i + 1] = g;
    _screenBuffer![i + 2] = b;
    _screenBuffer![i + 3] = 255;
}

function span(x: number, y1: number, y2: number, r: number, g: number, b: number): void {
    for (let y = 0; y < _screenHeight; y++) {
        const mul: number = +(y >= y1 && y <= y2);
        plot(x, y, r * mul, g * mul, b * mul);
    }
}

function tick(): void {
    let rotSpeed: number = 0.0125;

    let oldDirX: number = dirX;
    dirX = dirX * Math.cos(-rotSpeed) - dirY * Math.sin(-rotSpeed);
    dirY = oldDirX * Math.sin(-rotSpeed) + dirY * Math.cos(-rotSpeed);
    let oldPlaneX: number = planeX;
    planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
    planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
}

function update(_delta: number): void {
}

function draw(_delta: number): void {
    const w: number = _screenWidth;
    const h: number = _screenHeight;

    for (let x = 0; x < w; x++) {
        // calculate ray position and direction
        let cameraX: number = 2 * x / w - 1; // x-coordinate in camera space
        let rayDirX: number = dirX + planeX * cameraX;
        let rayDirY: number = dirY + planeY * cameraX;
        // which box of the map we're in
        let mapX: number = posX | 0;
        let mapY: number = posY | 0;

        // length of ray from current position to next x or y-side
        let sideDistX: number = 0;
        let sideDistY: number = 0;

        // length of ray from one x or y-side to next x or y-side
        // these are derived as:
        // deltaDistX = sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX))
        // deltaDistY = sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY))
        // which can be simplified to abs(|rayDir| / rayDirX) and abs(|rayDir| / rayDirY)
        // where |rayDir| is the length of the vector (rayDirX, rayDirY). Its length,
        // unlike (dirX, dirY) is not 1, however this does not matter, only the
        // ratio between deltaDistX and deltaDistY matters, due to the way the DDA
        // stepping further below works. So the values can be computed as below.
        // Division through zero is prevented, even though technically that's not
        // needed in C++ with IEEE 754 floating point values.
        let deltaDistX = Math.abs(1 / rayDirX);
        let deltaDistY = Math.abs(1 / rayDirY);

        let perpWallDist: number = 0;

        // what direction to step in x or y-direction (either +1 or -1)
        let stepX: number = 0;
        let stepY: number = 0;

        let hit: number = 0; // was there a wall hit?
        let side: number = 0; // was a NS or a EW wall hit?
        // calculate step and initial sideDist
        if (rayDirX < 0) {
            stepX = -1;
            sideDistX = (posX - mapX) * deltaDistX;
        }
        else {
            stepX = 1;
            sideDistX = (mapX + 1.0 - posX) * deltaDistX;
        }

        if (rayDirY < 0) {
            stepY = -1;
            sideDistY = (posY - mapY) * deltaDistY;
        }
        else {
            stepY = 1;
            sideDistY = (mapY + 1.0 - posY) * deltaDistY;
        }
        // perform DDA
        while (!hit) {
            // jump to next map square, either in x-direction, or in y-direction
            if (sideDistX < sideDistY) {
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
            }
            else {
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
            }
            // Check if ray has hit a wall
            hit = worldMap[mapX][mapY];
        }

        // Calculate distance projected on camera direction. This is the shortest distance from the point where the wall is
        // hit to the camera plane. Euclidean to center camera point would give fisheye effect!
        // This can be computed as (mapX - posX + (1 - stepX) / 2) / rayDirX for side == 0, or same formula with Y
        // for size == 1, but can be simplified to the code below thanks to how sideDist and deltaDist are computed:
        // because they were left scaled to |rayDir|. sideDist is the entire length of the ray above after the multiple
        // steps, but we subtract deltaDist once because one step more into the wall was taken above.
        if (side == 0) {
            perpWallDist = (sideDistX - deltaDistX);
        }
        else {
            perpWallDist = (sideDistY - deltaDistY);
        }

        // Calculate height of line to draw on screen
        let lineHeight: number = (h / perpWallDist) | 0;

        // calculate lowest and highest pixel to fill in current stripe
        let drawStart = -lineHeight / 2 + h / 2;
        if (drawStart < 0) {
            drawStart = 0;
        }

        drawStart |= 0;

        let drawEnd = lineHeight / 2 + h / 2;
        if (drawEnd >= h) {
            drawEnd = h - 1;
        }

        drawEnd |= 0;

        // choose wall color
        let r: number = 0;
        let g: number = 0;
        let b: number = 0;
        switch (worldMap[mapX][mapY]) {
            case 1:
                r = 255;
                break; // red
            case 2:
                g = 255;
                break; // green
            case 3:
                b = 255;
                break; // blue
            case 4:
                r = g = b = 255;
                break; // white
            default:
                r = g = 255;
                break; // yellow
        }

        // give x and y sides different brightness
        if (side == 1) {
            r /= 2;
            g /= 2;
            b /= 2;
        }

        // draw the pixels of the stripe as a vertical line
        span(x, drawStart, drawEnd, r, g, b);
    }
    // timing for input and FPS counter
}

window.addEventListener('load', (e: Event) => {
    _canvasElement = document.getElementById('the-canvas') as HTMLCanvasElement;
    if (!_canvasElement) {
        return;
    }

    _ctx = _canvasElement.getContext('2d');
    if (!_ctx) {
        return;
    }

    _screenWidth = _canvasElement.width;
    _screenHeight = _canvasElement.height;

    dirX = _screenWidth / _screenHeight / 2;
    // If the direction vector and the camera plane vector have the same length,
    // the FOV will be 90 degrees
    planeY = -dirX;

    _screenBuffer = new Uint8ClampedArray(_screenWidth * _screenHeight * 4);

    let prevTime: number = Date.now();
    let lag: number = 0;

    (function updateWrapper(): void {
        let curTime: number = Date.now();
        let delta: number = curTime - prevTime;
        prevTime = curTime;
        lag += delta;

        update(delta);

        for (; lag >= TICK_RATE; lag -= TICK_RATE) {
            tick();
        }

        draw(delta);
        _ctx.putImageData(new ImageData(_screenBuffer, _screenWidth, _screenHeight), 0, 0);

        window.requestAnimationFrame(updateWrapper);
    })();
});
