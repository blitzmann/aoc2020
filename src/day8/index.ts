import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input: [string, number][] = prepareInput(readInput()).trim()
    .split('\n')
    .map((x) => x.split(' '))
    .map((x: any) => {
        x[1] = Number(x[1]);
        return x;
    });

function run(input) {
    let acc = 0;
    let visited = new Set();
    let infinite = false;
    for (let x = 0; x < input.length; x++) {
        let [instruction, value] = input[x];
        if (visited.has(x)) {
            infinite = true;
            break;
        }
        visited.add(x);
        switch (instruction) {
            case 'nop':
                continue;
            case 'acc':
                acc += value;
                break;
            case 'jmp':
                x = x + value - 1;
        }
    }
    return [infinite, acc];
}

const goA = (input) => {
    return run(input)[1]
}

const goB = (input) => {

    for (let [i, el] of input.entries()) {
        if (el[0] === 'acc') {
            continue;
        }
        let newInput = [...input];
        if (el[0] === 'jmp') {
            newInput[i] = ['nop', el[1]];
        } else {
            newInput[i] = ['jmp', el[1]];
        }
        let result = run(newInput);
        if (result[0]) {
            continue;
        }
        return result[1];
    }
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
