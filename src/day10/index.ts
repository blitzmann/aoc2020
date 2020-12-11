import { AsyncResource } from "async_hooks"
import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  input = input.split("\n").map(Number).sort((a, b)=>a-b)
  input.unshift(0) // add 0

  let diffs = new Array(4).fill(0) // create an array for our diff collectioss, where the index is the diff
  diffs[3] += 1; // device diff, this is always a given
  for (let x=1; x<input.length; x++){
    let diff = input[x]-input[x-1]
    diffs[diff] +=1
  }
  return diffs[1] * diffs[3]
}

const goB = (input) => {
  input = input.split("\n").map(Number).sort((a, b)=>a-b)
  input.unshift(0) // add 0
  input.push(input[input.length-1]+3)
  let uniq = new Set(input)

  let acc = 0;
  for (let x = 0; x<input.length;x++){
    let val = input[x];
    if (uniq.has(val+1)){
      acc+=1
    }
    if (uniq.has(val+2)){
      acc+=1
    }
    if (uniq.has(val+3)){
      acc+=1
    }
  }

  return acc
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
