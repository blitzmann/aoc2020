import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
// let cube = new Map<string, boolean>()

function* comboGenerator(x: number, y: number, z: number) {
    for (let newX = x - 1; newX <= x + 1; newX++) {
        for (let newY = y - 1; newY <= y + 1; newY++) {
            for (let newZ = z - 1; newZ <= z + 1; newZ++) {
                if (JSON.stringify([x, y, z]) !== JSON.stringify([newX, newY, newZ])) {
                    yield [newX, newY, newZ]
                }
            }
        }
    }
}


function* comboGenerator2(x: number, y: number, z: number, w: number) {
    for (let newX = x - 1; newX <= x + 1; newX++) {
        for (let newY = y - 1; newY <= y + 1; newY++) {
            for (let newZ = z - 1; newZ <= z + 1; newZ++) {
                for (let newW = w - 1; newW <= w + 1; newW++) {
                    if (JSON.stringify([x, y, z, w]) !== JSON.stringify([newX, newY, newZ, newW])) {
                        yield [newX, newY, newZ, newW]
                    }
                }
            }
        }
    }
}

const INITIAL_SIZE = 26 // needs to be even because #lazy
const INITIAL_SIZE2 = 40 // needs to be even because #lazy
const printZ = (cube: boolean[][][], z) => {
    for (let y of cube[(INITIAL_SIZE / 2) + z]) {
        console.log(y.map((b, i) => b ? "#" : ".").join(""))
    }
}

const goA = (input) => {
    let cube: boolean[][][] = Array.from(Array(INITIAL_SIZE), () => Array.from(Array(INITIAL_SIZE), () => new Array(INITIAL_SIZE).fill(false)))
    // 11 
    input
        .trim()
        .split("\n")
        .forEach((y, yi) => y.split("").forEach((x, xi) => {
            cube[INITIAL_SIZE / 2][(INITIAL_SIZE / 2) + yi][(INITIAL_SIZE / 2) + xi] = x === "#"
        }));

    for (let _ = 0; _ < 6; _++) {
        let toggles = new Set<[number, number, number]>()
        for (let [zi, z] of cube.entries()) {
            for (let [yi, y] of z.entries()) {
                for (let [xi, x] of y.entries()) {
                    let isActive = !!x
                    let acc = 0;
                    for (let [newX, newY, newZ] of comboGenerator(xi, yi, zi)) {
                        if (cube[newZ]?.[newY]?.[newX] === true) {
                            acc += 1
                        }
                    }
                    if (isActive) {
                        if (!(acc === 2 || acc === 3)) {
                            toggles.add([xi, yi, zi])
                        }
                    }
                    if (!isActive && acc === 3) {
                        toggles.add([xi, yi, zi])
                    }
                }
            }
        }

        for (let [x, y, z] of toggles) {
            cube[z][y][x] = !cube[z][y][x]
        }
    }

    return cube.flatMap((x) => x.flat()).filter(Boolean).length
}

const goB = (input) => {
    let cube: boolean[][][][] = Array.from(Array(INITIAL_SIZE2), () => Array.from(Array(INITIAL_SIZE2), () => Array.from(Array(INITIAL_SIZE), () => new Array(INITIAL_SIZE).fill(false))))
    // 11 
    input
        .trim()
        .split("\n")
        .forEach((y, yi) => y.split("").forEach((x, xi) => {
            cube[INITIAL_SIZE2 / 2][INITIAL_SIZE2 / 2][(INITIAL_SIZE2 / 2) + yi][(INITIAL_SIZE2 / 2) + xi] = x === "#"
        }));

    for (let _ = 0; _ < 6; _++) {
        let toggles = new Set<[number, number, number, number]>()
        for (let [wi, w] of cube.entries()) {
            for (let [zi, z] of w.entries()) {
                for (let [yi, y] of z.entries()) {
                    for (let [xi, x] of y.entries()) {
                    
                        let isActive = !!w
                        let acc = 0;
                        for (let [newX, newY, newZ, newW] of comboGenerator2(xi, yi, zi, wi)) {
                            if (cube[newW]?.[newZ]?.[newY]?.[newX] === true) {
                                acc += 1
                            }
                        }
                        if (isActive) {
                            if (!(acc === 2 || acc === 3)) {
                                toggles.add([xi, yi, zi, wi])
                            }
                        }
                        if (!isActive && acc === 3) {
                            toggles.add([xi, yi, zi, wi])
                        }
                    }
                }
            }

            for (let [x, y, z, w] of toggles) {
                cube[w][z][y][x] = !cube[w][z][y][x]
            }
        }

    }
    return cube.flatMap((x) => x.flatMap(w => w.flat())).filter(Boolean).length
    
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
