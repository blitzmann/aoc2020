import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const regex = /(\d+)-(\d+) ([a-z]): ([a-z]+)/gm;

const isValidA = function(password, test, min, max) {
  // simply split on all letters and filter down to the test case
  const num = password.split("").filter(x=>x===test).length;
  return num >= min && num <= max
}

const isValidB = function(password, test, min, max) {
  const arr = [null, ...password.split("")]; // avoid off-by-one errors
  let tests = [arr[min] === test, arr[max] === test] // create array with the two tests
  return tests.filter(Boolean).length === 1 // make sure we only have 1 test return true
}

const parseData = function(input, validityFunc: (password: string, test: string, min:number, max: number) => boolean) {
  let m;
  let valid: boolean[] = []
  while ((m = regex.exec(input.trim())) !== null) {
    let [_, min, max, test, password] = m
    valid.push(validityFunc(password, test, +min, +max))
  }
  return valid.filter(Boolean).length
}

const goA = (input) => {
  return parseData(input, isValidA)
}

const goB = (input) => {
  return parseData(input, isValidB)

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
