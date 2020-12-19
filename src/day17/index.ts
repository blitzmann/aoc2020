import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
// let cube = new Map<string, boolean>()

function* comboGenerator(z: number, y: number, x: number) {
    for (let newX = x - 1; newX <= x + 1; newX++) {
        for (let newY = y - 1; newY <= y + 1; newY++) {
            for (let newZ = z - 1; newZ <= z + 1; newZ++) {
                if (JSON.stringify([z, y, x]) !== JSON.stringify([newZ, newY, newX])) {
                    yield [newZ, newY, newX]
                }
            }
        }
    }
}

function* comboGenerator2(w: number, z: number, y: number, x: number) {
    for (let newX = x - 1; newX <= x + 1; newX++) {
        for (let newY = y - 1; newY <= y + 1; newY++) {
            for (let newZ = z - 1; newZ <= z + 1; newZ++) {
                for (let newW = w - 1; newW <= w + 1; newW++) {
                    if (JSON.stringify([w, z, y, x]) !== JSON.stringify([newW, newZ, newY, newX])) {
                        yield [newW, newZ, newY, newX]
                    }
                }
            }
        }
    }
}

const goA = (input) => {
    input = input.trim().split("\n")
    const CYCLES = 6
    const DIMENSIONS = 3
    const INITIAL_SIZE = 2 * Math.ceil(input[0].length + (CYCLES * DIMENSIONS) / 2.0)  // needs to be even because #lazy

    let cube: boolean[][][] = Array.from(Array(INITIAL_SIZE), () => Array.from(Array(INITIAL_SIZE), () => new Array(INITIAL_SIZE).fill(false)))
    // 11 

    input.forEach((y, yi) => y.split("").forEach((x, xi) => {
        cube[INITIAL_SIZE / 2][(INITIAL_SIZE / 2) + yi][(INITIAL_SIZE / 2) + xi] = x === "#"
    }));

    for (let _ = 0; _ < CYCLES; _++) {
        let toggles = new Set<[number, number, number]>()
        for (let [zi, z] of cube.entries()) {
            for (let [yi, y] of z.entries()) {
                for (let [xi, x] of y.entries()) {
                    let isActive = !!x
                    let acc = 0;
                    for (let [newZ, newY, newX] of comboGenerator(zi, yi, xi)) {
                        if (cube[newZ]?.[newY]?.[newX] === true) {
                            acc += 1
                        }
                    }
                    if (isActive) {
                        if (!(acc === 2 || acc === 3)) {
                            toggles.add([zi, yi, xi])
                        }
                    }
                    if (!isActive && acc === 3) {
                        toggles.add([zi, yi, xi])
                    }
                }
            }
        }

        for (let [z, y, x] of toggles) {
            cube[z][y][x] = !cube[z][y][x]
        }
    }

    return cube.flatMap((x) => x.flat()).filter(Boolean).length
}

const goB = (input) => {
    input = input.trim().split("\n")
    const CYCLES = 6
    const DIMENSIONS = 3
    const INITIAL_SIZE = 2 * Math.ceil(input[0].length + (CYCLES * DIMENSIONS) / 2.0)  // needs to be even because #lazy

    let cube: boolean[][][][] = Array.from(
        Array(INITIAL_SIZE), () =>
        Array.from(Array(INITIAL_SIZE), () =>
            Array.from(Array(INITIAL_SIZE), () =>
                new Array(INITIAL_SIZE).fill(false)
            )
        )
    )
    // 11 

    input.forEach((y, yi) => y.split("").forEach((x, xi) => {
        cube[INITIAL_SIZE / 2][INITIAL_SIZE / 2][(INITIAL_SIZE / 2) + yi][(INITIAL_SIZE / 2) + xi] = x === "#"
    }));

    for (let _ = 0; _ < CYCLES; _++) {
        let toggles = new Set<[number, number, number, number]>()
        for (let [wi, w] of cube.entries()) {
            for (let [zi, z] of w.entries()) {
                for (let [yi, y] of z.entries()) {
                    for (let [xi, x] of y.entries()) {
                        let isActive = !!x
                        let acc = 0;
                        for (let [newW, newZ, newY, newX] of comboGenerator2(wi, zi, yi, xi)) {
                            if (cube[newW]?.[newZ]?.[newY]?.[newX] === true) {
                                acc += 1
                            }
                        }
                        if (isActive) {
                            if (!(acc === 2 || acc === 3)) {
                                toggles.add([wi, zi, yi, xi])
                            }
                        }
                        if (!isActive && acc === 3) {
                            toggles.add([wi, zi, yi, xi])
                        }
                    }
                }
            }
        }


        for (let [w, z, y, x] of toggles) {
            cube[w][z][y][x] = !cube[w][z][y][x]
        }
    }

    return cube.flatMap((x) => x.flatMap(y => y.flat())).filter(Boolean).length

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
