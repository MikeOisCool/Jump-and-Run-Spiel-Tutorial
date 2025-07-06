import { Box } from "../objects/Box.js";
import { Rectangle } from "../objects/Rectangle.js";
import { Player } from "../objects/Player.js";
import { Goal } from "../objects/Goal.js";
import { Level } from "../Level.js";


export const level2 = new Level({
    size: [800, 600],
    objects:
        [new Goal({
            pos: [125, 20],
            size: [50, 50],
            color: "black"
        }),
        new Player({
            pos: [20, 500],
            size: [40, 40]

        }),
        new Rectangle({
            pos: [600, 250],
            size: [100, 10],
            color: "blue"
        }),
        new Rectangle({
            pos: [50, 100],
            size: [200, 10],
            color: "blue"
        }),
        new Rectangle({
            pos: [180, 500],
            size: [200, 10],
            color: "blue"
        }),
        new Box({
            pos: [180, 500],
            size: [60, 60],
            color: "orange"
        }),
        new Rectangle({
            pos: [0, 800],
            size: [500, 10],
            color: "green"
        }),

        ],
})  