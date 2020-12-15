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

// class SpokenMap extends Map {
//   // adds a new turn to a
//   add(number: number, turn: number) {
//     if (!this.has(number))
//     this.unshift(turn)
//     this.splice(2, this.length - 1)
//     return this
//   }
// }

const goA = (input) => {
  let numbers = input.split(",")

  // [num, firstTimeSpoken]
  let spoken = [...numbers.map(x => [+x, true])];
  let turn = 0;
  let lastNumber;
  let firstTime;

  for (let turn = numbers.length; turn < 2020; turn++) {
    let num = numbers[turn % numbers.length]
    let prevNum = spoken[turn - 1]
    let spokenSet = new Set([...spoken.map(x => x[0])])
    let speak;
    if (prevNum[1] === true) {
      speak = 0;
    } else {
      let prevSpeaks = spoken.map((x, i) => [x, i]).filter(x => x[0][0] === prevNum[0]).reverse();
      speak = prevSpeaks[0][1] - prevSpeaks[1][1]
    }
    let res = [+speak, !spokenSet.has(speak)]
    spoken.push(res)
  }

  return spoken[spoken.length - 1][0]
}

const LOOKBACK_WINDOW = 1_000 // we take the last x spoken, join them, and see if they exist in the last LOOKBACK
const LOOKBACK = 10_000
const CHECK_FREQ = 1_000 // every x turns, we check

const goB = (input) => {
  let numbers = input.split(",").map(Number)

  let spoken = [];
  let spokenTurn = new Map<number, FixedQueue>()

  for (let turn = 0; turn < 30000000; turn++) {
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
