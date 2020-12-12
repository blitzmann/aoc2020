import { AsyncResource } from "async_hooks"
import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
    input = input.split("\n").map(Number).sort((a, b) => a - b)
    input.unshift(0) // add 0

    let diffs = new Array(4).fill(0) // create an array for our diff collectioss, where the index is the diff
    diffs[3] += 1; // device diff, this is always a given
    for (let x = 1; x < input.length; x++) {
        let diff = input[x] - input[x - 1]
        diffs[diff] += 1
    }
    return diffs[1] * diffs[3]
}

const goB = (input) => {
    input = input.split("\n").map(Number).sort((a, b) => a - b)
    input.unshift(0) // add 0
    input.push(input[input.length-1] + 3)

    /**
     * Some commentary: Since this isn't a problem that can be brute forced, some extra thought is needed to find the answer. After some playing 
     * with the numbers and arrays I noticed that the problem can be broken down into sub problems that can then be used to calculate the answer 
     * using simple combination formulas. The following is an attempt to explain it to my future self
     * 
     * Take the given test case as an example: [0, 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, 23]
     * Broken down into the following diffs:   [1, 3, 1, 1, 1, 3, 1,  1,  3,  1,  3,  3]
     * 
     * Anything with a diff of 3 is going to happen in every combination since there's no other route around it. We can exploit this by basically 
     * splitting the array into multiple problem groups on the 3 diffs:
     * [subgroup]--- 3 diff --->[subgroup]--- 3 diff --->[subgroup]
     * We can then solve the much smaller subgroups, which are all sequential arrays, using a recursive function:
     * 
     * [0, 1] - 1 combination (0 > 1)
     * [4, 5, 6, 7] - 4 combinations (4 > 5 > 6 > 7 and 4 > 6 > 7 and 4 > 5 > 7 and 4 > 7)
     * [10, 11, 12] - 2 combinations (10 > 11 > 12 and 10 > 12)
     * [15, 16] - 1 combination (15 > 16)
     * [19] - 1 combination (inherit)
     * 
     * We calculate the product of these combinations to find the answer: 1*4*2*1*1 = 8
     * 
     * In the implementation, I condense the subgroups into simply a number representing the length (so 2, 4, 3, 2, 1), and then use that to build an array 1-n
     * to do the calculations, of which I cache (probably unneeded)
     * 
     * Side note: while looking at the diffs, I noticed that only diffs of 1 and 3 were present in my input and the test input. No 2's. 
     * I'm unsure if this is a fluke, or an undocumented property of the challenge. But because of that, I'm unsure if this will actually
     * work for an input with diffs of 2, as I really narrowed in on my understanding of getting it to work with 1's and 3's.
     */

    // generate the diff array.
    let diffs = input.map((num, i) => input[i + 1] - num)
    diffs.pop() // remove NaN. Janky way, but I don't even care anymore

    console.log("Diffs: ", diffs)

    // calculate the sequential subgroup lengths
    let seqGroupLens = []
    let currAcc = 0
    for (let x of diffs) {
        if (x === 3) {
            seqGroupLens.push(currAcc + 1)
            currAcc = 0 // reset accumulator
            continue
        }
        currAcc+=1
    }

    console.log("sub arrays: ", seqGroupLens)

    let cache = new Map()

    function doSeqCombinationCalc(length) {
        if (cache.has(length)){
            return cache.get(length)
        }
        let subArr = new Array(length).fill(0).map((_, i) => i + 1)
        
        let end = length
        
        let uniq = new Set(subArr)
        let acc = 0

        function run(val) {
            if (val === end) {
                return acc += 1
            }

            // test up to three numbers ahead
            for (let mod of new Array(3).fill(0).map((_, i) => i + 1)) {
                let newVal = val + (mod)
                if (uniq.has(newVal)) {
                    run(newVal)
                }
            }
        }

        run(subArr[0])

        cache.set(length, acc)
        return acc
    }

    console.log("combinations: ", seqGroupLens.map(doSeqCombinationCalc))

    // for all lengths, get the combinations for them, and then reduce to the product
    return seqGroupLens.map(doSeqCombinationCalc).reduce((a,b)=>a*b)
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
