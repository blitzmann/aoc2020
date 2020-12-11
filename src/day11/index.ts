import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

enum TILETYPE {
    FLOOR = '.',
    EMPTY = 'L',
    OCCUPIED = '#'
}

class Layout {
    private directions = {
        N: [-1, 0],
        S: [1, 0],
        E: [0, 1],
        W: [0, -1],
        NE: [-1, 1],
        NW: [-1, -1],
        SW: [1, -1],
        SE: [1, 1]
    }
    constructor(public layout, public expandedVision = false, public tolerance = 4) { }

    run() {
        let changes: [number, number][] = []

        for (let [ix, row] of this.layout.entries()) {
            for (let [iy, cell] of row.entries()) {
                let test = this.testOccupied(ix, iy)

                if (
                    (cell === TILETYPE.EMPTY && test === 0)
                    || (cell === TILETYPE.OCCUPIED && test >= this.tolerance)
                ) {
                    changes.push([ix, iy])
                }
            }
        }

        for (let [x, y] of changes) {
            this.layout[x][y] = this.layout[x][y] === TILETYPE.EMPTY ? TILETYPE.OCCUPIED : TILETYPE.EMPTY
        }
    }


    testOccupied(x, y) {
        let sum = 0;
        for (let mod in this.directions) {
            let modx = x, mody = y
            do {
                modx += this.directions[mod][0]
                mody += this.directions[mod][1]
                // keep adding until we find a seat
            } while (this.expandedVision && this.layout[modx]?.[mody] === TILETYPE.FLOOR)

            if (modx < 0 || modx > this.layout.length - 1) {
                continue
            }
            if (mody < 0 || mody > this.layout[0].length - 1) {
                continue
            }
            if (this.layout[modx][mody] === TILETYPE.OCCUPIED) {
                sum += 1
            }
        }
        return sum
    }

    get state() {
        return this.layout.map(x => x.join('')).join('')
    }

    get numOccupied() {
        return this.state.split("").filter(x => x === TILETYPE.OCCUPIED).length
    }

    print() {
        for (let x of this.layout) {
            console.log(x.join(''))
        }
    }
}

const doRuns = (layout) => {
    let prevState
    let state
    do {
        prevState = state
        layout.run()
        state = layout.state
    }
    while (state != prevState)

    return layout.numOccupied
}

const goA = (input) => {
    let layout = new Layout(input.trim().split("\n").map(x => x.split("")))
    return doRuns(layout)
}

const goB = (input) => {
    let layout = new Layout(input.trim().split("\n").map(x => x.split("")), true, 5)
    return doRuns(layout)
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
