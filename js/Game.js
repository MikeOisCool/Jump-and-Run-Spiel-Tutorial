const levelCount = document.getElementById("levelCount");

import { level1 } from "./levels/level1.js";
import { level2 } from "./levels/level2.js";
import { level3 } from "./levels/level3.js";
import { writeInfo } from "./info.js";
import { level4 } from "./levels/level4.js";

export class Game {
    constructor(levelList) {
        this.levelList = [];
        for (const lev of levelList) {
            this.levelList.push(lev);
            lev.game = this;
            lev.index = this.levelList.length;
        }
        this.currentLevelIndex = 1;
    }

    get currentLevel() {
        return this.levelList[this.currentLevelIndex - 1];
    }

    start() {
        if (this.levelList.length === 0) return;
            this.currentLevel.drawObjects();
            this.currentLevel.addControls();
            levelCount.innerHTML = `Level ${this.currentLevel.index} of ${this.levelList.length}`;
            
            writeInfo(`Level ${this.currentLevel.index} - Press Space to start or pause the game.<br>` + "Press 'r' to restart the level." );
            

        }
    
    switchToNextLevel() {
        this.currentLevelIndex++;
        if (this.currentLevelIndex > this.levelList.length) {
            writeInfo("You won the game!");
            return;
        }
        this.currentLevel.drawObjects();
        this.currentLevel.start();
        levelCount.innerHTML = `Level ${this.currentLevel.index} of ${this.levelList.length}`;
            
    }
}

export const game = new Game([level1, level2, level3, level4]);