import { readInput } from "../utils/index";
const prepareInput = (rawInput) => rawInput;
const input = prepareInput(readInput());
const reducer = (instructions, arr) => {
    for (let s of instructions) {
        let half = arr.length / 2;
        if (s !== "F" && s !== "L") {
            arr.splice(0, half);
        }
        else {
            arr.splice(-half);
        }
    }
    return arr[0];
};
let cache;
const goA = (input) => {
    let arr = input.split("\n");
    cache = arr.map(seatCode => {
        let rowIns = seatCode.split("");
        let colIns = rowIns.splice(7);
        let row = reducer(rowIns, new Array(128).fill(null).map((u, i) => i));
        let col = reducer(colIns, new Array(8).fill(null).map((u, i) => i));
        let seatID = (row * 8) + col;
        return [row, col, seatID];
    });
    return Math.max(...cache.map(x => x[2]));
};
let plane = new Array(128).fill(null).map(x => new Array(8).fill(false));
const goB = (input) => {
    for (let [row, col, seatID] of cache) {
        plane[row][col] = seatID.toString().padStart(3, '0');
    }
    var started = false;
    for (let row of plane.keys()) {
        for (let col of plane[row].keys()) {
            let seat = plane[row][col];
            if (!started && seat) {
                started = true;
                continue;
            }
            if (started && !seat) {
                return (row * 8) + col;
            }
        }
    }
};
/* Tests */
// test()
/* Results */
console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");
console.log(plane);
console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
//# sourceMappingURL=index.js.map