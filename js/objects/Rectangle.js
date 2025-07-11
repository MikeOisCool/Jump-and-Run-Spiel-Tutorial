import {ctx} from "../canvas.js"

export class Rectangle {
    constructor(options, type) {
        this.level = null;
        this.pos = options.pos;
        this.size = options.size;
        this.color = options.color;
        this.type = type || "Rectangle";
        this.originalPos = [...this.pos];
    }
    get left() {
        return this.pos[0];
    }

    get right() {
        return this.pos[0] + this.size[0];
    }
    get top() {
        return this.pos[1];
    }

    get bottom() {
        return this.pos[1] + this.size[1];
    }

    setLeft(val) {
        this.pos[0] = val;
    }

    setRight(val) {
        this.pos[0] = val - this.size[0];
    }

    setTop(val) {
        this.pos[1] = val;
    }
    setBottom(val) {
        this.pos[1] = val - this.size[1];
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.pos[0] - this.level.cameraPos[0], 
            this.pos[1] - this.level.cameraPos[1],
            this.size[0], this.size[1]);
    }
    overlapsWith(obj, offset = [0, 0]) {
        if (this === obj) return false;
        return (
            this.left +offset[0] < obj.right &&
            this.right +offset[0] > obj.left &&
            this.top +offset[1] < obj.bottom &&
            this.bottom +offset[1] > obj.top);
    }

   update(deltaTime) {
        // This method can be overridden by subclasses
        // to implement specific update logic.
    }

    reset() {
        this.pos = [...this.originalPos];
    }

}

