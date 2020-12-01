import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  let arr = input.split("\n").map(Number)
  
  for (let [ix, x] of arr.entries()) {
    for (let [iy, y] of arr.entries()){
      if (iy === ix) continue;
      if (x + y === 2020){
        return x*y
      }
    }
  }
  return input
}

const goB = (input) => {
  let arr = input.split("\n").map(Number)

  for (let [ix, x] of arr.entries()) {
    for (let [iy, y] of arr.entries()){
      for (let [iz, z] of arr.entries()){
        if (iy === ix || iz === ix) continue;
        if (x + y + z === 2020){
          return x*y*z
        }
      }
    }
  }
  return
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
