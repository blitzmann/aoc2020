import { test, readInput } from "../utils/index"
import { writeFileSync } from "fs"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

class FixedQueue extends Array {
  pushTurn(turn: number) {
    this.unshift(turn)
    this.splice(2, this.length - 1)
    return this
  }
}

const LOOKBACK_WINDOW = 1_000 // we take the last x spoken, join them, and see if they exist in the last LOOKBACK
const LOOKBACK = 10_000
const CHECK_FREQ = 1_000 // every x turns, we check

const findAnswer = (input, iterations) => {
  let numbers = input.split(",").map(Number)

  let spoken = [];
  let spokenTurn = new Map<number, FixedQueue>()

  for (let turn = 0; turn < iterations; turn++) {
    let speak;

    if (turn < numbers.length) {
      speak = numbers[turn % numbers.length]
    } else {
      let num = spoken[turn - 1]
      let prevTurns = spokenTurn.get(num)

      if (prevTurns.length === 1) {
        speak = 0;
      } else {
        speak = prevTurns[0] - prevTurns[1]
      }
    }

    let prevTurns = spokenTurn.get(speak)
    if (!prevTurns) {
      prevTurns = new FixedQueue()
      spokenTurn.set(speak, prevTurns)
    }

    prevTurns.pushTurn(turn)
    spoken.push(speak)

    // attempt to find a repeating sequence
    // todo: fix
    // if (turn > 1000 && turn % CHECK_FREQ === 0) {
    //   console.log(turn)
    //   let needle = spoken.slice(-LOOKBACK_WINDOW).join("")
    //   let haystack = spoken.slice(-LOOKBACK, -LOOKBACK_WINDOW).join("")
    //   if (haystack.includes(needle)) {
    //     console.log(`Found! Turn: ${turn}`)
    //     console.log(`Needle: ${needle}`)
    //     console.log(`Haystack: ${needle}`)
    //     return
    //   }
    // }
  }
  return spoken[spoken.length - 1]
}

const goA = (input) => {
  return findAnswer(input, 2020)
}

const goB = (input) => {
  return findAnswer(input, 30_000_000)
}

/* Tests */

// test()

/* Results */

console.time("Total")
console.time("Part 1")
const resultA = goA(input)
console.timeEnd("Part 1")
console.time("Part 2")
const resultB = goB(input)
console.timeEnd("Part 2")
console.timeEnd("Total")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
