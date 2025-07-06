import { Box } from "../objects/Box.js";
import { Rectangle } from "../objects/Rectangle.js";
import { Player } from "../objects/Player.js";
import { Goal } from "../objects/Goal.js";
import { Level } from "../Level.js";
import { Trampolin } from "../objects/Trampoline.js";


export const level1 = new Level({
    size: [1200, 1000],
    objects:
        [
            new Player({
                pos: [100, 800],
                size: [40, 40]

            }),
            new Rectangle({
                pos: [400, 600],
                size: [100, 10],
                color: "blue"
            }),
            new Rectangle({
                pos: [200, 900],
                size: [10, 100],
                color: "blue"
            }),
            new Rectangle({
                pos: [200, 400],
                size: [100, 10],
                color: "blue"
            }),
            new Box({
                pos: [400, 900],
                size: [60, 60],
                color: "orange"
            }),
            new Rectangle({
                pos: [500, 800],
                size: [500, 10],
                color: "green"
            }),
            new Trampolin({
                pos: [600, 700],
                size: [100, 10],
                color: "orange"
            }),
            new Goal({
                pos: [700, 300],
                size: [50, 50],
                color: "black"
            })
        ],
})  