import { readInput } from "../utils/index";
const prepareInput = (rawInput) => rawInput;
const input = prepareInput(readInput()).trim()
    .split('\n')
    .map(Number);
const PREAMBLE = 25;
function* comb(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            yield arr[i] + arr[j];
        }
    }
}
function isValid(window, test) {
    let uniq = [...new Set(window)];
    uniq.sort((a, b) => a - b);
    let min = uniq[0] + uniq[1];
    let max = uniq[23] + uniq[24];
    if (test < min || test > max) {
        return false;
    }
    // do combinations
    for (let x of comb(window)) {
        if (x === test) {
            return true;
        }
    }
    return false;
}
let part_1;
const goA = (input) => {
    for (let x = PREAMBLE; x < input.length; x++) {
        if (!isValid(input.slice(x - PREAMBLE, x), input[x])) {
            part_1 = input[x];
            break;
        }
    }
    return part_1;
};
const goB = (input) => {
    let acc;
    // main loops shifts our base window
    mainLoop: for (let x = 0; x < input.length; x++) {
        acc = [input[x]];
        let sum = input[x];
        let y = x;
        // expanding loop continues with expanding the window that we're searching for and breaks when the sum is greater than our target
        expandingLoop: while (sum < part_1) {
            y += 1;
            acc.push(input[y]);
            sum = acc.reduce((a, b) => a + b, 0);
            if (sum === part_1) {
                break mainLoop; // we found our answer, break out of all loops
            }
        }
    }
    acc.sort((a, b) => a - b);
    return acc[0] + acc[acc.length - 1];
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