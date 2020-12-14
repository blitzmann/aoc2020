import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
    input = (input as string).trim().split("\n")
    let maskMap = new Map()
    let memory = new Map()

    for (let line of input) {
        if (line.startsWith("mask")) {
            maskMap.clear();
            line = line.split(" = ")[1]
            maskMap = new Map(line
                .trim()
                .split("")
                .map((x, i) => [x, i])
                .filter(x => x[0] !== "X")
                .map(x => [x[1], Number(x[0])])
            )

        }
        else {
            var [addr, val] = line.split(/mem\[(\d+)\] = (\d+)/).filter(x => x !== "")
            val = (+val)
                .toString(2)
                .padStart(36, "0")
                .split("")
                .map((x, i) => maskMap.get(i)?.toString() || x)
                .join("")
            memory.set(addr, parseInt(val, 2))
        }
    }

    return Array.from(memory.values()).reduce((a, b) => a + b)
}

const goB = (input) => {
    input = (input as string).trim().split("\n")
    let memory = new Map()
    let maskMap;

    for (let line of input) {
        if (line.startsWith("mask")) {
            line = line.split(" = ")[1]
            maskMap = new Map(line
                .trim()
                .split("")
                .map((x, i) => [x, i])
                .filter(x => x[0] !== "0")
                .map(x => [x[1], x[0]])
            )
        }
        else {
            var [addr, val] = line.split(/mem\[(\d+)\] = (\d+)/).filter(x => x !== "")
            const doMap = (x, i) => {
                let mapData = maskMap.get(i)?.toString()
                if (mapData) {
                    if (mapData === "1") {
                        return "1"
                    }
                    return mapData
                }
                return x
            }
            addr =
                addr = (+addr)
                    .toString(2)
                    .padStart(36, "0")
                    .split("")
                    .map(doMap)

            /**
             * to generate the combinations, we can simply count up in binary to the number of combinations
             * needed. This works very well in this case since the combinations are simply 1 and 0
             * eg: ...00X1101X
             * Number of combinations: 4 ( which is 2^(2 x's))
             * counting up in binary produces the following (left padded with 0)
             * 00, 01, 10, and 11
             * For each of those, we can substitute the X in the address.
             */

            let floatIndicies = addr.map((x, i) => [x, i]).filter(x => x[0] === "X").map(x => x[1])
            let numFloat = floatIndicies.length
            let combinations = Math.pow(2, numFloat)

            for (let x = 0; x < combinations; x++) {
                let newAddr = addr
                let combination = x.toString(2).padStart(numFloat, "0").split("")
                for (let [i, bit] of combination.entries()) {
                    newAddr[floatIndicies[i]] = bit
                }
                memory.set(parseInt(newAddr.join(""), 2), +val)
            }
        }
    }

    return Array.from(memory.values()).reduce((a, b) => a + b)
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
