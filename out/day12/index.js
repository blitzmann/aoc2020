import { readInput } from "../utils/index";
const prepareInput = (rawInput) => rawInput;
const input = prepareInput(readInput());
var CONST;
(function (CONST) {
    CONST["FORWARD"] = "F";
    CONST["RIGHT"] = "R";
    CONST["LEFT"] = "L";
    CONST["NORTH"] = "N";
    CONST["SOUTH"] = "S";
    CONST["WEST"] = "W";
    CONST["EAST"] = "E";
})(CONST || (CONST = {}));
let directionTurn = new Map([
    // dir      left     right
    [CONST.EAST, [CONST.NORTH, CONST.SOUTH]],
    [CONST.NORTH, [CONST.WEST, CONST.EAST]],
    [CONST.SOUTH, [CONST.EAST, CONST.WEST]],
    [CONST.WEST, [CONST.SOUTH, CONST.NORTH]],
]);
let directionMod = new Map([
    [CONST.EAST, [1, null]],
    [CONST.NORTH, [null, 1]],
    [CONST.SOUTH, [null, -1]],
    [CONST.WEST, [-1, null]],
]);
// x, y
const goA = (input) => {
    input = input.split("\n").map(x => {
        return x.split(/([A-Z])(\d+)/).filter(x => x !== "");
    });
    let direction = CONST.EAST;
    let coord = [0, 0];
    for (let ins of input) {
        switch (ins[0]) {
            case CONST.FORWARD: {
                let [modx, mody] = directionMod.get(direction);
                if (modx) {
                    coord[0] += (modx * ins[1]);
                }
                if (mody) {
                    coord[1] += (mody * ins[1]);
                }
                break;
            }
            case CONST.RIGHT:
            case CONST.LEFT: {
                let num = +ins[1] / 90;
                for (let x = 0; x < num; x++) {
                    direction = directionTurn.get(direction)[ins[0] === CONST.RIGHT ? 1 : 0];
                }
                break;
            }
            case CONST.NORTH:
            case CONST.SOUTH:
            case CONST.EAST:
            case CONST.WEST: {
                let [modx, mody] = directionMod.get(ins[0]);
                if (modx) {
                    coord[0] += (modx * ins[1]);
                }
                if (mody) {
                    coord[1] += (mody * ins[1]);
                }
                break;
            }
        }
    }
    return Math.abs(coord[0]) + Math.abs(coord[1]);
};
const goB = (input) => {
    input = input.split("\n").map(x => {
        return x.split(/([A-Z])(\d+)/).filter(x => x !== "");
    });
    let waypointRel = [10, 1];
    let coord = [0, 0];
    for (let ins of input) {
        switch (ins[0]) {
            case CONST.FORWARD:
                coord[0] += ins[1] * waypointRel[0];
                coord[1] += ins[1] * waypointRel[1];
                break;
            case CONST.RIGHT: {
                let num = +ins[1] / 90;
                for (let x = 0; x < num; x++) {
                    waypointRel = [waypointRel[1], -1 * waypointRel[0]];
                }
                break;
            }
            case CONST.LEFT: {
                let num = +ins[1] / 90;
                for (let x = 0; x < num; x++) {
                    waypointRel = [waypointRel[1] * -1, waypointRel[0]];
                }
                break;
            }
            case CONST.NORTH:
            case CONST.SOUTH:
            case CONST.EAST:
            case CONST.WEST: {
                let [modx, mody] = directionMod.get(ins[0]);
                if (modx) {
                    waypointRel[0] += (modx * ins[1]);
                }
                if (mody) {
                    waypointRel[1] += (mody * ins[1]);
                }
                break;
            }
        }
    }
    return Math.abs(coord[0]) + Math.abs(coord[1]);
};
/* Tests */
// test()
/* Results */
console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");
console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
//# sourceMappingURL=index.js.map