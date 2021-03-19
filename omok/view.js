class View {
    cellSize = 30;

    constructor(x, y) {
        this.width = this.cellSize * x;
        this.height = this.cellSize * y;

        this.createCanvas();

        this.div = document.createElement("div");
        this.div.classList.add("viewpanel");
        this.div.appendChild(this.canvas);
        this.div.appendChild(this.ghostCanvas);
        this.div.onmouseout = () => this.clearGhost();
    }

    set onclick(callback) {
        this.div.onclick = e => {
            const [ix, iy] = this.convert(e.offsetX, e.offsetY);
            callback(ix, iy);
        };
    }

    set onmousemove(callback) {
        this.div.onmousemove = e => {
            const [ix, iy] = this.convert(e.offsetX, e.offsetY);
            callback(ix, iy);
        };
    }

    draw(ctx, color, ix, iy) {
        const x = ix * this.cellSize + this.cellSize / 2;
        const y = iy * this.cellSize + this.cellSize / 2;
        const r = this.cellSize / 2;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    put(color, x, y) {
        this.draw(this.canvas.ctx, color, x, y);
    }

    ghost(color, x, y) {
        this.clearGhost();
        this.draw(this.ghostCanvas.ctx, color, x, y);
    }

    clearGhost() {
        this.ghostCanvas.width = this.width;
    }

    convert(x, y) {
        return [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)];
    }

    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.ctx = this.canvas.getContext("2d");
        this.drawLattice(this.canvas.ctx);

        this.ghostCanvas = document.createElement("canvas");
        this.ghostCanvas.width = this.width;
        this.ghostCanvas.height = this.height;
        this.ghostCanvas.ctx = this.ghostCanvas.getContext("2d");
    }

    drawLattice(ctx) {
        for (let i = 0; i < nx; ++i) {
            ctx.beginPath();
            ctx.moveTo(i * this.cellSize + this.cellSize / 2, 0);
            ctx.lineTo(i * this.cellSize + this.cellSize / 2, this.height);
            ctx.stroke();
        }
        for (let i = 0; i < ny; ++i) {
            ctx.beginPath();
            ctx.moveTo(0, i * this.cellSize + this.cellSize / 2);
            ctx.lineTo(this.width, i * this.cellSize + this.cellSize / 2);
            ctx.stroke();
        }
    }
}
