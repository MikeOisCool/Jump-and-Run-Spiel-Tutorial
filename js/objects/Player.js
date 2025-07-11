import { Box } from "./Box.js";


export class Player extends Box {
    constructor(options, type) {
        const { pos, size } = options;
        super({
            pos: pos,
            size: size,
            color: "red",
            grav: 0.004,
            friction: 0.2
        },
            type || "Player"
        );
        this.walkSpeed = 0.012;
        this.jumpSpeed = 1.45;
        this.addControls();
    }

    addControls() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.acc = -this.walkSpeed;
                    break;
                case "ArrowRight":
                    this.acc = this.walkSpeed;
                    break;
                case "ArrowUp":
                    if (this.onGround) {
                        this.onGround = false;
                        this.vel[1] = -this.jumpSpeed;
                    }
                    break;
            }
        });
        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.acc = 0;
                    break;
                case "ArrowRight":
                    this.acc = 0;
                    break;
            }
        });

    }

    push(box) {
        return {
            toLeft: () => {
                if (box.type !== "Box") return false;
                const distance = box.right - this.left;
                if (box.canBeMoved([-distance, 0])) {
                    box.setRight(this.left);
                    return true;
                }
                const smallDistance = box.getDistanceToLeftObject();
                if (box.canBeMoved([-smallDistance, 0])) {
                    // console.log("toleft", smallDistance)    ;
                    box.setLeft(box.left - smallDistance);
                    this.setLeft(box.right)
                    return true;
                }
                return false;


            },
            toRight: () => {
                if (box.type !== "Box") return false;
                const distance = this.right - box.left;
                if (box.canBeMoved([distance, 0])) {
                    box.setLeft(this.right);
                    return true;
                }
                const smallDistance = box.getDistanceToRightObject();
                if (box.canBeMoved([-smallDistance, 0])) {
                    //console.log("toright", smallDistance);
                    box.setLeft(box.left + smallDistance);
                    this.setRight(box.left)
                    return true;
                }

                return false;
            },
        };
    }

        playerUpdate() {
            camera.pos[0] = Math.max(
                0,
                Math.min(this.level.size[0] - camera.width, this.right - canvas.width / 2));
            camera.pos[1] = Math.max(
                0,
                Math.min(this.level.size[1] - canvas.height, this.top - canvas.height / 2)
            );
        };

        checkGoal() {
            const result = this.level.objectsOfType.Goal.some(goal => this.overlapsWith(goal));
    
    this.level.won = result;
        }
    }
