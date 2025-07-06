import { canvas, clearCanvas } from './canvas.js';
import { Timer } from './objects/Timer.js';
import { hideInfo, writeInfo } from './info.js';



const STATUS = {
    READY: 0,
    STARTED: 1,
    PAUSED: 2

}



export class Level {
    constructor(options) {
        this.size = options.size || [canvas.width, canvas.height];
        this.cameraPos = options.cameraPos || [0, this.size[1] - canvas.height];
        this.originalCameraPos = [...this.cameraPos];
        this.objects = [];
        this.objectsOfType = {
            Rectangle: [],
            Player: [],
            Box: [],
            Goal: []
        };
        this.addObjects(options.objects || []);
        this.Player = null;
        this.timer = new Timer();
        this.timer.update = (deltaTime) => this.update(deltaTime);
        this.status = STATUS.READY;
        this.won = false;
        this.keyFuncRef = (e) => this.keyFunctions(e);
        this.game = null;
    }

    addControls() {
        window.addEventListener("keydown", this.keyFuncRef)
    }

    removeControls() {
        window.removeEventListener("keydown", this.keyFuncRef);
    }

    keyFunctions(e) {
        if (e.key === " ") {
            if (this.status === STATUS.READY) {
                this.start();
            } else if (this.status === STATUS.STARTED) {
                this.pause();
            } else if (this.status === STATUS.PAUSED) {
                this.resume();
            }
        } else if (e.key === "r") {
            if (this.game && typeof this.game.restartGame === "function") {
                this.game.restartGame();
            } else {
                this.reset()
            }
        }
    }

    addObjects(objects) {
        objects.forEach(obj => this.addObject(obj));
    }

    addObject(obj) {
        const type = obj.type;
        this.objects.push(obj);
        this.objectsOfType[type] = this.objectsOfType[type] || [];
        this.objectsOfType[type].push(obj);
        obj.level = this;
    }

    update(deltaTime) {
        if (this.status === STATUS.STARTED) {
            clearCanvas();
            this.updateObjects(deltaTime);
            this.updateCamera();
            this.drawObjects();
            this.checkWin();
        }
    }

    updateObjects(deltaTime) {

        this.objects.forEach(obj => {
            obj.update(deltaTime);
        });

    }

    updateCamera() {
        this.cameraPos[0] = Math.max(
            0,
            Math.min(this.size[0] - canvas.width, this.player.pos[0] + this.player.size[0] / 2 - canvas.width / 2)
        );

        this.cameraPos[1] = Math.max(
            0,
            Math.min(this.size[1] - canvas.height, this.player.pos[1] + this.player.size[1] / 2 - canvas.height / 2)
        );
    }
    drawObjects() {
        this.objects.forEach(obj => {
            obj.draw();
        });
    }
    checkWin() {
        if (!this.won) { return; }
        this.status = STATUS.PAUSED;
        this.timer.pause();
       this.removeControls();
        this.game.switchToNextLevel();;

    }

    start() {
        this.player = this.objectsOfType.Player[0];
        writeInfo(`Level ${this.index}  `);

        this.status = STATUS.STARTED;
        this.timer.paused = false;
        this.timer.start();
        setTimeout(() => {
            hideInfo();
        }, 2000);
    }

    pause() {
        this.status = STATUS.PAUSED;
        this.timer.pause();
        writeInfo("Game paused. Press Space to resume or 'r' to reset the level.");
        //this.removeControls();
    }
    resume() {
        this.status = STATUS.STARTED;
        this.timer.paused = false;
        this.timer.start();

        hideInfo();

    }
    reset() {
        this.objects.forEach(obj => { obj.reset() });
        this.cameraPos = [...this.originalCameraPos];
        this.status = STATUS.READY;
        this.start();
    }
    restartGame() {
        this.currentLevelIndex = 1;
        this.levelList.forEach(level => {
            level.status = 0; // STATUS.READY
            level.won = false;
            if (level.objects) level.objects.forEach(obj => obj.reset && obj.reset());
            level.cameraPos = [...level.originalCameraPos];
        });
        this.start();
    }

}
