import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())


let map = new Map([
  // dir      left     right
  ['east', ['north', 'south']],
  ['north', ['west', 'east']],
  ['south', ['east', 'west']],
  ['west', ['south', 'north']],
])

let map2 = new Map([
  // dir
  ['east', [1, null]],
  ['north', [null, 1]],
  ['south', [null, -1]],
  ['west', [-1, null]],
])
// x, y

const goA = (input) => {
  input = input.split("\n").map(x => {
    return x.split(/([A-Z])(\d+)/).filter(x => x !== "")
  })
  let direction = 'east'
  let coord = [0, 0]
  for (let ins of input) {

    if (ins[0] === "F") {
      let [modx, mody] = map2.get(direction)
      if (modx) {
        coord[0] += (modx * ins[1])
      }
      if (mody) {
        coord[1] += (mody * ins[1])
      }
    }
    if (ins[0] === "R") {
      let num = +ins[1] / 90
      for (let x = 0; x < num; x++) {
        direction = map.get(direction)[1]
      }
    }
    if (ins[0] === "L") {
      let num = +ins[1] / 90
      for (let x = 0; x < num; x++) {
        direction = map.get(direction)[0]
      }
    }
    if (ins[0] === "N") {
      let [modx, mody] = map2.get('north')
      if (modx) {
        coord[0] += (modx * ins[1])
      }
      if (mody) {
        coord[1] += (mody * ins[1])
      }
    }
    if (ins[0] === "S") {
      let [modx, mody] = map2.get('south')
      if (modx) {
        coord[0] += (modx * ins[1])
      }
      if (mody) {
        coord[1] += (mody * ins[1])
      }
    }
    if (ins[0] === "E") {
      let [modx, mody] = map2.get('east')
      if (modx) {
        coord[0] += (modx * ins[1])
      }
      if (mody) {
        coord[1] += (mody * ins[1])
      }
    }
    if (ins[0] === "W") {
      let [modx, mody] = map2.get('west')
      if (modx) {
        coord[0] += (modx * ins[1])
      }
      if (mody) {
        coord[1] += (mody * ins[1])
      }
    }

    console.log(direction, coord)

  }
  console.log(coord)
  return Math.abs(coord[0]) + Math.abs(coord[1])
}

const goB = (input) => {
  console.log("PART 2")
  input = input.split("\n").map(x => {
    return x.split(/([A-Z])(\d+)/).filter(x => x !== "")
  })
  let direction = 'east'
  let waypointRel = [10, 1]
  let coord = [0, 0]
  for (let ins of input) {

    if (ins[0] === "F") {
      let [modx, mody] = map2.get(direction)
      
        coord[0] += (modx||1) * ins[1] * waypointRel[0]
      

        coord[1] += (mody||1) * ins[1] * waypointRel[1]
      
    }
    if (ins[0] === "R") {
      let num = +ins[1] / 90
      for (let x = 0; x < num; x++) {
        // 10 east, 4 north
        // 4 east, -10 north [0] = [1], [1] = NEG [1]
        // -10 east, -4 north [0] = 1, [1] = NEG[0]
        // -4 east, 10 north

        waypointRel = [waypointRel[1], -1* waypointRel[0]]
      }
    }
    if (ins[0] === "L") {
      let num = +ins[1] / 90
      for (let x = 0; x < num; x++) {
        // 4 east,  2 north
        //  -2 east, 4 north [0] = NEG [1], [1] = [0]
        // -4 east, -2 north [0] = NEG [1], [1] = [0]
        // 2 east, -4 north
        waypointRel = [waypointRel[1]*-1, waypointRel[0]]
      }
    }
    if (ins[0] === "N") {
      let [modx, mody] = map2.get('north')
      if (modx) {
        waypointRel[0] += (modx * ins[1])
      }
      if (mody) {
        waypointRel[1] += (mody * ins[1])
      }
    }
    if (ins[0] === "S") {
      let [modx, mody] = map2.get('south')
      if (modx) {
        waypointRel[0] += (modx * ins[1])
      }
      if (mody) {
        waypointRel[1] += (mody * ins[1])
      }
    }
    if (ins[0] === "E") {
      let [modx, mody] = map2.get('east')
      // [-1, null]
      if (modx) {
        waypointRel[0] += (modx * ins[1])
      }
      if (mody) {
        waypointRel[1] += (mody * ins[1])
      }
    }
    if (ins[0] === "W") {
      let [modx, mody] = map2.get('west')
      if (modx) {
        waypointRel[0] += (modx * ins[1])
      }
      if (mody) {
        waypointRel[1] += (mody * ins[1])
      }
    }

    console.log(ins, coord, waypointRel)

  }
  console.log(coord)
  return Math.abs(coord[0]) + Math.abs(coord[1])

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
